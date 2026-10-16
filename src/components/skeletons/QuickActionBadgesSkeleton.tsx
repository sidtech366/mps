import React from 'react';
import { Pulse } from './Pulse';

export const QuickActionBadgesSkeleton: React.FC = () => {
  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-3 text-center">
              <Pulse className="w-12 h-12 rounded-full mb-2.5" />
              <Pulse className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
