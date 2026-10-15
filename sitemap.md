# Sitemap and implementation order

All pages are separate semantic HTML documents. Shared header/footer live in `assets/js/main.js`, inserted without fetch so local file preview works. Main page content is present in HTML for SEO and no-JavaScript access.

1. `index.html` — complete 16-section home journey.
2. `about.html` — since 2009, mission, vision, values, timeline and team disciplines.
3. `services.html` — eight service pillars plus custom software overview.
4. `website-design.html`
5. `mobile-apps.html`
6. `digital-marketing.html`
7. `graphic-design.html`
8. `domain-hosting.html`
9. `gps-tracking.html`
10. `education-software.html`
11. `sap-consulting.html`
12. `portfolio.html` — category filters and image lightbox.
13. `portfolio-single.html` — historical project profile with evidence limitations.
14. `clients.html` — historical client wall and attributed feedback.
15. `blog.html` — three original articles and categories.
16. `blog-single.html` — full article, selected using a query parameter; all articles readable without JavaScript.
17. `quote.html` — service → budget → timeline → details, validation and review.
18. `contact.html` — enquiry, regional map, phone, email and WhatsApp.
19. `404.html`
20. `privacy-policy.html`
21. `terms.html`

Primary navigation: Home, About, Services (mega menu), Work, Insights, Contact; Get a Quote CTA. Clients linked from Work dropdown/footer and home. Inner-page breadcrumbs and related-service links connect the journey. Footer includes services, company, newsletter, legal and social links.

Supporting files: README, sitemap.xml, robots.txt, manifest.webmanifest, favicon set and social preview. No additional demo pages, framework or build process.
