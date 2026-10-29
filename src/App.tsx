/**
 * SidTech - School Management System Website
 *
 * ARCHITECTURE NOTE (changed): this GitHub Pages site used to independently fetch
 * live Sheet data via JSONP and render its own React homepage (HeaderTopBar,
 * Navbar, HeroSection, ...). That is no longer the case.
 *
 * The actual public homepage - the one the "Main Website" admin module edits -
 * now lives natively on the Apps Script Web App's own index page (same place the
 * login/dashboard already live), because that is same-origin with the school's
 * data (no JSONP/CORS workaround needed there) and loads faster for visitors.
 *
 * This GitHub Pages site is now just a thin, fast-loading <iframe> wrapper around
 * that Apps Script URL, kept only so the school keeps its existing
 * sidtech366.github.io/mps link, custom domain and SEO meta tags (index.html).
 * Update APPS_SCRIPT_EXEC_URL in src/config.ts if the deployment URL ever changes.
 *
 * All the old component files (HeroSection, Navbar, modals, services/dataCache.ts,
 * services/appsScriptService.ts etc.) are left in place untouched in case this
 * school - or a future clone of this template - ever needs its own independent
 * homepage again, but none of them are used by this file any more.
 */

import React, { useState } from 'react';
import { APPS_SCRIPT_EXEC_URL } from './config';
import { PageLoader } from './components/PageLoader';

export default function App() {
  // true until the iframe's own page finishes loading - the branded loader covers
  // the screen so the visitor never sees a blank white frame while it boots.
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#07192f]">
      <PageLoader active={loading} schoolName="Loading your school's website…" />
      <iframe
        title="School Website"
        src={APPS_SCRIPT_EXEC_URL}
        onLoad={() => setLoading(false)}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="clipboard-write"
      />
    </div>
  );
}
