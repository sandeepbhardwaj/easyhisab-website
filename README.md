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

## Deploy (GitHub Pages)

Production domain: **`https://www.easyhisab.in`** (see root `CNAME`).

1. **Before the first workflow run (required):** open the repo on GitHub → **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions** (not “Deploy from a branch”). If this step is skipped, Actions will fail with “Get Pages site failed / Not Found” because GitHub has not created the Pages site yet.
2. Push this repo to GitHub on branch **`main`** (or merge a PR) so **Deploy to GitHub Pages** runs.
3. After a successful deploy: **Settings → Pages** → set **Custom domain** to `www.easyhisab.in` if needed (often picked up from the `CNAME` file). Enable **Enforce HTTPS** when available.
4. **DNS:** add a **`CNAME`** record for **`www`** pointing to **`<your-github-user-or-org>.github.io`** (exact target is shown in the Pages custom-domain UI). For apex `easyhisab.in`, use your DNS provider’s redirect to `www` or GitHub’s documented **A** records for the apex.

Paths to verify live:

- `/`
- `/privacy-policy/`
- `/delete-account/`

Other static hosts (Cloudflare Pages, Netlify, etc.) work too; adjust canonical URLs and `CNAME` as needed.
