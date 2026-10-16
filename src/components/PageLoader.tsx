import React, { useState } from 'react';

interface PageLoaderProps {
  /** true while the real data is still being fetched - keeps the loader fully visible. */
  active: boolean;
  logoUrl?: string;
  schoolName?: string;
}

/**
 * Full-page branded preloader (idea #4). Sits on top of the whole site at a high
 * z-index while `active` is true, then fades smoothly away once the live data has
 * arrived - so the visitor only ever sees one clean "app opening" moment instead of
 * a flash of demo content being swapped for real content underneath.
 */
export const PageLoader: React.FC<PageLoaderProps> = ({ active, logoUrl, schoolName }) => {
  const [removed, setRemoved] = useState(false);

  if (removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      onTransitionEnd={() => {
        if (!active) setRemoved(true);
      }}
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[#07192f] transition-opacity duration-500 ease-out ${
        active ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          {/* Spinning amber ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
          <div className="absolute inset-0 rounded-full border-[3px] border-amber-400 border-t-transparent border-l-transparent animate-spin" />

          {/* Logo / initial badge, centered inside the ring */}
          <div className="absolute inset-[6px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner">
            {logoUrl ? (
              <img src={logoUrl} alt="" className="w-full h-full object-contain p-1.5" />
            ) : (
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0c2340]">
                {(schoolName || 'S').trim().charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {schoolName && (
          <p className="text-white/85 text-sm sm:text-base font-bold tracking-wide text-center px-6">
            {schoolName}
          </p>
        )}
      </div>
    </div>
  );
};
