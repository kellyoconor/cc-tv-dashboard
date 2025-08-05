# Ambient TV “Day‑at‑a‑Glance” – Light‑Mode Style Guide v2.0

---

## 1. Design DNA

| Pillar | Description |
|--------|-------------|
| **Quiet‑Luxury** | Minimal surfaces, disciplined colour, premium type pairing |
| **Family‑Friendly** | Large targets, high contrast, warm tone |
| **Glanceability** | 3‑metre readability: clock → weather → first widget in < 1 s |
| **Modularity** | Fixed Hero + Weather; other widget rows can hide, re‑order, or expand without breaking rhythm |

---

## 2. Colour System

| Token | HEX / RGBA | Usage |
|-------|------------|-------|
| `surface.global` | `#F8FAFD` | Screen background |
| `surface.hero` | `#E8F0FA` | Clock row (220 px tall) |
| `surface.row` | `#F2F7FC` | Standard widget rows (180 px) |
| `surface.rail.bg` | `rgba(255,255,255,.30)` + `backdrop‑filter: blur(12px)` | 80 px vertical nav rail |
| `accent.primary` | `#104EB2` | Numerals, icons, deltas, focus states |
| `text.heading` | `#1E2B4C` | Section headings (Canela) |
| `text.body` | `#233659` | Body copy (Inter) |
| `text.label` | `#6481B8` | Small‑caps labels |
| `shadow.card` | `0 6 16 10 rgba(18,35,77,.06)` | Card elevation *z1* |
| **High‑Contrast Base** | `#E6EDF7` | Invoked via voice “high contrast” |
| **High‑Contrast Accent** | `#0B3C8D` | Accent +10 % brightness |

> **Tint discipline:** gradients & textures may never exceed **4 % tint** or 5 % noise opacity.

---

## 3. Typography

| Context | Typeface / Weight | Size | Tracking | Colour |
|---------|------------------|------|----------|--------|
| Clock (HH:MM) | **Inter Tight 700** | 14 rem (≈ 224 px) | 0 | `accent.primary` |
| Date & Greeting | Inter Tight 500 | 1.75 rem | 0 | `text.body` |
| Row Heading | **Canela Deck Book** | 1.4 rem | +6 | `text.heading` |
| Widget Label | Inter Tight 400 (SMALL CAPS) | 0.9 rem | +12 | `text.label` |
| Body / Metadata | Inter Regular 400 | 1 rem | 0 | `text.body` |

*All text aligns to an **8‑pt baseline grid**.*

---

## 4. Grid & Layout

| Attribute | Spec |
|-----------|------|
| **Canvas grid** | 12 columns · 24 px gutters · 80 px left rail offset |
| **Rows** | Hero 220 px, Standard 180 px, 24 px vertical gutter |
| **Slot Logic** | `slot‑A` Clock, `slot‑B` Weather (fixed) · `slot‑C/D/E` enabled widgets (Schedule, News, Market) · `slot‑F` spans 12 cols for overflow widget or collapses |
| **Card Radius** | 36 px |
| **Inner Shadow** | `inset 0 0 1px rgba(255,255,255,.6)` gives subtle etched edge |

---

## 5. Components

| Component | Key Specs | Notes |
|-----------|-----------|-------|
| **Vertical Nav Rail** | 80 px frosted white; icons 32 px | Active icon in 48 px white pill + shadow `0 2 4 rgba(0,0,0,.06)` |
| **Hero Clock** | Full‑bleed row; colon blinks 1 Hz @ 60 % opacity | *z1* elevation |
| **Weather Card** | Icon 120 px duotone; temp = clock size ÷ 2 | Optional animated sky glyph (10 fps) |
| **Standard Card** | *z0* elevation unless focused | No outlines; rely on radius + shadow |
| **Progress Bar** | 4 px height, accent fill; bg `#CEE5D6` | Inspiration widget ticks every 15 s |
| **Delta Badge** | Arrow ±45°, 16 px; green `#0D9F6E`, red `#E04A3A` | Market widget |

---

## 6. Iconography & Imagery

| Set | Style | Size | Colour |
|-----|-------|------|--------|
| Weather | Rounded duotone | 120 × 120 px | `accent.primary` |
| Rail Icons | Line 1.5 px stroke | 32 px | Active = accent; Inactive = 30 % accent |
| Widget Bullets | Solid disc | 24 px | `accent.primary` |
| Emoji | — | — | **None** |

---

## 7. Depth & Motion

### Elevation

| Layer | Shadow | z‑index |
|-------|--------|---------|
| *z0* (default) | none | 0 |
| *z1* (Hero) | `shadow.card` | 10 |

### Animation

| Trigger | Animation | Timing | Curve |
|---------|-----------|--------|-------|
| Clock tick | Colon opacity 60 % ↔ 100 % | 1 Hz | linear |
| Data refresh | Fade 0 → 100 %, rise +4 px | 140 ms | `cubic‑bezier(.33,.99,.69,1)` |
| Rail hover | Icon scale 1 → 1.15, rail bg brighten +10 % | 100 ms | ease‑out |

---

## 8. Accessibility

- **Contrast**: All fg/bg ≥ 4.5 : 1; headings & numerals ≥ 7 : 1  
- **High‑Contrast Toggle** (`“high contrast”`): swaps `surface.*`, `accent.primary` per colour table  
- **Zoom Toggle** (`“larger text”`): root font 16 → 20 px; clock +25 %; grid stays intact  
- **Colour‑blind**: Up/down arrows accompany red/green deltas; never rely on hue alone  

---

## 9. Design Tokens _(excerpt)_

```jsonc
{
  "color": {
    "surface": {
      "global":   "#F8FAFD",
      "hero":     "#E8F0FA",
      "row":      "#F2F7FC",
      "railBg":   "rgba(255,255,255,0.3)"
    },
    "accent": { "primary": "#104EB2" },
    "text": {
      "heading": "#1E2B4C",
      "body":    "#233659",
      "label":   "#6481B8"
    },
    "shadowCard": "rgba(18,35,77,0.06)"
  },
  "radius": { "card": 36 },
  "elevation": { "z0": 0, "z1": 10 },
  "spacing": { "grid": 8, "gutter": 24, "rail": 80 },
  "typography": {
    "fontFamily": { "sans": "Inter Tight", "serif": "Canela Deck" },
    "clock":   { "size": "224px", "weight": 700 },
    "heading": { "size": "1.4rem", "weight": 400 },
    "body":    { "size": "1rem", "weight": 400 }
  },
  "animation": {
    "refresh": { "duration": "140ms", "easing": "cubic-bezier(.33,.99,.69,1)" }
  }
}
```
