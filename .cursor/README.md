# Cursor context (easyhisab-website)

Public marketing site (static HTML/CSS). Rules in **`rules/`**.

## Rule index

| Rule | When |
|------|------|
| [easyhisab-website-production.mdc](rules/easyhisab-website-production.mdc) | Always — stability, SEO, a11y, deploy safety |

Production: **https://www.easyhisab.in** via GitHub Pages.

## Verify before shipping

- All routes work (`/`, `/features/`, `/pricing/`, `/web-portal/`, `/contact/`, `/privacy-policy/`, `/delete-account/`)
- Responsive: mobile, tablet, desktop
- Preserve SEO assets: `robots.txt`, `sitemap.xml`, `CNAME`, page metadata
- Local preview: `python3 -m http.server`
