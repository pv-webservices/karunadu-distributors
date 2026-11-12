# Karunadu Distributors — website

Mobile-first static site (Astro) for a Bengaluru food, beverage & FMCG distributor connecting retail shops with brands/manufacturers.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home |
| `/about/` | About Us |
| `/products/` | Products & Brands — full catalogue with search + category filters |
| `/products/<category>/` | 5 category pages (hydration-coolers, ready-to-cook, accompaniments-dairy, snacks-sweets, baking-dessert) |
| `/retailers/` | For Retailers — benefits, ordering steps, FAQs, shop enquiry form |
| `/manufacturers/` | For Manufacturers — offer, van branding, process, FAQs, brand enquiry form |
| `/contact/` | Contact cards, map, both enquiry forms |

Every page also exists in **Kannada** under `/kn/` (e.g. `/kn/products/`, `/kn/retailers/`). The English/ಕನ್ನಡ switch in the header and menu keeps visitors on the same page; pages carry `hreflang` alternates and the sitemap lists both languages.

## Interactive features

- **Order list** — "Add to order" on any product; quantity in cases; saved on the device; sent as one WhatsApp message with shop name & area.
- **Enquiry forms** — validated (required fields, Indian mobile numbers) and opened as a pre-filled WhatsApp message. Nothing is stored on a server.
- Sticky mobile action bar (Call · WhatsApp · Products · Order list), slide-in menu, catalogue search/filters.
- Motion is limited to small hover states and a one-time fade-in; it is switched off for users with "reduce motion".

## Editing content

- Business details (phones, WhatsApp, email, address, hours, stats — English + Kannada): `src/data/site.ts`
- Categories, sub-categories and products (Kannada names/descriptions in the `…Kn` fields): `src/data/catalog.ts`
- Shared interface text (menu, buttons, forms, order list, browser messages): `src/i18n/ui.ts`
- Page copy for both languages sits at the top of each view in `src/views/` (one `en` and one `kn` block); `src/pages/` and `src/pages/kn/` only route to those views.
- Brand, product and flavour names stay in English everywhere to match the packs.

## Commands

```bash
npm install
npm run dev              # http://127.0.0.1:4321
npm run build            # static output in dist/
npm run check            # type check
npm run images:prepare   # optimise real photos from source-assets/ into public/images/photos
npm run images:plan      # list AI image tasks (no API calls)
npm run images:generate  # generate missing AI images (needs OPENAI_API_KEY in .env)
npm run images:generate -- tusk-range --force   # regenerate specific images
```

## Images

Each image id resolves in this order: AI image (`public/images/gen/`) → real photo (`public/images/photos/`) → illustrated tile.
Product packshots are generated with the **edit** endpoint using the client's real photo as reference, so bottle shape and labels stay faithful — still review every generated packshot before launch and delete any that misrepresent a product (the site falls back to the real photo automatically).

Source files supplied by the client live in `source-assets/` (photos, logo, taxonomy sheet) and are not deployed.

## Deploy

Static hosting (Netlify, Vercel, Hostinger, etc.). Set `PUBLIC_SITE_URL` to the live domain before building so canonical URLs and the sitemap are correct.
