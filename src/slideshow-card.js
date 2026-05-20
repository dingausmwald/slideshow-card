import { LitElement, html, css, nothing } from 'lit';

const CARD_VERSION = '0.15.1';


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
    _primaryIdx: { state: true },
    _transientIdx: { state: true },
    _transientOpaque: { state: true },
    _pendingSwap: { state: true },
    _playing: { state: true },
    _loading: { state: true },
    _error: { state: true },
    _showControls: { state: true },
    _fullscreen: { state: true },
    _interval: { state: true },
  };

  constructor() {
    super();
    this._children = [];
    this._index = 0;
    this._primaryIdx = null;
    this._transientIdx = null;
    this._transientOpaque = false;
    this._pendingSwap = null;
    this._playing = true;
    this._loading = true;
    this._error = null;
    this._showControls = false;
    this._fullscreen = false;
    this._onFullscreenChange = () => {
      this._fullscreen = !!document.fullscreenElement;
    };
    this._urlCache = new Map();
    this._loadingIdx = null;
    this._loadedIdx = new Set();
    this._loadInflight = false;
    this._loadGen = 0;
    this._scrubbing = false;
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
      show_date: 'always',
      ...config,
      folder: this._normalizeFolder(config.folder),
    };
    this._interval = this._config.interval;
  }

  _normalizeFolder(input) {
    const s = String(input).trim().replace(/\/+$/, '');
    if (s.startsWith('media-source://')) return s;
    if (s.startsWith('/media/')) return 'media-source://media_source/local/' + s.slice(7);
    if (s.startsWith('/local/')) return 'media-source://media_source/local/' + s.slice(7);
    if (s.startsWith('/')) return 'media-source://media_source/local' + s;
    return 'media-source://media_source/local/' + s;
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
    document.addEventListener('fullscreenchange', this._onFullscreenChange);
    this._loadFolder();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('fullscreenchange', this._onFullscreenChange);
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
      this._primaryIdx = null;
      this._transientIdx = null;
      this._transientOpaque = false;
      this._pendingSwap = null;
      this._loadingIdx = null;
      this._loadedIdx.clear();
      this._loadInflight = false;
      this._loading = false;
      if (items.length > 0) {
        this._kickLoad();
      }
    } catch (e) {
      this._loading = false;
      this._error = e?.message || String(e);
    }
  }

  async _resolveUrl(item) {
    if (this._urlCache.has(item.media_content_id)) return this._urlCache.get(item.media_content_id);
    const r = await this.hass.callWS({
      type: 'media_source/resolve_media',
      media_content_id: item.media_content_id,
    });
    this._urlCache.set(item.media_content_id, r.url);
    return r.url;
  }

  _kickLoad() {
    if (this._loadInflight) return;
    this._doLoad();
  }

  _cancelLoad() {
    this._loadGen++;
    this._loadInflight = false;
    this._loadingIdx = null;
    this._pendingSwap = null;
  }

  async _doLoad() {
    if (this._children.length === 0) return;
    const idx = this._index;
    if (this._loadedIdx.has(idx)) {
      this._swapTo(idx);
      return;
    }
    const item = this._children[idx];
    if (!item) return;
    const gen = ++this._loadGen;
    this._loadInflight = true;
    this._loadingIdx = idx;
    let url;
    try {
      url = await this._resolveUrl(item);
    } catch {
      if (gen === this._loadGen) {
        this._loadInflight = false;
        this._loadingIdx = null;
      }
      return;
    }
    if (gen !== this._loadGen) return;
    if (this._children[idx] !== item) {
      this._loadInflight = false;
      this._loadingIdx = null;
      return;
    }
    const img = new Image();
    img.decoding = 'async';
    await new Promise((resolve) => {
      img.onload = img.onerror = resolve;
      img.src = url;
    });
    if (gen !== this._loadGen) return;
    this._loadInflight = false;
    this._loadingIdx = null;
    if (img.naturalWidth > 0) {
      this._loadedIdx.add(idx);
      this._swapTo(idx);
    }
    if (this._index !== idx) this._doLoad();
  }

  _maybeSwapLayer() {
    if (this._loadedIdx.has(this._index)) this._swapTo(this._index);
  }

  _swapTo(idx) {
    if (idx === null || idx === undefined) return;
    if (this._primaryIdx === null) {
      this._primaryIdx = idx;
      this.requestUpdate();
      this._startAdvance();
      return;
    }
    if (this._primaryIdx === idx && this._transientIdx === null) return;
    if (this._transientIdx === idx) return;
    if (this._transientIdx !== null) {
      this._pendingSwap = idx;
      return;
    }
    this._transientIdx = idx;
    this._transientOpaque = false;
    this.requestUpdate();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (this._transientIdx === idx) {
        this._transientOpaque = true;
        this.requestUpdate();
      }
    }));
  }

  _onTransitionEnd(e) {
    if (e.propertyName !== 'opacity') return;
    if (this._transientIdx === null) return;
    if (!this._transientOpaque) return;
    this._primaryIdx = this._transientIdx;
    this._transientIdx = null;
    this._transientOpaque = false;
    this.requestUpdate();
    if (this._pendingSwap !== null) {
      const next = this._pendingSwap;
      this._pendingSwap = null;
      this._swapTo(next);
    } else {
      this._startAdvance();
    }
  }

  _startAdvance() {
    this._stopAdvance();
    if (!this._playing) return;
    if (this._scrubbing) return;
    const intervalMs = Math.max(0.5, Number(this._interval) || 3) * 1000;
    const ms = Math.max(100, intervalMs - 500);
    this._advanceTimer = setTimeout(() => this._next(), ms);
    this._kickPreloadNext();
  }

  _kickPreloadNext() {
    if (this._sideloadInflight) return;
    if (!this._playing || this._scrubbing) return;
    if (this._children.length < 2) return;
    const nextIdx = (this._index + 1) % this._children.length;
    if (this._loadedIdx.has(nextIdx)) return;
    this._sideloadIdx(nextIdx);
  }

  async _sideloadIdx(idx) {
    if (this._sideloadInflight) return;
    this._sideloadInflight = true;
    try {
      const item = this._children[idx];
      if (!item) return;
      const url = await this._resolveUrl(item);
      if (this._children[idx] !== item) return;
      const img = new Image();
      img.decoding = 'async';
      await new Promise((resolve) => {
        img.onload = img.onerror = resolve;
        img.src = url;
      });
      if (img.naturalWidth > 0) this._loadedIdx.add(idx);
    } catch {
      /* ignore */
    } finally {
      this._sideloadInflight = false;
    }
  }

  _slower(e) {
    e.stopPropagation();
    this._interval = Math.min(30, Math.round((this._interval + 0.5) * 2) / 2);
    if (this._playing && !this._scrubbing) this._startAdvance();
  }

  _faster(e) {
    e.stopPropagation();
    this._interval = Math.max(0.5, Math.round((this._interval - 0.5) * 2) / 2);
    if (this._playing && !this._scrubbing) this._startAdvance();
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
    if (idx < 0 || idx >= this._children.length) return;
    this._index = idx;
    this._kickLoad();
    this._maybeSwapLayer();
  }

  _extractDate(name) {
    if (!name) return '';
    const m = name.match(/(\d{4})[-_](\d{2})[-_](\d{2})[-_ T](\d{2})[-_:](\d{2})/);
    if (!m) return name;
    const [, y, mo, d, h, mi] = m;
    return `${d}.${mo}.${y} ${h}:${mi}`;
  }

  _togglePlay() {
    this._playing = !this._playing;
    if (this._playing) this._startAdvance();
    else this._stopAdvance();
  }

  _onScrubInput(e) {
    const idx = Number(e.target.value);
    if (idx === this._index) return;
    this._index = idx;
    this._kickLoad();
    this._maybeSwapLayer();
  }

  _onScrubChange(e) {
    const idx = Number(e.target.value);
    this._goTo(idx);
  }

  _onScrubStart(e) {
    e.stopPropagation();
    this._scrubbing = true;
    this._wasPlayingBeforeScrub = this._playing;
    this._stopAdvance();
    this._cancelLoad();
  }

  _onScrubEnd(e) {
    this._scrubbing = false;
    const idx = e?.target?.value !== undefined ? Number(e.target.value) : this._index;
    this._cancelLoad();
    this._index = idx;
    this._kickLoad();
    this._maybeSwapLayer();
    if (this._wasPlayingBeforeScrub) {
      this._playing = true;
      this._startAdvance();
    }
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
    const wasSwipe = Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 600;
    this._swipe = null;
    if (wasSwipe) {
      if (dx < 0) this._next();
      else this._prev();
    }
  }

  _stop(e) {
    e.stopPropagation();
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

  _imgUrlForIdx(idx) {
    if (idx === null || idx === undefined) return null;
    const item = this._children[idx];
    return item ? this._urlCache.get(item.media_content_id) : null;
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
    const label = this._extractDate(current?.title);
    const primaryUrl = this._imgUrlForIdx(this._primaryIdx);
    const transientUrl = this._imgUrlForIdx(this._transientIdx);
    const dateMode = this._config.show_date;
    const showInfoPin = dateMode !== 'never';
    const infoPinAlways = dateMode === 'always';
    return html`
      <ha-card .header=${this._config.title || nothing}>
        <div
          class="viewport ${this._showControls ? 'show' : ''}"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @mousemove=${this._showControlsTransient}
        >
          ${primaryUrl
            ? html`<img class="layer primary" src=${primaryUrl} decoding="async" draggable="false" alt="" />`
            : nothing}
          ${transientUrl
            ? html`<img
                class="layer transient ${this._transientOpaque ? 'opaque' : ''}"
                src=${transientUrl}
                decoding="async"
                draggable="false"
                alt=""
                @transitionend=${this._onTransitionEnd}
              />`
            : nothing}
          ${showInfoPin
            ? html`<div class="info-pin ${infoPinAlways ? '' : 'hover-only'}">
                ${label ? html`<span class="info-date">${label}</span>` : nothing}
                <span class="info-count">${this._index + 1} / ${total}</span>
              </div>`
            : nothing}
          <div class="overlay">
            <input
              class="scrub"
              type="range"
              min="0"
              max=${total - 1}
              .value=${String(this._index)}
              @input=${this._onScrubInput}
              @change=${this._onScrubChange}
              @pointerdown=${this._onScrubStart}
              @pointerup=${this._onScrubEnd}
              @pointercancel=${this._onScrubEnd}
              @click=${this._stop}
            />
            <div class="bar">
              <ha-icon-button label="Zurück"
                @pointerdown=${this._stop}
                @click=${(e) => { e.stopPropagation(); this._prev(); }}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </ha-icon-button>
              <ha-icon-button label=${this._playing ? 'Pause' : 'Play'}
                @pointerdown=${this._stop}
                @click=${(e) => { e.stopPropagation(); this._togglePlay(); }}>
                <ha-icon icon=${this._playing ? 'mdi:pause' : 'mdi:play'}></ha-icon>
              </ha-icon-button>
              <ha-icon-button label="Vor"
                @pointerdown=${this._stop}
                @click=${(e) => { e.stopPropagation(); this._next(); }}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </ha-icon-button>
              <span class="speed-stepper">
                <ha-icon-button label="Schneller"
                  @pointerdown=${this._stop}
                  @click=${(e) => this._faster(e)}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>
                </ha-icon-button>
                <span class="speed-value">${this._interval}s</span>
                <ha-icon-button label="Langsamer"
                  @pointerdown=${this._stop}
                  @click=${(e) => this._slower(e)}>
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </ha-icon-button>
              </span>
              <ha-icon-button label="Vollbild"
                @pointerdown=${this._stop}
                @click=${(e) => { e.stopPropagation(); this._toggleFullscreen(); }}>
                <ha-icon icon=${this._fullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'}></ha-icon>
              </ha-icon-button>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  async _toggleFullscreen() {
    const el = this.renderRoot.querySelector('.viewport');
    if (!el) return;
    if (!document.fullscreenElement) {
      try { await el.requestFullscreen(); } catch {}
    } else {
      try { await document.exitFullscreen(); } catch {}
    }
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
    .layer.primary {
      opacity: 1;
      z-index: 1;
    }
    .layer.transient {
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 2;
    }
    .layer.transient.opaque {
      opacity: 1;
    }
    .viewport:fullscreen {
      width: 100vw;
      height: 100vh;
      aspect-ratio: auto;
    }
    .viewport:-webkit-full-screen {
      width: 100vw;
      height: 100vh;
    }
    .overlay {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
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
    .bar ha-icon-button {
      --mdc-icon-button-size: 36px;
      --mdc-icon-size: 22px;
      color: #fff;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      font-size: 0.8rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .info-pin {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 3;
      display: flex;
      gap: 10px;
      padding: 4px 10px;
      background: rgba(0, 0, 0, 0.55);
      color: #fff;
      font-size: 0.85rem;
      font-variant-numeric: tabular-nums;
      border-radius: 4px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .info-pin.hover-only {
      opacity: 0;
    }
    .viewport.show .info-pin.hover-only,
    .viewport:hover .info-pin.hover-only {
      opacity: 1;
    }
    .info-count {
      opacity: 0.85;
    }
    .speed-stepper {
      display: inline-flex;
      align-items: center;
      margin-right: auto;
    }
    .speed-stepper ha-icon-button {
      --mdc-icon-button-size: 28px;
      --mdc-icon-size: 18px;
    }
    .speed-value {
      font-variant-numeric: tabular-nums;
      min-width: 30px;
      text-align: center;
      opacity: 0.85;
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
