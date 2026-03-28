# ENV Redactor (Frontend Only)

A small static website to redact sensitive values in `.env` files before sharing content with coding agents or LLMs.

Open Source Repository: `https://github.com/Wotaso/envredact`

## Features

- `.env` input (left)
- Live redacted output (right)
- Customizable sensitive-keyword field (bottom)
- Default keywords such as `key`, `token`, `secret`, `private`, `password`, etc.
- No backend, everything runs in the browser
- 100% local: no upload and no server-side processing of your `.env` content
- Copy button for the redacted output

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
