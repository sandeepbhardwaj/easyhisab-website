# EasyHisab Website

Production-ready static website for EasyHisab with:

- Home page (`/`)
- Privacy Policy (`/privacy-policy/`)
- Account Deletion (`/delete-account/`)

## Tech

- Clean HTML + CSS
- No JS frameworks
- Minimal dependency footprint for fast loading

## Local preview

Run any static server from this folder, for example:

```bash
python3 -m http.server 8088
```

Then open:

- `http://localhost:8088/`
- `http://localhost:8088/privacy-policy/`
- `http://localhost:8088/delete-account/`

## Deploy

Deploy this folder to any static hosting provider (Cloudflare Pages, Netlify, Vercel static, S3 + CDN).

Make sure your production domain serves:

- `/`
- `/privacy-policy/`
- `/delete-account/`
