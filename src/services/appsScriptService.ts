import { AppData, AdmissionInquiry } from '../types';
import { defaultSchoolData } from '../data/defaultData';
import { APPS_SCRIPT_EXEC_URL } from '../config';

/** Strip any existing query string so we always control exactly which params go on the URL. */
function baseExecUrl(url: string): string {
  return url.split('?')[0];
}

/**
 * Fetches live data from the real School Management System Apps Script backend
 * (PublicApi.gs -> ?api=1&action=getAllData). Falls back to the bundled demo
 * data if the request fails, so the site never breaks or shows an error state.
 */
export async function fetchSchoolData(): Promise<{ data: AppData; isLive: boolean }> {
  try {
    const fetchUrl = `${baseExecUrl(APPS_SCRIPT_EXEC_URL)}?api=1&action=getAllData&_t=${Date.now()}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (json.status !== 'success') throw new Error(json.message || 'Invalid response');

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
      source: 'google_sheets',
    };

    return { data: mergedData, isLive: true };
  } catch (err) {
    return { data: { ...defaultSchoolData, source: 'fallback_local' }, isLive: false };
  }
}

/**
 * Submits an admission inquiry to the real backend (PublicApi.gs doPost action=submitAdmission).
 * Field names match publicApiPost_'s expected shape.
 */
export async function submitAdmissionInquiry(
  inquiry: AdmissionInquiry
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(baseExecUrl(APPS_SCRIPT_EXEC_URL), {
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
  } catch (err) {
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
  password: string
): Promise<{ success: boolean; token?: string; user?: any; message?: string }> {
  try {
    const res = await fetch(baseExecUrl(APPS_SCRIPT_EXEC_URL), {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'login', mobile, password }),
    });
    const json = await res.json();
    if (json.status === 'success' && json.token) {
      return { success: true, token: json.token, user: json.user };
    }
    return { success: false, message: json.message || 'Invalid mobile number or password.' };
  } catch (err) {
    return { success: false, message: 'Could not reach the school server. Please check your internet connection.' };
  }
}

/** The dashboard URL to redirect to after a successful login (SSO handoff, ?tok=...). */
export function buildDashboardSsoUrl(token: string): string {
  return `${baseExecUrl(APPS_SCRIPT_EXEC_URL)}?tok=${encodeURIComponent(token)}`;
}

/**
 * Forgot-password request (PublicApi.gs doPost action=forgotPassword -> reuses the
 * school's existing requestPasswordReset()). This does NOT reset the password itself -
 * it only files a request. The school office approves or rejects it from the
 * "Password Reset Requests" page in the real dashboard, exactly like it already works
 * for people who use the "Forgot password?" link inside the Apps Script login page.
 */
export async function requestPasswordReset(
  mobile: string,
  name: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(baseExecUrl(APPS_SCRIPT_EXEC_URL), {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'forgotPassword', mobile, name, newPassword }),
    });
    const json = await res.json();
    if (json.status === 'success') {
      return { success: true, message: json.message || 'Your request has been sent to the school office.' };
    }
    return { success: false, message: json.message || 'Could not submit the request.' };
  } catch (err) {
    return { success: false, message: 'Could not reach the school server. Please check your internet connection.' };
  }
}
