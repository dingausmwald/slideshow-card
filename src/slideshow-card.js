import { LitElement, html, css, nothing } from 'lit';

const CARD_VERSION = '0.1.0';

console.info(
  `%c slideshow-card %c ${CARD_VERSION} `,
  'color: white; background: #222; font-weight: 700',
  'color: #222; background: #ccc',
);

class SlideshowCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _children: { state: true },
    _index: { state: true },
    _playing: { state: true },
    _loading: { state: true },
    _error: { state: true },
    _showControls: { state: true },
  };

  constructor() {
    super();
    this._children = [];
    this._index = 0;
    this._playing = true;
    this._loading = true;
    this._error = null;
    this._showControls = false;
    this._urlCache = new Map();
    this._advanceTimer = null;
    this._controlsTimer = null;
    this._swipe = null;
  }

  setConfig(config) {
    if (!config?.folder) throw new Error('folder is required');
    this._config = {
      title: '',
      interval: 3,
      order: 'desc',
      ...config,
    };
  }

  static getConfigElement() {
    return null;
  }

  static getStubConfig() {
    return { folder: 'media-source://media_source/local/' };
  }

  getCardSize() {
    return 6;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadFolder();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAdvance();
    if (this._controlsTimer) clearTimeout(this._controlsTimer);
  }

  updated(changed) {
    if (changed.has('hass') && !changed.get('hass') && this._children.length === 0) {
      this._loadFolder();
    }
  }

  async _loadFolder() {
    if (!this.hass) return;
    this._loading = true;
    this._error = null;
    try {
      const result = await this.hass.callWS({
        type: 'media_source/browse_media',
        media_content_id: this._config.folder,
      });
      let items = (result.children || []).filter((c) => !c.can_expand && c.media_class === 'image');
      if (this._config.order === 'asc') items.reverse();
      this._children = items;
      this._index = 0;
      this._loading = false;
      if (items.length > 0) {
        this._preload(0);
        this._preload(1);
        this._startAdvance();
      }
    } catch (e) {
      this._loading = false;
      this._error = e?.message || String(e);
    }
  }

  async _resolve(idx) {
    const item = this._children[idx];
    if (!item) return null;
    if (this._urlCache.has(item.media_content_id)) return this._urlCache.get(item.media_content_id);
    const r = await this.hass.callWS({
      type: 'media_source/resolve_media',
      media_content_id: item.media_content_id,
    });
    const url = r.url;
    this._urlCache.set(item.media_content_id, url);
    return url;
  }

  async _preload(idx) {
    if (idx < 0 || idx >= this._children.length) return;
    const url = await this._resolve(idx);
    if (!url) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  }

  _startAdvance() {
    this._stopAdvance();
    if (!this._playing) return;
    const ms = Math.max(0.5, Number(this._config.interval) || 3) * 1000;
    this._advanceTimer = setTimeout(() => this._next(), ms);
  }

  _stopAdvance() {
    if (this._advanceTimer) {
      clearTimeout(this._advanceTimer);
      this._advanceTimer = null;
    }
  }

  _next() {
    if (this._children.length === 0) return;
    this._goTo((this._index + 1) % this._children.length);
  }

  _prev() {
    if (this._children.length === 0) return;
    this._goTo((this._index - 1 + this._children.length) % this._children.length);
  }

  _goTo(idx) {
    this._index = idx;
    this._preload(idx + 1);
    this._preload(idx - 1);
    this._startAdvance();
  }

  _togglePlay() {
    this._playing = !this._playing;
    if (this._playing) this._startAdvance();
    else this._stopAdvance();
  }

  _onSliderInput(e) {
    const idx = Number(e.target.value);
    this._goTo(idx);
  }

  _onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    this._swipe = { x: e.clientX, y: e.clientY, t: Date.now(), id: e.pointerId };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    this._showControlsTransient();
  }

  _onPointerUp(e) {
    if (!this._swipe || this._swipe.id !== e.pointerId) return;
    const dx = e.clientX - this._swipe.x;
    const dy = e.clientY - this._swipe.y;
    const dt = Date.now() - this._swipe.t;
    this._swipe = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 600) {
      if (dx < 0) this._next();
      else this._prev();
    }
  }

  _onPointerCancel() {
    this._swipe = null;
  }

  _showControlsTransient() {
    this._showControls = true;
    if (this._controlsTimer) clearTimeout(this._controlsTimer);
    this._controlsTimer = setTimeout(() => {
      this._showControls = false;
    }, 2500);
  }

  _renderImage(idx, layerClass) {
    const item = this._children[idx];
    if (!item) return nothing;
    const url = this._urlCache.get(item.media_content_id);
    if (!url) {
      this._resolve(idx).then(() => this.requestUpdate());
      return nothing;
    }
    return html`<img
      class=${layerClass}
      src=${url}
      decoding="async"
      draggable="false"
      alt=${item.title || ''}
    />`;
  }

  render() {
    if (!this._config) return nothing;
    if (this._loading) {
      return html`<ha-card><div class="status">Lade…</div></ha-card>`;
    }
    if (this._error) {
      return html`<ha-card><div class="status error">${this._error}</div></ha-card>`;
    }
    if (this._children.length === 0) {
      return html`<ha-card><div class="status">Keine Bilder gefunden</div></ha-card>`;
    }
    const total = this._children.length;
    const current = this._children[this._index];
    return html`
      <ha-card .header=${this._config.title || nothing}>
        <div
          class="viewport ${this._showControls ? 'show' : ''}"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @mousemove=${this._showControlsTransient}
          @click=${this._togglePlay}
        >
          ${this._renderImage(this._index, 'layer current')}
          <div class="overlay">
            <input
              class="scrub"
              type="range"
              min="0"
              max=${total - 1}
              .value=${String(this._index)}
              @input=${this._onSliderInput}
              @click=${(e) => e.stopPropagation()}
            />
            <div class="bar">
              <span class="counter">${this._index + 1} / ${total}</span>
              <span class="state">${this._playing ? '▶' : '⏸'}</span>
              <span class="name">${current?.title || ''}</span>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
    .status {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .status.error {
      color: var(--error-color);
    }
    .viewport {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      background: #000;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
      overflow: hidden;
    }
    .layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      will-change: opacity;
    }
    .overlay {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 8px 12px 10px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    }
    .viewport.show .overlay,
    .viewport:hover .overlay {
      opacity: 1;
      pointer-events: auto;
    }
    .scrub {
      width: 100%;
      margin: 0;
      accent-color: var(--primary-color, #03a9f4);
      cursor: pointer;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      font-size: 0.8rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .counter {
      font-variant-numeric: tabular-nums;
    }
    .name {
      margin-left: auto;
      opacity: 0.8;
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
}

customElements.define('slideshow-card', SlideshowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'slideshow-card',
  name: 'Slideshow Card',
  description: 'Photo slideshow from a media-source folder',
});
