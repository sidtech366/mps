import { AppData } from '../types';

/**
 * ============================================================
 *  dataCache.ts - "instant on repeat visit" cache for the live school data.
 * ============================================================
 *  Problem this fixes: every visit was waiting for a fresh Apps Script round
 *  trip before showing anything real - and Apps Script can cold-start, so
 *  that wait is sometimes several seconds (fetchSchoolData already allows up
 *  to 25s for exactly this reason). That is the "lag" a repeat visitor feels.
 *
 *  Fix: the last successfully-fetched LIVE data is saved in this browser's
 *  localStorage. On the next visit, App.tsx shows that cached data straight
 *  away (zero network wait, page is fully interactive instantly) while a
 *  fresh fetch happens quietly in the background and silently updates the
 *  page when it lands - a classic "stale-while-revalidate" pattern, the same
 *  idea the Apps Script dashboard side already uses for its own public-info
 *  cache. First-ever visit (no cache yet) still shows the deliberate
 *  full-page loader so a visitor never sees placeholder demo content flash
 *  into real content - that protection is untouched.
 * ============================================================ */

const CACHE_KEY = 'mps_school_data_cache_v1';

interface CachedEnvelope {
  data: AppData;
  savedAt: number;
}

export function loadCachedData(): AppData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: CachedEnvelope = JSON.parse(raw);
    if (!parsed || !parsed.data) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function saveCachedData(data: AppData): void {
  try {
    const envelope: CachedEnvelope = { data, savedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(envelope));
  } catch {
    // localStorage blocked/full (private mode, quota) - caching is purely an
    // optimization, the site must keep working fine without it.
  }
}
