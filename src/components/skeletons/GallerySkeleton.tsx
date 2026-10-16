import React from 'react';
import { Pulse } from './Pulse';

/** Matches GallerySection's layout: left 4-photo grid, right 1 big + 3 small videos. */
export const GallerySkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Photo Gallery */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <Pulse className="h-3 w-24" />
                <Pulse className="h-7 w-48" />
              </div>
              <Pulse className="h-8 w-28 rounded-full" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Pulse key={i} className="aspect-[3/4] rounded-xl" />
              ))}
            </div>
          </div>

          {/* Right: Video Gallery */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <Pulse className="h-3 w-24" />
                <Pulse className="h-7 w-48" />
              </div>
              <Pulse className="h-8 w-28 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <Pulse className="sm:col-span-7 aspect-[16/10] sm:aspect-auto rounded-xl" />
              <div className="sm:col-span-5 flex flex-col justify-between gap-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-100">
                    <Pulse className="w-20 h-14 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Pulse className="h-3 w-24" />
                      <Pulse className="h-2.5 w-12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
