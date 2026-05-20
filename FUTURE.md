# Future ideas

Tracks planned features that are not yet implemented but have been thought through enough to pick up later without re-deriving the design.

## Timeline sync across cards

**Goal:** scrubbing the slideshow timeline moves correlated charts (sensor history etc.) on the same dashboard in lock-step. Visualization only — page reload returns to "now". No system-wide time travel.

**Decision:** pure browser-local DOM event bus. No `input_datetime` helper, no HA state, no user-side entity setup.

Rationale:
- `input_datetime` route was considered and rejected: ~50–200 ms latency per state change is too slow for 60 Hz scrub; requires user to create the entity manually or have the card create it (which adds magic and instability).
- HA WebSocket events would round-trip through the server. Same latency problem.
- DOM `CustomEvent` on `window` is sub-millisecond, lives only in the current page, dies on reload — exactly the ephemeral-visualization semantics needed.

### Sketched protocol

```js
window.dispatchEvent(new CustomEvent('timeline', { detail: { ts /* unix ms */ } }));
window.addEventListener('timeline', (e) => { /* react to e.detail.ts */ });
```

A channel name allows multiple independent timelines on one dashboard:

```js
new CustomEvent('timeline:garten', { detail: { ts } });
```

### Card config sketch

```yaml
type: custom:slideshow-card
folder: /media/cam_links
timeline_channel: garten          # optional, empty = standalone
timeline_role: both               # send | receive | both | none (default none)
```

- `send`: scrubbing the slider broadcasts `ts` derived from the filename date of the current image.
- `receive`: incoming `ts` selects the image whose extracted filename date is closest.
- `both`: typical combined mode.

### Cross-tab (optional)

`BroadcastChannel('timeline')` for same-origin tabs/frames. Pure browser API, no HA involvement. One extra line on each side. Add later if requested.

### What's needed on the graph side

`apexcharts-card` and `history-explorer-card` have no public seek API. To sync graphs you'd either patch them or build a custom chart card that subscribes to the same event channel. Realistically a dedicated `timeline-chart-card` is the matching companion.

### Estimated cost (slideshow side only)

~50 LOC patch:
- Map `ts` ↔ image index using the filename date extractor that already exists in `_extractDate`.
- `connectedCallback`: `addEventListener('timeline:<channel>', ...)`.
- `disconnectedCallback`: clean up.
- Scrub handlers: dispatch on input.
- Hook into `_swapTo` / `_goTo` to translate incoming `ts` into an index.

## Sidecar thumbnails

For a thumbnail preview strip under the slider. HA does not auto-generate thumbnails for files in `/media/`.

Approach: cron / shell command on the Pi to generate downscaled sidecars (e.g. `200px` wide, `~15 KB` each). Card config gets a `thumbnail_folder` pointing at the sidecar directory. Loading all 1000 thumbs is `~15 MB` total, acceptable.

Until that exists, a preview strip would have to use full-resolution images, which is impractical at 4 K.
