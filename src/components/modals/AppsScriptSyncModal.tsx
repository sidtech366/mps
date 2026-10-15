import React, { useState } from 'react';
import { X, ShieldCheck, Database, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getStoredAppsScriptUrl, setStoredAppsScriptUrl, pingAppsScript } from '../../services/appsScriptService';

interface AppsScriptSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncSuccess: (url: string) => Promise<void>;
  isLive: boolean;
  lastUpdated?: string;
}

/**
 * The School Management System backend (Apps Script + Google Sheet) is already
 * built and deployed - this modal just lets the admin point this homepage at
 * its Web App exec URL and confirm the connection. Nothing to paste/copy.
 */
export const AppsScriptSyncModal: React.FC<AppsScriptSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncSuccess,
  isLive,
  lastUpdated,
}) => {
  const [scriptUrl, setScriptUrl] = useState(getStoredAppsScriptUrl());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSaveAndTest = async () => {
    setTesting(true);
    setTestResult(null);

    const cleanUrl = scriptUrl.trim();
    setStoredAppsScriptUrl(cleanUrl);

    const ping = await pingAppsScript(cleanUrl);
    if (!ping.success) {
      setTestResult({ success: false, message: ping.message });
      setTesting(false);
      return;
    }

    try {
      await onSyncSuccess(cleanUrl);
      setTestResult({ success: true, message: ping.message || 'School server connected! Live data synchronized.' });
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Connected, but could not load school data.' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">

        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">School Server Connection</h3>
              <p className="text-xs text-slate-300">Connect this homepage to the live Motherland Public School database</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Zero-Risk, Read-Only: </span>
            <span>
              This homepage only reads public school data (notices, staff, gallery, fee info) from the already-deployed
              school server, and only adds new admission inquiries or login requests. Nothing in the school database
              is ever edited or deleted from here.
            </span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-sm flex-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              School Server (Apps Script Web App) URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={scriptUrl}
                onChange={(e) => setScriptUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
              <button
                onClick={handleSaveAndTest}
                disabled={testing}
                className="bg-[#0c2340] hover:bg-[#13335e] disabled:opacity-60 text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 shrink-0 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
                <span>{testing ? 'Testing...' : 'Save & Connect'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              This is the same Web App exec URL the school's Apps Script dashboard is already deployed at.
              Logging in here hands off to that same dashboard.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Current Status</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="font-bold text-slate-800 text-sm">
                  {isLive ? 'Connected & Synced with School Database' : 'Local Fallback Mode Active'}
                </span>
              </div>
              {lastUpdated && (
                <div className="text-[11px] text-slate-400 mt-0.5">Last synchronized at: {lastUpdated}</div>
              )}
            </div>
            {!isLive && (
              <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-md">
                Showing Demo Data
              </span>
            )}
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
