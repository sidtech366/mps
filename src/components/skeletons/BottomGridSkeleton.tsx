import React from 'react';
import { Pulse } from './Pulse';

/** Matches BottomGridSection's layout: Quick Links (dark) / Notices (white) / Admission (green) cards. */
export const BottomGridSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          {/* Quick Links */}
          <div className="md:col-span-4 bg-[#0c2340] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <Pulse className="h-5 w-32 bg-white/10 mb-5" />
              <div className="grid grid-cols-4 gap-2.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Pulse key={i} className="aspect-square rounded-xl bg-white/10" />
                ))}
              </div>
            </div>
            <Pulse className="h-3 w-full bg-white/10 mt-4" />
          </div>

          {/* Notices */}
          <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <Pulse className="h-6 w-28" />
                <Pulse className="h-6 w-16 rounded-full" />
              </div>
              <div className="space-y-3.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-2">
                    <Pulse className="w-11 h-11 rounded-lg shrink-0" />
                    <Pulse className="h-4 w-full mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Admission banner */}
          <div className="md:col-span-4 rounded-2xl p-6 bg-gradient-to-br from-[#063828] via-[#0b4d37] to-[#04281c] flex flex-col justify-between">
            <div className="space-y-3 max-w-[70%]">
              <Pulse className="h-5 w-24 rounded-full bg-white/10" />
              <Pulse className="h-8 w-full bg-white/10" />
              <Pulse className="h-3 w-full bg-white/10" />
              <Pulse className="h-3 w-5/6 bg-white/10" />
            </div>
            <Pulse className="h-11 w-36 rounded-full bg-white/10" />
          </div>

        </div>
      </div>
    </section>
  );
};
