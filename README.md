# Zenmith Radiance — IT Training & Placement website

A fast, responsive, static website for **Zenmith Radiance Private Limited**, branded from the supplied business card. The visual direction is an original editorial treatment: deep ink, muted champagne, ivory, fine rules and a serif-led type system rather than the brighter, rounded style of the reference site.

## What is included

- Complete one-page website: hero, about, mission/vision, eight course tracks, process, placement support, career pathways, FAQs, CTA, enquiry form, contact details, and map
- Responsive navigation with a mobile menu
- Interactive course filters
- Course links that preselect the course in the enquiry form
- Accessible FAQ accordion
- Metric count-up and scroll reveal animations
- Enquiry form that prepares a detailed WhatsApp message (no backend required)
- SEO metadata, Open Graph image, local business structured data, sitemap, robots file, custom 404 page
- Deployment configuration for Netlify and Vercel

## Contact details used

- **Company:** Zenmith Radiance Private Limited
- **Founder & Director:** N. Raviprasanth
- **Phone / WhatsApp:** +91 96001 69790
- **Email:** raviprasanth.zenmithradiance@gmail.com
- **Address:** 11, Balaji Street, Vivekananthar Street, Kolathur, Chennai – 600 099
- **Website:** zenmithradiance.com

## Preview locally

No build step is required.

```bash
cd zenmith-radiance-site
python -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.

Alternatively:

```bash
npx serve .
```

## Repository

- GitHub repository: <https://github.com/mohanrajuap/Zenmith>
- Intended live domain: <https://zenmithradiance.com/>
- GitHub Pages preview URL: <https://mohanrajuap.github.io/Zenmith/>

The static site lives at the repository root so it can be published directly.

## Deploy

### GitHub Pages (this repository)

Publish from the `main` branch root in **Settings → Pages → Build and deployment**. The included `.nojekyll` file keeps the static folders intact. Each push to `main` republishes the site.

The GitHub Pages address is a preview URL. To serve the intended custom domain:

1. In Zoho Domains, add GitHub Pages' DNS records for the apex domain and `www`.
2. Add `zenmithradiance.com` under **Settings → Pages → Custom domain**.
3. Enable **Enforce HTTPS** after DNS verification completes.

### Netlify (quickest alternative)

1. Sign in to Netlify and choose **Add new site → Deploy manually**.
2. Drag the entire `zenmith-radiance-site` folder onto the deploy area.
3. In **Domain management**, add `zenmithradiance.com`.
4. Enable HTTPS.
5. Set `zenmithradiance.com` as the primary domain and enable HTTPS.

The included `netlify.toml` and `_headers` add sensible security and caching headers.

### Vercel

1. Import the folder as a project or install the Vercel CLI.
2. Framework preset: **Other**. Build command: none. Output directory: `.`.
3. Add the custom domain and enable HTTPS.

### cPanel / traditional hosting

Upload the contents of this folder to the site's public directory (`public_html` or equivalent). No database or server runtime is needed.

## Before going live

1. **Verify the content.** The course tracks, support claims, and academy positioning are drafted from the reference site and should be checked against the actual Zenmith Radiance programmes.
2. **Test contact actions.** Confirm the phone, email, WhatsApp links, and Google Maps directions on a real phone.
3. **Test the enquiry form.** It opens WhatsApp with a prefilled message; this requires no server, but the visitor needs WhatsApp available.
4. **Domain:** the canonical URL, Open Graph URLs, structured data, sitemap, and robots file are set to `https://zenmithradiance.com/`. Keep this consistent if the domain changes.
5. **Add a privacy policy** if the site begins collecting or storing enquiry data through an external form provider.
6. **Submit the sitemap** in Google Search Console after the domain is live.
7. If you add real learner testimonials later, include them only with consent.

## Files

```text
zenmith-radiance-site/
├── index.html
├── styles.css
├── elegant.css
├── script.js
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── netlify.toml
├── vercel.json
├── _headers
├── .nojekyll
└── assets/
    ├── logo-full.png
    ├── logo-mark.png
    ├── og-image.jpg
    ├── favicon.ico
    ├── favicon-32.png
    ├── favicon-64.png
    └── apple-touch-icon.png
```

## Design notes

- Deep ink navy, muted champagne, and parchment tones derived from the supplied brand image
- Cormorant Garamond carries the editorial display type, with Cinzel for the brand lockup and Manrope for interface copy
- An arched, double-bordered portrait panel replaces the conventional logo card for the hero
- Course cards, process steps, pathway listings, buttons, and filters use fine rules, sharp geometry, and restrained accents instead of bright pills and heavy shadows
- The extracted logo is used in the header, hero portrait, and footer
- The layout is intentionally one page so every primary action leads directly to the enquiry area

The site uses Google Fonts and an embedded Google Map. Both require an internet connection; all other assets are local.
