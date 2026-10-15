import React from 'react';
import { X, FileText, Lock, LogIn } from 'lucide-react';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  onOpenLogin: () => void;
}

/**
 * Exam results require an authenticated student/parent session - there's no
 * real backend equivalent for an unauthenticated lookup. This matches the
 * existing Apps Script public homepage, which sends "Result" straight to login.
 */
export const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, schoolName, onOpenLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg">Examination Result Portal</h3>
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
            Exam results are available only to logged-in students and parents, directly from {schoolName}'s secure student records. Please log in to view marks and download the marksheet.
          </p>
          <button
            onClick={() => { onClose(); onOpenLogin(); }}
            className="bg-[#0c2340] hover:bg-[#13335e] text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center gap-2 mx-auto"
          >
            <LogIn className="w-4 h-4" />
            <span>Login to View Result</span>
          </button>
        </div>
      </div>
    </div>
  );
};
