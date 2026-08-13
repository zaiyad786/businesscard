# Digital Business Card

A premium, ultra-fast digital business card built for NFC business cards.
Tap the card → see who you are in under a second → save the contact. That's it.

## 1. Add your details

Edit **`config.js`** — it's the only file you need to touch. Every field is
optional except `company`/`website` (already set to Gcore); leave any other
field as `""` to hide that part of the card entirely.

```js
const profile = {
  name: "Jane Doe",
  title: "Enterprise Sales Director",
  company: "Gcore",
  location: "Dubai, UAE",
  phone: "+971501234567",
  email: "jane.doe@gcore.com",
  whatsapp: "+971501234567",
  linkedin: "https://www.linkedin.com/in/janedoe",
  photo: "https://.../jane.jpg",
  website: "https://gcore.com",
  tagline: "Connecting businesses with Gcore's cloud, network, edge and security solutions.",
  event: { name: "GITEX", location: "Dubai", date: "Oct 2026", link: "" }
};
```

No photo? The card automatically shows your initials instead of a broken image.

## 2. Preview it locally

No build step, no dependencies. Just serve the folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. (Opening `index.html` directly via
`file://` also works in most browsers, but a local server is more accurate.)

## 3. Deploy

Any static host works. Pick whichever you already have:

**Cloudflare Pages**
```bash
npx wrangler pages deploy . --project-name=your-name-card
```

**Vercel**
```bash
npx vercel --prod
```

**GitHub Pages**
Push this folder to a repo and enable Pages on the `main` branch — no build
command needed since there's nothing to build.

Any of these gives you a stable HTTPS URL like `https://your-name.pages.dev`.

## 4. Program the NFC tag

Write **only the page URL** to the NFC tag (e.g. with an NFC Tools app on
your phone) — never the vCard itself. That's the whole point of this
architecture: if your phone number or title changes later, you edit
`config.js` and redeploy — the physical card keeps working without ever
being reprogrammed.

```
NFC tag → https://your-name.pages.dev → Save Contact → phone contacts
```

## Notes on a couple of design choices

- **Show QR** fetches a QR code image from `api.qrserver.com` only when you
  tap that button — never on page load, so it doesn't cost you anything on
  the primary NFC path. If there's no signal at that moment, it falls back
  to a "copy link instead" button after 5 seconds rather than hanging. If
  you'd rather have a fully offline QR code, swap in a vendored JS QR
  library and generate it on-device instead.
- **Social preview (`og:image`/`og:title`)** is static HTML because
  crawlers (WhatsApp, LinkedIn, Slack link unfurling) don't run JavaScript,
  so it can't be pulled from `config.js` automatically. A generic
  Gcore-branded placeholder (`og-image.png`) is included — edit the two
  `og:*` tags in `index.html` and swap the image if you want a personalized
  link preview.
- The card intentionally has **no dark/light theme switch** — it's one
  deliberate premium dark aesthetic, matching a physical card rather than a
  themable app.

## File structure

```
digital-business-card/
├── index.html      structure + static meta tags
├── styles.css       all styling (single dark theme, mobile-first, desktop card)
├── script.js        rendering, vCard generation, share, QR, save-contact logic
├── config.js        ← your personal details (the only file to edit)
├── favicon.svg
├── og-image.png      generic social-preview placeholder
└── README.md
```

## Testing checklist

- [x] 320px / 375px / 390px / 430px mobile widths — fits without scrolling
- [x] Desktop — centered, contained card presentation
- [x] Save Contact — generates a valid vCard 3.0 file (CRLF line endings,
      correct escaping, works with Apple/Google Contacts)
- [x] Call / WhatsApp / Email / LinkedIn — only rendered when configured
- [x] Share — native share sheet where supported, clipboard-copy fallback otherwise
- [x] Show QR — lazy-loaded, with a no-signal fallback
- [x] Empty/missing fields — no broken buttons, no placeholder text, no empty pills
- [x] No console errors
