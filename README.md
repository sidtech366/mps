# Motherland Public School - Website (connected to the live School Management System)

This is the GitHub-hosted public homepage for Motherland Public School. It is a
React + Vite site that pulls its live content (notices, staff, gallery, fee
structure, admission classes) straight from the existing School Management
System's Google Sheet, through the Apps Script backend's read-only JSON API
(`PublicApi.gs`). Logging in here hands off securely to the *same* Apps Script
dashboard the school already uses - nothing about the login/dashboard changes.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and set `VITE_APPS_SCRIPT_URL` to the deployed
   Apps Script Web App exec URL (same one the school's dashboard uses).
3. Run the app:
   `npm run dev`

## Deploy

`npm run build` produces a static `dist/` folder - deploy it to GitHub Pages,
Netlify, Vercel, or any static host. No server-side code is needed; all data
comes live from the Apps Script Web App URL configured above (or overridden
later from the site's own "School Server Connection" admin setting).
