import React from 'react';
import { Pulse } from './Pulse';

/** Matches StaffCarouselSection's layout: header + a row of 5 staff cards. */
export const StaffCarouselSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <Pulse className="h-3 w-28" />
            <Pulse className="h-9 w-56" />
          </div>
          <Pulse className="h-9 w-32 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 px-4 sm:px-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <Pulse className="aspect-[3/3.4] rounded-none" />
              <div className="p-3.5 space-y-1.5 flex flex-col items-center">
                <Pulse className="h-4 w-20" />
                <Pulse className="h-3 w-14" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Pulse key={i} className="h-2 w-2 rounded-full" />
          ))}
        </div>

      </div>
    </section>
  );
};
