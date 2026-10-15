# Design system — Black / Lime

## Direction
A bold technology studio: black space, oversized typography, lime accents and an supplied 30-second brand film. The approved direction takes colour inspiration from BrandForge Studio. The Kakatiya logo uses an HD transparent restoration: white lettering with its green circular mark and gold swoosh, displayed without a coloured panel. No light toggle.

## Tokens
| Purpose | Value |
|---|---|
| Canvas / alternate | #080908 / #0d0e0c |
| Surface / raised | #131510 / #191c15 |
| Decorative border | rgba(255,255,255,.08) |
| Form/control border | #6b6b75 |
| Heading / body | #ffffff / #a9ada2 |
| Primary accent | #c8f31d |
| Secondary accent | #809d17 |
| Accessible accent text | #d1f75b |
| Button | Lime fill with black labels; lime-bordered secondary treatment |
| Fonts | Space Grotesk 400/500/600/700; Inter 400/500/600/700; local system fallbacks |
| Spacing | 8px base; 16 / 24 / 32 / 48 / 64 / 96 / 128 |
| Corners | 8px controls, 16px cards, 24px feature surfaces, pill badges |
| Content width | 1280px, fluid 24–64px gutters |

Muted body text sits on near-black surfaces; headings are white and lime buttons use black labels. Deep green is decorative. Visible keyboard focus uses a lime outline and offset. Confirm rendered contrast during the final accessibility audit.

## Composition and components
Home hero: oversized three-line headline with a lime final line; solid primary and quiet secondary CTAs; portrait film with responsive framing and four service chapters; a moving lime typography band below. Mobile stacks content and the visual.

Shared components: sticky glass navigation, keyboard-operable service mega menu, mobile off-canvas panel, breadcrumb, section eyebrow, service card, project image card, icon list, process timeline, testimonial slider, insight card, CTA band and footer. Cards vary by purpose; not every section is another equal-sized grid.

Homepage sequence follows the supplied 16 sections. No invented metrics: the evidence band uses 15+ years, eight service pillars, five process stages and support as a service rather than a claimed 24/7 SLA. Logo/name wall identifies historical work. Team section describes roles without fictional biographies.

## Motion and accessibility
AOS sections (700ms desktop / 450ms mobile, once, ease-out-cubic); GSAP/ScrollTrigger for masked headline and heading reveals, viewport-batched card entrances, process lines and desktop film/art parallax; Typed.js rotation; Swiper testimonials; CountUp experience; GLightbox project images; desktop icon hover motion and staggered menu entrances. Each library has a readable, usable fallback. GSAP matchMedia owns responsive/reduced-motion cleanup. Transform/opacity motion, eased desktop scrolling and native touch momentum. Content opens immediately without a preloader. Reduced-motion disables typing, autoplay, cursor effects, tilt and heavy transitions. Marquee pauses on hover/focus and has a persistent pause control. The hero film pauses offscreen, in hidden tabs and when the mobile menu opens. Reduced motion or data saving starts it paused, with explicit playback available. Lenis eases desktop wheel scrolling; mobile touch remains native. The header retains a stable height while scrolling, and the mobile menu supports keyboard focus, Escape and an expandable solutions list. Animations never gate access to content.

## Functional and delivery contract
Vanilla ES6 scripts, custom CSS, Bootstrap 5.3 CDN, no build tool. Local index.html opens directly with internet for CDN assets. Native form constraints, step validation, honeypot and explicit delivery state. Never show a fake submission success. Map loads only after opt-in. Consent uses local browser storage; no analytics installed. Full pages carry unique metadata and structured data, with all substantive copy in HTML.

QA targets: 320/360/768/1024/1440 and large screens; keyboard navigation, reduced motion, failed dependencies, local-file preview, internal links, form errors and gallery filters. Lighthouse goals are targets, not claimed scores without measurement.
