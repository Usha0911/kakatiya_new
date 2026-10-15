# Kakatiya Solutions

21-page static corporate website. HTML5, custom CSS, vanilla JavaScript and Bootstrap 5.3 CDN. No framework, package installation or build step.

## Preview

Open `index.html` directly in a browser. Internet access supplies Google Fonts and CDN libraries; core content and locally stored artwork remain readable without them. For a local HTTP preview, run this from the project folder:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8765/index.html`. Stop the preview with Ctrl+C. Opening HTML files directly does not provide hosting features such as custom 404 responses. The in-app browser blocks file URLs, so direct-file mode was checked by source inspection, not browser execution.

## Edit once, reuse everywhere

- Header, footer, navigation, contact links and social profiles: `assets/js/main.js`.
- Colours, typefaces, radii and shadows: `assets/css/variables.css`.
- Base layout, components, motion and page-specific styles: the corresponding CSS files under `assets/css`; `style.css` is the single entry point.
- Page content: the relevant `.html` file. Substantive content is present in HTML, not fetched at runtime.
- Motion and sliders: `assets/js/animations.js` (AOS sections, GSAP masked headlines, batched card/industry/client reveals, process lines, desktop parallax, hover and menu entrances; responsive media cleanup and reduced-motion support); supplied hero film and chapter controls: `assets/js/hero-video.js`. Eased desktop scrolling uses the locally stored Lenis 1.3.26 runtime; phones retain native touch scrolling.
- Forms and quote steps: `assets/js/forms.js`.
- Filters, lightbox, project and article selection: `assets/js/portfolio.js`.
- The project profile supports `?project=alashmal`, `sparkrill`, `jsm` and `sr-engineering`. Article selection supports `?article=website`, `erp` and `brand`.

The shared chrome is inserted by a classic deferred script so `file://` works without fetch or ES modules. A no-JavaScript navigation and email/phone route are included. Update the asset version query in HTML and CSS imports when publishing changed shared assets to a cached host.

## Connect forms

The default is a real email-composer fallback: a visitor validates the form, reviews the prepared request, opens their email app and sends it. **The site never claims this draft was delivered.** Newsletter requests likewise do not automatically subscribe anybody.

To enable automatic delivery, set `contact`, `quote` and/or `newsletter` in `KS_FORM_ENDPOINTS` at the top of `assets/js/forms.js` to your Formspree endpoint or HTTPS PHP handler. No credentials belong in client JavaScript. The handler receives multipart form data and must return a successful HTTP status with JSON `{"ok":true}` or `{"success":true}`. A failed or unconfirmed response preserves the inputs and offers the email fallback. Requests time out after 15 seconds.

Implement server-side validation, consent checks, honeypot rejection, rate limits and safe email formatting in the selected provider/handler. Newsletter delivery must actually subscribe or queue a consented subscription request before returning success. For an automatic endpoint, change the relevant HTML button from “Prepare enquiry” to “Send enquiry” and update the adjacent explanation and privacy policy. Test a real successful delivery and a failed delivery before launch. EmailJS can be integrated in the submit adapter if preferred; it is not installed in this version.

## Deploy

Upload the HTML pages, `assets/`, `robots.txt`, `sitemap.xml` and `manifest.webmanifest`. Keep research/README files outside the public directory if you do not want them published.

- **cPanel:** back up the existing site, then upload the public files to the intended document root. Keep `index.html` ahead of any old index file in the server's index configuration. Set `ErrorDocument 404 /404.html` in the site's existing Apache configuration. Review and explicitly map old routes such as `/wservices` before replacing a live site; do not discard existing server rules.
- **Netlify:** deploy the folder as a static site, with no build command. Its static hosting recognises `404.html`. Configure the production domain and review redirects from legacy URLs.
- **GitHub Pages:** publish the files from the repository root or chosen docs directory. Relative asset links work in a project subdirectory. Change the production URLs if GitHub Pages will be the final canonical host.

Canonical URLs, Open Graph URLs, structured data and sitemap entries currently target `https://kakatiyasolutions.com/`. Change them together if the public domain changes. Use HTTPS and configure suitable cache headers at the host. No service worker is installed. Nothing has been deployed to the current production website by this build.

## Content decisions and launch inputs

See `company_brief.md` for sources, `sitemap.md` for page scope and `design-system.md` for design decisions.

- Founding year, phone and public email are supported by company sources. The mailbox has not been delivery-tested.
- The street address and PIN conflict across published sources. The site uses Hanamkonda / Warangal and a regional map. Confirm the exact office and hours before replacing these with precise visit details.
- No team names, portraits, numerical business results, awards or support SLAs have been invented. The team section describes disciplines. The metrics band uses only experience, service and process counts.
- The homepage and clients page use the latest client and institutional reference supplied by the user. Legacy testimonials were removed. Portfolio case studies remain descriptions of the archived work with unavailable outcomes identified.
- Review business-specific privacy/terms text and the selected form provider before production use. These pages document this implementation and do not replace a project contract.

## Assets and licences

Original company artwork: `https://kakatiyasolutions.com/images/content/logo1.png` and `KSLOGO.png`. These reference files are retained. The supplied `PG-certificate-1.png` is retained unchanged as `assets/img/kakatiya-logo.png`. The shared header/footer and structured-data logo now use `assets/img/kakatiya-logo-hd.png`: a 2007×783 PNG restoration generated with the built-in image tool, with native alpha transparency, white lettering for dark surfaces, and the original green circular mark and gold swoosh. No CSS background panel, recolouring filter or image crop is applied.

Portfolio sources: `images/logo/alashmal-big.jpg`, `images/logo/sr-eng-big.jpg`, `images/logo/jsm1-big.jpg`, and `images/portfolio/10.jpg` (visually verified as Sparkrill, not GreenWood). These are stored locally as WebP. Their original designs and client trademarks remain their owners' property; reuse here follows the user's instruction to rebuild this company's website, not a general stock licence.

The current client display uses the user-supplied collage, stored unchanged as `assets/img/clients/latest-clients.png`. Shared CSS positions its 24 original logos into individual cards, using a transparent monochrome CSS treatment to suit the dark theme, while preserving the source artwork. Two small medical emblems use descriptive labels because their exact names are unclear in the supplied resolution. The supplied 30-second, 1080×1920 film is copied unchanged to `assets/video/kakatiya-brand-film.mp4`; its poster is extracted from the film.

Insight SVGs, favicon and social preview were created for this project. The former WebGL hero has been removed. The approved palette is black with #C8F31D lime, informed by the user-selected BrandForge Studio reference. No Unsplash, stock photography, generated portraits or external image hotlinks are used. Lenis retains its MIT licence in `assets/js/vendor/LENIS-LICENSE.txt`. Google Fonts supplies Inter and Space Grotesk (SIL Open Font License). Bootstrap, AOS, Typed.js, Swiper, Vanilla Tilt, CountUp and GLightbox retain their upstream licences; GSAP/ScrollTrigger use GSAP's applicable licence. Libraries are loaded from pinned CDN versions.

## HD logo generation prompt

Created with the built-in image-generation tool from the supplied brand reference. Final prompt:

> Create a freshly drawn, clean corporate logo asset using the attached Kakatiya Solutions logo ONLY as a brand reference, not as pixels to enlarge. Reconstruct from clean geometric shapes and freshly typeset lettering. Wide horizontal logo on a genuinely transparent alpha background. Main text exactly "Kakatiya", in solid white heavy italic sans-serif lettering, capital K and lowercase akatiya. Smaller white italic widely spaced "Solutions" underneath toward the centre-right. At the left, an elegant OPEN lime-green circular crescent sweeps behind the capital K. Below the first half of Kakatiya, a slim curved gold swoosh points right, preserving the reference identity. Flat two-colour emblem: lime #C8F31D and gold #B58A26, with solid white text. Perfectly clean vector-style contours. No gradients, no reflections, no noise, no speckles, no rough or distressed edges, no black outlines on letters, no filled background panel, no mockup and no extra text. Ensure the letters have solid interior shapes and only their normal typographic counters are transparent. High-resolution HD brand asset with balanced proportions and a small clear margin. Do not inherit any defects, compression marks or pixel streaks from the reference.

## QA performed / remaining

- [x] 21 HTML pages; unique meta descriptions; one H1 per page; valid parseable JSON-LD; image alt attributes; no duplicate HTML IDs or inline style attributes in source.
- [x] Local link/asset references checked in the final static pass; no missing targets.
- [x] All 21 pages checked at 320px: no horizontal page overflow and no failed loaded images.
- [x] Home, quote, service and portfolio layouts checked at 360, 768, 1024, 1440 and 3840px: no page overflow.
- [x] Browser checks: required fields, invalid email, quote-step validation, review summary, back navigation, email fallback, portfolio categories/lightbox, project and article selection, mobile menu and Escape focus return.
- [x] Map is not embedded before explicit opt-in. Cookie preferences can be reopened. No analytics installed.
- [x] Shared AOS/GSAP upgrade checked on home, clients, service, quote, article and contact layouts at 320px, plus desktop reveal/menu checks. No console errors or warnings observed during these flows.
- [x] JavaScript syntax checked. Browser testing used the Codex in-app Chromium browser; no application errors observed during tested flows. A non-home animation warning was identified and corrected.
- [x] Video/menu revision: supplied 30-second film, chapter seeking and playback controls verified; 24 current client logos with transparent monochrome treatment; angled ribbon restored; homepage Selected Work section removed. Mobile keyboard focus/Escape, desktop smooth anchors, offscreen video pause and representative layouts at 320/360/768/1024/1440px checked.
- [x] Reduced-motion rules disable heavy motion; CDN-dependent features have guarded fallbacks in source.
- [ ] Real form-provider delivery, newsletter subscription, address/hours and production hosting validation.
- [ ] Independent Chrome/Edge/Firefox/Safari matrix, formal W3C validation, automated accessibility audit and Lighthouse measurement.

Performance 90+, Accessibility 95+, SEO 100 and Best Practices 95+ remain targets, not measured scores. The build uses local WebP assets, deferred scripts, lazy images, explicit image dimensions and font preconnects. Recheck against the final host because CDN latency and server headers affect the result.
#   k a k a t i y a _ n e w  
 