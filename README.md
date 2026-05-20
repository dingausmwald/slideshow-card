# Slideshow Card

Photo slideshow card for Home Assistant. Reads images from a media-source folder, plays them as a slideshow with a scrub slider, swipe support, and a real total counter.

## Why

The existing slideshow cards either have AI-bloated codebases with 11k LOC in a single UI file, lazy counters that lie about totals, or no mobile swipe. This one is single-purpose: read folder → show pictures.

## Status

v0.1 — early. Reads, advances, swipes, scrubs.

## Install (HACS, custom repository)

`dingausmwald/slideshow-card`

## Config

```yaml
type: custom:slideshow-card
folder: media-source://media_source/local/cam_links
interval: 3              # seconds per image (default 3)
order: desc              # desc (newest first) or asc
title: Diashow           # optional
show_date: always        # always | hover | never (default always)
```

`folder` accepts any of:
- `media-source://media_source/local/<subfolder>` (explicit)
- `/media/<subfolder>` (auto-translated)
- `<subfolder>` (bare name, treated as under /media/)

In the overlay bar you also have a runtime speed slider (1–15 s) that overrides the configured `interval` for the session.

## Roadmap

- Crossfade transitions
- Date-window soft filter (heavy rotation on recent files, full archive still navigable)
- Thumbnail previews on slider hover
- Preload throttling for low-bandwidth setups
