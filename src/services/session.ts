/**
 * Per-browser login-session persistence (not shared between visitors/devices, just a
 * convenience for the one browser that logged in). Wrapped in try/catch because
 * localStorage can throw or be unavailable in some contexts (private browsing, etc.) -
 * the site must keep working even if it does.
 */
const TOKEN_KEY = 'mps_session_token';

export function saveSessionToken(token: string): void {
  try { window.localStorage.setItem(TOKEN_KEY, token); } catch (err) { /* ignore */ }
}

export function loadSessionToken(): string | null {
  try { return window.localStorage.getItem(TOKEN_KEY); } catch (err) { return null; }
}

export function clearSessionToken(): void {
  try { window.localStorage.removeItem(TOKEN_KEY); } catch (err) { /* ignore */ }
}
