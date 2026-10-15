import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, ChevronRight } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { SchoolConfig } from '../types';

interface FooterProps {
  config: SchoolConfig;
  onNavigate: (sectionId: string) => void;
  onOpenLoginModal: () => void;
  onScrollToTop: () => void;
  onOpenSyncModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onNavigate,
  onOpenLoginModal,
  onScrollToTop,
  onOpenSyncModal,
}) => {
  return (
    <footer id="contact" className="relative bg-[#081a2e] text-slate-300 pt-14 pb-8 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <SchoolLogo size="lg" theme="dark" />
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {config.schoolName}
                </h3>
                <p className="text-xs text-amber-400 font-semibold mt-0.5">
                  {config.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              {config.address}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Committed to holistic development, academic rigor, and value-based education for every aspiring learner.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-left py-1"
              >
                <span className="text-amber-400">▶</span>
                <span>Home</span>
              </button>
              <button
                onClick={() => onNavigate('notices')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-left py-1"
              >
                <span className="text-amber-400">▶</span>
                <span>Notices</span>
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-left py-1"
              >
                <span className="text-amber-400">▶</span>
                <span>About Us</span>
              </button>
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-left py-1"
              >
                <span className="text-amber-400">▶</span>
                <span>Login</span>
              </button>
              <button
                onClick={() => onNavigate('academics')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-left py-1"
              >
                <span className="text-amber-400">▶</span>
                <span>Academics</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-left py-1"
              >
                <span className="text-amber-400">▶</span>
                <span>Contact Us</span>
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-left py-1"
              >
                <span className="text-amber-400">▶</span>
                <span>Gallery</span>
              </button>
              <button
                onClick={onOpenSyncModal}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-left py-1"
              >
                <span className="text-amber-400">▶</span>
                <span>API Settings</span>
              </button>
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${config.phone}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{config.phone}</span>
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{config.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{config.address} - {config.postalCode}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href={config.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={config.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href={config.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={config.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md border border-white/10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} {config.schoolName}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-300">
              Education Today | A Brighter Tomorrow
            </span>
          </div>
        </div>

      </div>

      {/* Floating Scroll to Top Amber Button matching screenshot */}
      <button
        onClick={onScrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 flex items-center justify-center shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </footer>
  );
};
