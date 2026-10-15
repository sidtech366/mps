import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { SchoolConfig } from '../types';

interface NavbarProps {
  config: SchoolConfig;
  activeNav: string;
  onNavigate: (sectionId: string) => void;
  onOpenLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  activeNav,
  onNavigate,
  onOpenLoginModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'campus', label: 'Our Campus' },
    { id: 'academics', label: 'Academics' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'notices', label: 'Notices' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: School Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <SchoolLogo size="lg" className="transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl text-[#0c2340] tracking-tight group-hover:text-blue-900 transition-colors">
                {config.schoolName}
              </span>
              <span className="text-xs sm:text-[13px] text-slate-500 font-medium tracking-wide">
                {config.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-amber-500 font-bold'
                      : 'text-slate-700 hover:text-amber-500'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: Login Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-slate-900 font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <User className="w-4 h-4 fill-slate-900 stroke-none" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenLoginModal}
              className="flex sm:hidden items-center gap-1.5 bg-[#f59e0b] text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full"
            >
              <User className="w-3.5 h-3.5 fill-slate-900" />
              <span>Login</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                activeNav === item.id
                  ? 'bg-amber-50 text-amber-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#f59e0b] text-slate-900 font-bold py-2.5 rounded-lg"
            >
              <User className="w-4 h-4 fill-slate-900" />
              <span>Student / Parent / Staff Login</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
