import React from 'react';
import {
  GraduationCap,
  User,
  Users,
  FileText,
  IndianRupee,
  CreditCard,
  Download,
} from 'lucide-react';

interface QuickActionBadgesProps {
  onActionClick: (actionKey: string) => void;
  /** Labels for the 8 buttons below, in this fixed order - comes from the admin's
   *  "Main Website" editor (notices_admission -> links), falls back to English defaults. */
  labels?: string[];
}

const DEFAULT_LABELS = [
  'Admission Request', 'Student Login', 'Parent Login', 'Staff Login',
  'Result', 'Fee Structure', 'Online Fee Payment', 'Download Forms',
];

export const QuickActionBadges: React.FC<QuickActionBadgesProps> = ({ onActionClick, labels }) => {
  const actionMeta = [
    { id: 'admission', bgColor: 'bg-emerald-600', textColor: 'text-emerald-700', icon: GraduationCap },
    { id: 'student_login', bgColor: 'bg-blue-600', textColor: 'text-blue-700', icon: User },
    { id: 'parent_login', bgColor: 'bg-purple-600', textColor: 'text-purple-700', icon: User },
    { id: 'staff_login', bgColor: 'bg-amber-600', textColor: 'text-amber-700', icon: Users },
    { id: 'result', bgColor: 'bg-rose-600', textColor: 'text-rose-700', icon: FileText },
    { id: 'fee_structure', bgColor: 'bg-emerald-700', textColor: 'text-emerald-800', icon: IndianRupee },
    { id: 'online_fee', bgColor: 'bg-indigo-600', textColor: 'text-indigo-700', icon: CreditCard },
    { id: 'download_forms', bgColor: 'bg-sky-600', textColor: 'text-sky-700', icon: Download },
  ];
  const actions = actionMeta.map((m, i) => ({ ...m, label: (labels && labels[i]) || DEFAULT_LABELS[i] }));

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onActionClick(item.id)}
                className="group flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100/80 hover:border-slate-200 hover:bg-slate-50/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-200 mb-2.5`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors leading-tight line-clamp-2">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
