import { AppData, AdmissionInquiry } from '../types';
import { defaultSchoolData } from '../data/defaultData';

const APPS_SCRIPT_URL_STORAGE_KEY = 'mps_apps_script_url';

/**
 * The live Motherland Public School Apps Script Web App exec URL - same one the
 * school's dashboard login already uses. Can be overridden at build time with
 * VITE_APPS_SCRIPT_URL (.env, not committed since it's build-local), or at
 * runtime from the site's own "School Server Connection" admin setting.
 */
const HARDCODED_DEFAULT_URL =
  'https://script.google.com/macros/s/AKfycbzreIKwI5qJVmZk6Jod_JZusUWdQW65Kdo4SCem9aQsj3d1M7ihl40TUI--ppQrK6CKEw/exec';

const BUILD_DEFAULT_URL: string =
  (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_APPS_SCRIPT_URL) ||
  HARDCODED_DEFAULT_URL;

export function getStoredAppsScriptUrl(): string {
  if (typeof window === 'undefined') return BUILD_DEFAULT_URL;
  return localStorage.getItem(APPS_SCRIPT_URL_STORAGE_KEY) || BUILD_DEFAULT_URL;
}

export function setStoredAppsScriptUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(APPS_SCRIPT_URL_STORAGE_KEY, url.trim());
}

/** Strip any existing query string so we always control exactly which params go on the URL. */
function baseExecUrl(url: string): string {
  return url.split('?')[0];
}

/**
 * Fetches live data from the real School Management System Apps Script backend
 * (PublicApi.gs -> ?api=1&action=getAllData). Falls back to the bundled demo
 * data if no URL is configured or the request fails, so the site never breaks.
 */
export async function fetchSchoolData(appScriptUrl?: string): Promise<{ data: AppData; isLive: boolean; error?: string }> {
  const url = appScriptUrl || getStoredAppsScriptUrl();

  if (!url) {
    return { data: defaultSchoolData, isLive: false };
  }

  try {
    const fetchUrl = `${baseExecUrl(url)}?api=1&action=getAllData&_t=${Date.now()}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch from Apps Script`);
    }

    const json = await res.json();
    if (json.status === 'success') {
      const mergedConfig = { ...defaultSchoolData.config, ...(json.config || {}) };

      const mergedData: AppData = {
        config: mergedConfig,
        leaders: (json.leaders && json.leaders.length > 0) ? json.leaders : defaultSchoolData.leaders,
        staff: (json.staff && json.staff.length > 0) ? json.staff : defaultSchoolData.staff,
        photos: (json.photos && json.photos.length > 0) ? json.photos : defaultSchoolData.photos,
        videos: (json.videos && json.videos.length > 0) ? json.videos : defaultSchoolData.videos,
        notices: (json.notices && json.notices.length > 0) ? json.notices : defaultSchoolData.notices,
        feeStructure: (json.feeStructure && json.feeStructure.length > 0) ? json.feeStructure : defaultSchoolData.feeStructure,
        classes: (json.classes && json.classes.length > 0) ? json.classes : defaultSchoolData.classes,
        lastUpdated: new Date().toLocaleTimeString(),
        source: 'google_sheets',
      };

      return { data: mergedData, isLive: true };
    } else {
      throw new Error(json.message || 'Invalid response from Apps Script');
    }
  } catch (err: any) {
    console.warn('Apps Script fetch failed, using fallback data:', err.message);
    return {
      data: { ...defaultSchoolData, source: 'fallback_local' },
      isLive: false,
      error: err.message || 'Connection error to Apps Script',
    };
  }
}

/** Quick connectivity check against the real backend (?api=1&action=ping). */
export async function pingAppsScript(appScriptUrl?: string): Promise<{ success: boolean; message: string }> {
  const url = appScriptUrl || getStoredAppsScriptUrl();
  if (!url) return { success: false, message: 'Apps Script URL not configured yet.' };

  try {
    const res = await fetch(`${baseExecUrl(url)}?api=1&action=ping&_t=${Date.now()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    const json = await res.json();
    if (json.status === 'success') {
      return { success: true, message: json.message || 'Connected successfully.' };
    }
    return { success: false, message: json.message || 'Apps Script responded with an error.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Could not reach the Apps Script Web App.' };
  }
}

/**
 * Submits an admission inquiry to the real backend (PublicApi.gs doPost action=submitAdmission).
 * Field names match publicApiPost_'s expected shape.
 */
export async function submitAdmissionInquiry(
  inquiry: AdmissionInquiry,
  appScriptUrl?: string
): Promise<{ success: boolean; message: string }> {
  const url = appScriptUrl || getStoredAppsScriptUrl();

  if (!url) {
    return {
      success: true,
      message: 'Inquiry received in local demo mode! Configure the Apps Script connection to sync directly with the school database.',
    };
  }

  try {
    const res = await fetch(baseExecUrl(url), {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'submitAdmission',
        studentName: inquiry.studentName,
        parentName: inquiry.parentName,
        motherName: inquiry.motherName || '',
        mobile: inquiry.mobile,
        dob: inquiry.dob,
        gender: inquiry.gender,
        classId: inquiry.classId,
        address: inquiry.address,
      }),
    });

    const result = await res.json().catch(() => ({ status: 'success' }));
    if (result.status === 'error') {
      return { success: false, message: result.message || 'Could not submit the inquiry. Please try again.' };
    }
    return {
      success: true,
      message: result.message || 'Admission inquiry submitted successfully. The school will contact you soon.',
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Could not reach the school server right now. Please try again or call the school office.',
    };
  }
}

/**
 * Real login against the live School Management System (PublicApi.gs doPost action=login).
 * Returns the same token the Apps Script dashboard itself issues on login, so it can be
 * handed straight back for the SSO redirect.
 */
export async function loginRequest(
  mobile: string,
  password: string,
  appScriptUrl?: string
): Promise<{ success: boolean; token?: string; user?: any; message?: string }> {
  const url = appScriptUrl || getStoredAppsScriptUrl();
  if (!url) {
    return { success: false, message: 'School server is not configured yet. Please contact the administration.' };
  }

  try {
    const res = await fetch(baseExecUrl(url), {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'login', mobile, password }),
    });
    const json = await res.json();
    if (json.status === 'success' && json.token) {
      return { success: true, token: json.token, user: json.user };
    }
    return { success: false, message: json.message || 'Invalid mobile number or password.' };
  } catch (err: any) {
    return { success: false, message: 'Could not reach the school server. Please check your internet connection.' };
  }
}

/** The dashboard exec URL to redirect to after a successful login (SSO handoff, ?tok=...). */
export function buildDashboardSsoUrl(token: string, appScriptUrl?: string): string {
  const url = appScriptUrl || getStoredAppsScriptUrl();
  return `${baseExecUrl(url)}?tok=${encodeURIComponent(token)}`;
}
