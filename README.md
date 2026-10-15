# Motherland Public School - Official Website

This is the public homepage for Motherland Public School. It is a React +
Vite site that pulls its live content (notices, staff, gallery, fee
structure, admission classes) from the school's management system backend,
and hands off login securely into the same school dashboard the office
already uses.

## Updating the backend connection

The backend URL is configured in exactly one place in this repo:
[`src/config.ts`](src/config.ts). There is no setting for it anywhere on the
live site itself. To point the site at a different backend deployment, edit
the URL in that file and commit + push to `main` - GitHub Actions rebuilds
and redeploys automatically (see `.github/workflows/deploy.yml`), no local
setup required.

## Run locally (optional, for development only)

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`

## Deploy

Every push to `main` is built and published automatically by the GitHub
Actions workflow in `.github/workflows/deploy.yml` - no manual build step or
local Node.js is needed for normal updates.
