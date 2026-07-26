# Motheo Digital Cafe

Website for Motheo Digital Cafe — a community digital counter in Drieziek, Orange Farm,
Johannesburg. Internet, printing, documents, online applications, computer repairs,
websites, business accounts and training.

Run by [Naledi Motheo](https://motheotech.github.io/naledi-portfolio/), IT Officer.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, all services, headline prices, how a job runs |
| `services.html` | The eight service pillars and how each one works |
| `prices.html` | The full tariff — every service, every rate |
| `fix.html` | **Fix It Yourself** — free interactive troubleshooting console |
| `about.html` | Story, values, and the profile behind the counter |
| `contact.html` | Contact details and the booking form |
| `cafe.html` / `booking.html` | Redirects to `prices.html` / `contact.html` |

Every page ends with a "Where to next" block pointing at three others, so no page
is a dead end.

## Files

- `style.css` — the whole design system (tokens, components, responsive, print)
- `site.js` — mobile menu and scroll reveals
- `fix-data.js` — the troubleshooting flows (this is the file you edit)
- `fix-console.js` — the console engine
- `check-links.sh` — verifies every outbound URL
- `assets/` — logo, emblem, favicons

Static site, no build step. Open `index.html`, or deploy the folder to GitHub Pages.

## The Fix It Yourself console

`fix.html` loads `fix-data.js` (content) and `fix-console.js` (engine). Pick a device,
pick a symptom, work down the checks. If nothing works it builds a WhatsApp message
prefilled with every step already ruled out.

**All troubleshooting content is original.** Each flow links *out* to iFixit for people
who want a full teardown — we link, we do not republish. iFixit content is licensed
CC BY-NC-SA, which does not permit reuse on a commercial site, and duplicating their
text would hurt this site's search ranking anyway.

Adding a guide — copy a block in `fix-data.js`:

```js
{
  id: 'laptop-keyboard', device: 'laptop', title: 'Keys not working',
  blurb: 'Some or all keys dead.', mins: 10,
  ifixit: { label: 'Laptop keyboard', url: 'https://www.ifixit.com/Search?query=laptop+keyboard' },
  steps: [
    { t: 'Short instruction', d: 'The detail.', tip: 'Optional aside.' },
  ],
  giveUp: 'What we charge to take it from here.',
}
```

`device` must match an id in `DEVICES`. Most `ifixit` URLs are searches, which always
resolve — swap in exact article URLs as you find them, then run:

```bash
bash check-links.sh
```

## Editing prices

Rates live in `prices.html` inside `.board-group` blocks:

```html
<div class="row">
  <span class="row-name"><span>Colour print A4</span><small>per page</small></span>
  <span class="row-price">R6</span>
</div>
```

The homepage repeats a short "most asked for" board — update both. `prices.html` also
prints cleanly if you want a paper copy for the counter.

## Design

Corporate ICT visual system — the register South African enterprise integrators use.

| Token | Value | Used for |
|---|---|---|
| `--navy` | `#0a1f3c` | Hero base, footer, console |
| `--brand` | `#0b4da2` | Primary actions, links, headings accent |
| `--cyan` | `#00a9e0` | Highlights, eyebrows, console accent |
| `--mist` | `#f5f8fc` | Alternating section bands |

Inter for interface and headings, IBM Plex Mono for eyebrows, labels and the
console. Sentence case throughout — no uppercase display type. Cards carry a
16px radius and layered shadows; buttons are 10px. Hero and CTA bands use a
navy-to-royal-blue gradient.

**Changing the palette is a four-line edit** at the top of `style.css`. Nothing
else references a colour directly.

The [portfolio site](https://motheotech.github.io/naledi-portfolio/) is a separate
design. Different audience: recruiters there, neighbours here. They cross-link
rather than match.
