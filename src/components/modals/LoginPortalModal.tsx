import React, { useState, useEffect } from 'react';
import { X, Lock, Smartphone, ShieldCheck, AlertTriangle, CheckCircle2, User, KeyRound } from 'lucide-react';
import { loginRequest, buildDashboardSsoUrl, requestPasswordReset } from '../../services/appsScriptService';

interface LoginPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
  /** 'login' (default) or 'forgot' - which view the modal opens in. */
  initialMode?: 'login' | 'forgot';
  /** Called with the ready-to-embed dashboard URL (?tok=...) on a successful login. */
  onLoggedIn: (dashboardUrl: string) => void;
}

/**
 * Real login against the live School Management System backend, plus the
 * "Forgot password?" request flow (mobile + name + new password -> sent to the
 * school office for approval, same system already used inside the real dashboard).
 * On a successful login it hands the issued token to the parent App, which opens the
 * real dashboard inside an in-page iframe (never a browser redirect) - the address
 * bar always stays on this site, so the backend's URL is never exposed.
 */
export const LoginPortalModal: React.FC<LoginPortalModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
  initialMode = 'login',
  onLoggedIn,
}) => {
  const [mode, setMode] = useState<'login' | 'forgot'>(initialMode);

  // Login fields
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  // Forgot-password fields
  const [fpMobile, setFpMobile] = useState('');
  const [fpName, setFpName] = useState('');
  const [fpPassword, setFpPassword] = useState('');
  const [fpSent, setFpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset to the requested view every time the modal is (re)opened.
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage('');
      setFpSent(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile.trim() || !password.trim()) {
      setErrorMessage('Please enter your mobile number and password.');
      return;
    }
    setErrorMessage('');
    setLoading(true);

    const result = await loginRequest(mobile.trim(), password.trim());
    setLoading(false);

    if (result.success && result.token) {
      // Hand the token up to App, which opens the real dashboard inside an
      // in-page iframe - same login session the school already uses, but the
      // browser's address bar never leaves this site.
      setMobile(''); setPassword('');
      onClose();
      onLoggedIn(buildDashboardSsoUrl(result.token));
      return;
    }

    setErrorMessage(result.message || 'Invalid mobile number or password.');
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fpMobile.trim() || !fpName.trim()) {
      setErrorMessage('Please enter your mobile number and your name as registered in the school.');
      return;
    }
    setErrorMessage('');
    setLoading(true);

    const result = await requestPasswordReset(fpMobile.trim(), fpName.trim(), fpPassword.trim());
    setLoading(false);

    if (result.success) {
      setFpSent(true);
      return;
    }
    setErrorMessage(result.message);
  };

  const switchMode = (next: 'login' | 'forgot') => {
    setMode(next);
    setErrorMessage('');
    setFpSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">

        {/* Modal Header */}
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              {mode === 'login' ? <ShieldCheck className="w-4 h-4" /> : <KeyRound className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {mode === 'login' ? 'School Management Portal Login' : 'Forgot Password'}
              </h3>
              <p className="text-xs text-slate-300">
                Motherland Public School ERP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {mode === 'login' ? (
          /* Login Form */
          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMessage && (
                <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Registered Mobile Number</label>
                <div className="relative flex items-center">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Login to School Portal</span>
                )}
              </button>

              <div className="text-center text-xs pt-1">
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="text-center text-xs text-slate-500">
                Students, parents and staff all log in here with their school-issued mobile number and password.
              </div>
            </form>
          </div>
        ) : (
          /* Forgot Password Form - files a request, does not reset the password itself */
          <div className="p-6">
            {fpSent ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-extrabold text-[#0c2340]">Request Sent</h4>
                <p className="text-xs text-slate-600">
                  Your request has been sent to the school office. Once they approve it, your new password
                  will become active and you can log in with it.
                </p>
                <button
                  onClick={() => switchMode('login')}
                  className="mt-2 w-full bg-[#0c2340] hover:bg-[#13335e] text-white font-bold py-2.5 rounded-lg text-xs transition-colors"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  Enter your mobile number and your name exactly as registered in the school, and a new
                  password you would like to use. The school office will review and approve it.
                </div>

                {errorMessage && (
                  <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Registered Mobile Number</label>
                  <div className="relative flex items-center">
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={fpMobile}
                      onChange={(e) => setFpMobile(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Name (as registered in school)</label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={fpName}
                      onChange={(e) => setFpName(e.target.value)}
                      placeholder="Full name"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">New Password (at least 4 characters)</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={fpPassword}
                      onChange={(e) => setFpPassword(e.target.value)}
                      placeholder="New password you want to use"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Send Request to School Office</span>
                  )}
                </button>

                <div className="text-center text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
