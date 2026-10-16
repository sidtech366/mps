import React from 'react';

/**
 * A single shimmering placeholder block. Shared by every section skeleton below.
 * Default background is light-grey (bg-slate-200/80), for skeletons placed on light
 * sections. Pass a `bg-...` class in `className` (e.g. `bg-white/10` on a dark hero)
 * to override it - detected here and the default is left out entirely, instead of
 * relying on Tailwind's generated-CSS order to decide which same-specificity utility
 * class wins (which is not guaranteed).
 */
export const Pulse: React.FC<{ className?: string }> = ({ className = '' }) => {
  const hasOwnBg = /\bbg-/.test(className);
  return (
    <div className={`animate-pulse rounded-md ${hasOwnBg ? '' : 'bg-slate-200/80'} ${className}`} />
  );
};
