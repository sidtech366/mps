import React, { useState } from 'react';
import { ArrowRight, Smartphone, Lock, UserCheck, AlertCircle } from 'lucide-react';
import { SchoolConfig } from '../types';
import { loginRequest, buildDashboardSsoUrl } from '../services/appsScriptService';

interface HeroSectionProps {
  config: SchoolConfig;
  onExploreClick: () => void;
  /** Called directly with the ready-to-embed dashboard URL on a successful login - no second modal. */
  onLoggedIn: (dashboardUrl: string) => void;
  /** Opens the Login modal straight in its "Forgot Password" view. */
  onForgotPassword: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onExploreClick,
  onLoggedIn,
  onForgotPassword,
  onContactClick,
}) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // This card IS the real login - most visitors log in from here, so it must log
  // in directly in one step, not hand off to a second "enter it again" modal.
  const handleHeroLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile.trim()) {
      setLoginError('Please enter your registered mobile number');
      return;
    }
    if (!password.trim()) {
      setLoginError('Please enter your password');
      return;
    }
    setLoginError('');
    setLoginLoading(true);

    const result = await loginRequest(mobile.trim(), password.trim());
    setLoginLoading(false);

    if (result.success && result.token) {
      setMobile(''); setPassword('');
      onLoggedIn(buildDashboardSsoUrl(result.token));
      return;
    }
    setLoginError(result.message || 'Invalid mobile number or password.');
  };

  return (
    <div className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center bg-[#07192f]">
      {/* Background Image with Layered Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920"
          alt="School Campus"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse/20"
        />
        {/* Navy/Blue overlay tuned to match screenshot colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061830]/95 via-[#0c294dc2] to-[#061830]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#061830]/30 to-[#061830]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-white space-y-6">
            
            {/* WELCOME TO badge with yellow bar */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-amber-400 rounded-full"></span>
              <span className="text-amber-300 font-extrabold tracking-widest text-xs uppercase">
                {config.heroBadge}
              </span>
            </div>

            {/* Big Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {config.heroTitle}
            </h1>

            {/* Core Values in Warm Yellow */}
            <p className="text-xl sm:text-2xl font-bold text-amber-400 tracking-wide">
              {config.coreValues}
            </p>

            {/* Intro paragraph */}
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              {config.welcomeIntro}
            </p>

            {/* Explore Button */}
            <div className="pt-2">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                <span>Explore Our School</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Floating Login Widget */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 transform transition-all duration-300">
              
              {/* Header Box (Dark Navy) */}
              <div className="bg-[#0c2340] px-6 py-4 flex items-center gap-3 border-b border-blue-950">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-amber-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg tracking-wide">
                  Student / Parent / Staff Login
                </h3>
              </div>

              {/* Form Body */}
              <form onSubmit={handleHeroLogin} className="p-6 sm:p-7 space-y-4">
                {loginError && (
                  <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Mobile Number Input */}
                <div className="space-y-1">
                  <div className="relative flex items-center">
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Mobile Number"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] disabled:opacity-70 text-slate-950 font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loginLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Login</span>
                  )}
                </button>

                {/* Bottom Links */}
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="text-slate-600 hover:text-amber-600"
                  >
                    New User? <span className="text-blue-600 hover:underline font-bold">Contact School</span>
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
