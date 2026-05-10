# EnvRedact

A small static website that helps redact sensitive values in `.env` files before sharing configuration snippets with coding agents, LLMs, or support tickets.

Open Source Repository: `https://github.com/Wotaso/envredact`

## Features

- `.env` input (left)
- Live redacted output (right)
- Customizable sensitive-keyword field (bottom)
- Default keywords such as `key`, `token`, `secret`, `private`, `password`, etc.
- No backend for `.env` content; input and output are processed in the browser
- No cookies, analytics, or browser storage
- Copy button for the redacted output

## Security Notes

EnvRedact is a best-effort helper. It redacts values when a variable name matches the configured keyword list. It cannot guarantee that every secret is detected.

Before sharing output:

- Review the redacted text manually.
- Add project-specific keywords if your secret names are unusual.
- Do not rely on this for production incident response.
- Rotate credentials if an unredacted secret was shared by mistake.

## Legal Notes for Self-Hosting

If you host this publicly, especially from Germany or for EU users, add your own legally required pages and contact details. At minimum, check whether you need:

- An imprint/provider identification under Section 5 DDG.
- A privacy notice covering hosting access logs, processors, cookies, analytics, and any other services you add.
- Correct links to those pages from `index.html`.

The hosted Wotaso version includes an imprint and a privacy notice for this static deployment. Self-hosters must replace those details with their own.

## Run Locally

`python3 -m http.server 8080`

Then open: `http://localhost:8080`

## Deploy with Coolify

### Option A: Dockerfile

1. Connect the repository in Coolify.
2. Use `Dockerfile` as the build pack.
3. Expose port `80` (container port).
4. Start the deployment.

### Option B: Nixpacks

1. Connect the repository in Coolify.
2. Select `Nixpacks` as the build pack.
3. No extra build commands required (`nixpacks.toml` is included).
4. Start the deployment (`PORT` is wired automatically).

## License

MIT. See [LICENSE](./LICENSE).
