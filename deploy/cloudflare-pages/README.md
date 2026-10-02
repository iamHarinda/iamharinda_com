# Moving to Cloudflare Pages (optional, later)

The site deploys to Hostinger today (see `.github/workflows/deploy.yml`) and
needs nothing from this folder. If you later move to Cloudflare Pages:

1. Copy `_headers` and `_redirects` from this folder into `public/`.
2. Replace `public/contact.php` (Pages has no PHP) with a Pages Function or a
   form service, and point both forms' `action` at it.
3. Connect the GitHub repo in Cloudflare → Workers & Pages → Create → Pages,
   build command `npm run build`, output `dist`.
4. Keep the domain's MX/SPF/DKIM records (email stays on Hostinger).
