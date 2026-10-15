import React from 'react';
import { X, IndianRupee, CreditCard, ShieldCheck } from 'lucide-react';
import { FeeItem } from '../../types';

interface FeeStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  fees: FeeItem[];
  onOpenOnlinePayment: () => void;
}

export const FeeStructureModal: React.FC<FeeStructureModalProps> = ({
  isOpen,
  onClose,
  fees,
  onOpenOnlinePayment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Official Fee Structure (2025 - 2026)
              </h3>
              <p className="text-xs text-slate-300">
                Transparent & Affordable Education for Every Child
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

        {/* Notice strip */}
        <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200 text-xs text-amber-800 flex items-center justify-between">
          <span>* Fees can be paid quarterly or monthly without any hidden charges.</span>
          <button
            onClick={() => {
              onClose();
              onOpenOnlinePayment();
            }}
            className="font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay Online Now</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {fees.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-6">Fee structure has not been published yet. Please contact the school office.</p>
          )}
          {fees.map((item, idx) => (
            <div key={item.ClassID || idx} className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0c2340] text-white">
                  <tr>
                    <th className="py-3 px-4 font-bold" colSpan={2}>{item.ClassName}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {item.rows.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="py-2.5 px-4 font-semibold text-slate-800">
                        {r.HeadName} <span className="text-slate-400 font-normal">({r.Frequency})</span>
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700">₹ {r.Amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-black text-slate-900 border-t-2 border-slate-200">
                    <td className="py-2.5 px-4">Total</td>
                    <td className="py-2.5 px-4 text-right">₹ {item.total.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Fee Rules & Scholarships:</p>
            <p>1. Sibling discount of 15% is applicable on tuition fee for the second child.</p>
            <p>2. Merit scholarship available for Class 10 board toppers joining Class 11.</p>
            <p>3. Fee counter is open Monday to Saturday from 9:00 AM to 2:00 PM.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500">Need fee concession assistance? Contact principal office.</span>
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
