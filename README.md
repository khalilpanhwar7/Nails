# Lumière NYC — Static HTML Version

Plain HTML / CSS / JavaScript version of the site. No build step, no framework.

## File structure

```
public/site/
├── index.html     ← markup (links styles.css + script.js)
├── styles.css     ← all styling (purple + maroon theme, responsive)
├── script.js      ← all interactivity
└── README.md      ← this file
```

## How the files are linked

**In `index.html` `<head>`:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display..." rel="stylesheet">
<link rel="stylesheet" href="styles.css">
```

**Before `</body>`:**
```html
<script src="script.js"></script>
```

## Live URLs

| Version | URL |
|---|---|
| Next.js app | `/` |
| Static HTML | `/site/index.html` |

## Sections in `index.html`

1. `<header class="nav">` — sticky navbar + mobile menu
2. `#services` — 4 service cards
3. `#gallery` — 3D coverflow carousel + filters + lightbox
4. `#about` — studio story + stats
5. `#hours` — weekly opening hours
6. `#reviews` — testimonial carousel
7. `#book` — contact details + booking form
8. `#location` — circular Google Map
9. `<footer>` — links + socials
10. `#lightbox` — fullscreen image viewer
11. `.fab-wrap` — floating social widget

## JavaScript modules in `script.js`

| Function | Purpose |
|---|---|
| `initNav()` | mobile hamburger menu |
| `initGallery()` | coverflow carousel, filters, autoplay, swipe, lightbox |
| `initReviews()` | testimonial slider with dots + autoplay |
| `initFab()` | floating social button expand/collapse |
| `initForm()` | booking form → `POST /api/bookings` |

Data arrays `GALLERY` and `REVIEWS` sit at the top of `script.js` — edit those to change content.

## Responsive breakpoints in `styles.css`

| Breakpoint | Behaviour |
|---|---|
| `≥1024px` | full nav, 4-col services, 2 side cards in carousel with 3D |
| `≤1023px` | hamburger menu, 2-col services, 1 side card |
| `≤767px` | 1-col layouts, scrollable filter chips |
| `≤639px` | flat carousel (no 3D), swipe hint, compact controls |

## Booking form

`script.js` posts JSON to `/api/bookings`, which is handled by the Next.js route
at `src/app/api/bookings/route.ts` and stored in PostgreSQL via Drizzle.

To use this HTML standalone (without the Next.js backend), change the `fetch`
URL inside `initForm()` to your own endpoint.
