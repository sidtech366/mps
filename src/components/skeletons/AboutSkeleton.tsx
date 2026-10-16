import React from 'react';
import { Pulse } from './Pulse';

/** Matches AboutSchoolSection's layout: left text+stats column, right 2 leader cards. */
export const AboutSkeleton: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <Pulse className="h-3 w-32" />
            <Pulse className="h-10 w-full max-w-sm" />
            <div className="space-y-2">
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-3/4" />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                  <Pulse className="w-10 h-10 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Pulse className="h-4 w-10" />
                    <Pulse className="h-3 w-14" />
                  </div>
                </div>
              ))}
            </div>
            <Pulse className="h-12 w-52 rounded-full" />
          </div>

          {/* Right Column: 2 leader cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between">
                  <Pulse className="aspect-[4/3] rounded-none" />
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <Pulse className="h-5 w-32" />
                      <Pulse className="h-3 w-24" />
                      <Pulse className="h-3 w-full" />
                      <Pulse className="h-3 w-5/6" />
                    </div>
                    <Pulse className="h-9 w-28 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
