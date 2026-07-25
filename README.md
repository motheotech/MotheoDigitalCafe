# Motheo Digital Cafe

Website for Motheo Digital Cafe — a community digital counter in Drieziek, Orange Farm,
Johannesburg. Internet, printing, documents, online applications, computer repairs,
websites and training.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, all services, most-asked-for prices, how a job runs |
| `services.html` | The eight service pillars and how each one works |
| `prices.html` | The full tariff — every service, every rate |
| `about.html` | Story, values, who runs it |
| `contact.html` | Contact details and the booking form |
| `cafe.html` / `booking.html` | Redirects to `prices.html` / `contact.html` |

## Files

- `style.css` — the whole design system (tokens, components, responsive, print)
- `site.js` — mobile menu and scroll reveals
- `assets/` — logo, emblem, favicons

Static site. No build step. Open `index.html`, or drop the folder on
GitHub Pages, Netlify or Cloudflare Pages.

## Editing prices

All rates live in `prices.html` inside `.board-group` blocks. Each row is:

```html
<div class="row">
  <span class="row-name"><span>Colour print A4</span><small>per page</small></span>
  <span class="row-price">R6</span>
</div>
```

The homepage repeats a short "most asked for" board — update both when a rate changes.
`prices.html` also prints cleanly (nav, banners and footer are hidden) if you want a
paper copy for the counter.

## Design

Paper white, ink black, one teal accent (`--volt: #00b4bb`). Anton for display,
Archivo for everything else. The signature element is the price wall: hairline rules,
dot leaders, tabular figures — a real tariff board, on screen.
