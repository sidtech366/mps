import React from 'react';
import {
  Bell,
  ArrowRight,
  GraduationCap,
  User,
  Users,
  FileText,
  IndianRupee,
  CreditCard,
  Download,
} from 'lucide-react';
import { NoticeItem } from '../types';

interface BottomGridSectionProps {
  notices: NoticeItem[];
  onActionClick: (actionKey: string) => void;
  onNoticeClick: (notice: NoticeItem) => void;
  onViewAllNotices: () => void;
  onApplyAdmission: () => void;
}

export const BottomGridSection: React.FC<BottomGridSectionProps> = ({
  notices,
  onActionClick,
  onNoticeClick,
  onViewAllNotices,
  onApplyAdmission,
}) => {
  const quickLinks = [
    { id: 'admission', label: 'Admission Request', icon: GraduationCap, color: 'text-emerald-600' },
    { id: 'student_login', label: 'Student Login', icon: User, color: 'text-blue-600' },
    { id: 'parent_login', label: 'Parent Login', icon: User, color: 'text-purple-600' },
    { id: 'staff_login', label: 'Staff Login', icon: Users, color: 'text-amber-600' },
    { id: 'result', label: 'Result', icon: FileText, color: 'text-rose-600' },
    { id: 'fee_structure', label: 'Fee Structure', icon: IndianRupee, color: 'text-emerald-700' },
    { id: 'online_fee', label: 'Online Fee Payment', icon: CreditCard, color: 'text-indigo-600' },
    { id: 'download_forms', label: 'Download Forms', icon: Download, color: 'text-sky-600' },
  ];

  return (
    <section id="notices" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Quick Links Card (Dark Navy) */}
          <div className="md:col-span-4 bg-[#0c2340] rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold tracking-tight mb-5 text-white flex items-center gap-2">
                <span>Quick Links</span>
              </h3>

              {/* 4x2 or 2x4 grid of light tiles */}
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
                {quickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onActionClick(item.id)}
                      className="group flex flex-col items-center justify-center p-2.5 bg-white/95 hover:bg-white text-slate-900 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm text-center cursor-pointer"
                    >
                      <div className={`p-1.5 rounded-lg mb-1.5 ${item.color}`}>
                        <Icon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-bold leading-tight line-clamp-2 text-slate-800 group-hover:text-amber-600">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <span className="text-[11px] text-slate-300">
                School Management Portal Quick Access
              </span>
            </div>
          </div>

          {/* Card 2: Latest Notices */}
          <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Bell className="w-4 h-4 fill-amber-500" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0c2340] tracking-tight">
                    Latest Notices
                  </h3>
                </div>

                <button
                  onClick={onViewAllNotices}
                  className="group inline-flex items-center gap-1 text-xs font-bold text-[#0c2340] hover:text-amber-600 border border-slate-200 hover:border-amber-400 px-3 py-1 rounded-full transition-all"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* List of 4 Notices with Date Badges */}
              <div className="space-y-3.5">
                {notices.slice(0, 4).map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => onNoticeClick(notice)}
                    className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    {/* Date Pill Badge */}
                    <div className="w-11 h-11 rounded-lg bg-slate-100 group-hover:bg-amber-100 text-center flex flex-col justify-center items-center shrink-0 transition-colors border border-slate-200 group-hover:border-amber-300">
                      <span className="font-extrabold text-xs text-[#0c2340] leading-none group-hover:text-amber-700">
                        {notice.day}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-slate-500 group-hover:text-amber-800 leading-tight">
                        {notice.month}
                      </span>
                    </div>

                    {/* Notice Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                        {notice.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Updated daily from administration</span>
              <span className="text-amber-600 font-bold flex items-center gap-1">
                Active Circulars
              </span>
            </div>
          </div>

          {/* Card 3: Request for Admission Banner */}
          <div className="md:col-span-4 relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#063828] via-[#0b4d37] to-[#04281c] text-white p-6 flex flex-col justify-between">
            {/* Background Students Image on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 sm:opacity-40 pointer-events-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600"
                alt="Students"
                className="w-full h-full object-cover object-center mix-blend-luminosity scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#063828] to-transparent" />
            </div>

            <div className="relative z-10 max-w-[70%] space-y-3">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] uppercase tracking-wider border border-emerald-400/30">
                Admissions Open 2026-27
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Request for Admission
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                Give your child the best education for a brighter future.
              </p>
            </div>

            {/* Apply Now Button */}
            <div className="relative z-10 pt-6">
              <button
                onClick={onApplyAdmission}
                className="group inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
