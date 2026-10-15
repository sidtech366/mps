import React, { useState } from 'react';
import { X, Lock, Smartphone, ShieldCheck, AlertTriangle } from 'lucide-react';
import { loginRequest, buildDashboardSsoUrl } from '../../services/appsScriptService';

interface LoginPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

/**
 * Real login against the live School Management System (Apps Script backend).
 * On success it hands the issued token straight to the real Apps Script dashboard
 * via a secure SSO redirect (?tok=...), landing the user inside the actual
 * role-based dashboard rather than any fake demo view here.
 */
export const LoginPortalModal: React.FC<LoginPortalModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
}) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      // Hand the token to the real Apps Script dashboard - same login session the
      // existing admin/staff/student/parent portals already use.
      window.location.href = buildDashboardSsoUrl(result.token);
      return;
    }

    setErrorMessage(result.message || 'Invalid mobile number or password.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">

        {/* Modal Header */}
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                School Management Portal Login
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

        {/* Login Form */}
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

            <div className="text-center text-xs text-slate-500 pt-1">
              Students, parents and staff all log in here with their school-issued mobile number and password.
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
