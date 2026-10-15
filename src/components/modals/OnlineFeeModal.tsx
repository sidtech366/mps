import React from 'react';
import { X, CreditCard, Lock, LogIn } from 'lucide-react';

interface OnlineFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  onOpenLogin: () => void;
}

/**
 * Online fee payment needs an authenticated student/parent account (to know
 * which fees are due) - no real backend equivalent without logging in first.
 * Matches the existing Apps Script public homepage behaviour.
 */
export const OnlineFeeModal: React.FC<OnlineFeeModalProps> = ({ isOpen, onClose, schoolName, onOpenLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg">Online Fee Payment Portal</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <p className="text-xs text-slate-600">
            To see your exact pending fee amount and pay securely, please log in to your {schoolName} student/parent account first.
          </p>
          <button
            onClick={() => { onClose(); onOpenLogin(); }}
            className="bg-[#0c2340] hover:bg-[#13335e] text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center gap-2 mx-auto"
          >
            <LogIn className="w-4 h-4" />
            <span>Login to Pay Fees</span>
          </button>
        </div>
      </div>
    </div>
  );
};
