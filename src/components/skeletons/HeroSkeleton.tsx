import React from 'react';
import { Pulse } from './Pulse';

/** Matches HeroSection's layout (dark banner, left text block + right login-card-shaped box)
 *  so there is no layout jump when the real hero swaps in. */
export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center bg-[#07192f]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: text placeholders */}
          <div className="lg:col-span-7 space-y-6">
            <Pulse className="h-3 w-40 bg-white/10" />
            <Pulse className="h-12 w-full max-w-xl bg-white/10" />
            <Pulse className="h-7 w-72 bg-white/10" />
            <div className="space-y-2 pt-1">
              <Pulse className="h-4 w-full max-w-2xl bg-white/10" />
              <Pulse className="h-4 w-5/6 max-w-2xl bg-white/10" />
            </div>
            <Pulse className="h-12 w-48 rounded-full bg-white/10" />
          </div>

          {/* Right: login-card-shaped box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-7 space-y-4">
              <Pulse className="h-10 w-full bg-white/10" />
              <Pulse className="h-11 w-full bg-white/10" />
              <Pulse className="h-11 w-full bg-white/10" />
              <Pulse className="h-11 w-full bg-white/10" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
