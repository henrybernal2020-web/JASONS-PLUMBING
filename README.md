# Clem's Plumbing Services — New Orleans, LA

A single-page marketing website for **Clem's Plumbing Services**, a licensed & insured
plumber in New Orleans, LA. Built from the in-house `plumbing-template` and populated
with the business's real, public details (Yelp listing).

**Static HTML/CSS/JS. No build step. No dependencies.**

## Business details

| | |
|---|---|
| **Name** | Clem's Plumbing Services |
| **Phone** | (504) 738-3587 |
| **Address** | 713 S Al Davis Rd, Ste B, New Orleans, LA 70123 |
| **Hours** | Mon 8:30a–5:00p · Tue–Fri 8:30a–4:30p · Sat & Sun closed |
| **Rating** | 4.3★ across 15 Yelp reviews |
| **Services** | Plumbing repair · Drain & sewer lines · Water heaters · Backflow prevention · Installs & replacements · Inspections |
| **Yelp** | https://www.yelp.com/biz/clems-plumbing-services-new-orleans |

Business facts (name, phone, address, hours, rating, review count, and the featured
customer quotes) come from the public Yelp listing above. The four testimonials on the
page are real Yelp reviews, quoted verbatim.

## What's inside

| Section | Notes |
|---|---|
| Top bar + sticky header | Leads with the phone number |
| Hero + 60-second quote form | Converts callers and form-fillers |
| Trust chips | Real 4.3★ / 15-review Yelp figures |
| Services grid | Matches the services Clem's actually lists |
| "Built for this city" | Local New Orleans context |
| 3-step process | Call → fair estimate → fixed |
| Yelp review marquee | Four verbatim customer reviews |
| Service-area grid | Orleans & Jefferson Parish localities |
| FAQ accordion | Mirrors the `FAQPage` JSON-LD |
| CTA band + NAP footer | Contact + hours + Yelp link |

## SEO features

- `Plumber` (LocalBusiness) JSON-LD with geo, hours, `aggregateRating`, `areaServed`, service catalog
- `FAQPage` JSON-LD matching the visible FAQ content
- Semantic heading hierarchy, descriptive alt text, canonical, OG/Twitter cards
- `robots.txt` + `sitemap.xml`
- Lazy-loaded images, preconnected fonts

## Design system

- **Palette:** deep-water teal `#0d2a33`, porcelain `#f2f5f4`, copper `#c1662f`, verdigris `#3e8e7e`
- **Type:** Bricolage Grotesque (display) · Archivo (body) · Space Mono (labels)
- **Signature:** copper-pipe scroll progress line down the left edge
- Scroll reveals, animated counters, word-rise hero — all respect `prefers-reduced-motion`

## Run it locally

```bash
python3 -m http.server 8090
# then open http://localhost:8090
```

## Before you go live — placeholders to fill in

A few values are placeholders and should be confirmed/replaced by the business owner:

- **Domain** — `clemsplumbingnola.com` is used throughout (`<link rel="canonical">`, Open
  Graph URLs, `robots.txt`, `sitemap.xml`). Swap it for the real domain once registered.
- **License number** — the site says "licensed & insured" but does **not** print a license
  number. Add the real Louisiana Master Plumber license # in the footer and FAQ if desired.
- **Email** — no public email was available, so the contact block uses phone + Yelp only.
  Add a real email address if you want one shown.
- **Quote form** — submits client-side only (shows a success message). Wire it to an email
  service or form endpoint to actually receive leads.
- **Photos** — the `assets/` images are stock photos from [Pexels](https://www.pexels.com)
  & [Unsplash](https://unsplash.com) (free licenses). Swap in real photos of Clem's crew and jobs.
