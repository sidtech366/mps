import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, User } from 'lucide-react';
import { StaffMember, SchoolConfig } from '../types';

interface StaffCarouselSectionProps {
  staffList: StaffMember[];
  config: SchoolConfig;
  onViewAllStaff: () => void;
  onSelectStaff: (member: StaffMember) => void;
}

export const StaffCarouselSection: React.FC<StaffCarouselSectionProps> = ({
  staffList,
  config,
  onViewAllStaff,
  onSelectStaff,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const maxIndex = Math.max(0, staffList.length - itemsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleStaff = staffList.slice(startIndex, startIndex + itemsPerPage);
  // If fewer than 5 remaining at the end, wrap around nicely
  if (visibleStaff.length < itemsPerPage && staffList.length >= itemsPerPage) {
    visibleStaff.push(...staffList.slice(0, itemsPerPage - visibleStaff.length));
  }

  return (
    <section id="academics" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
              <span className="text-amber-600 font-extrabold tracking-widest text-xs uppercase">
                {config.staffBadge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2340] tracking-tight">
              {config.staffTitle}
            </h2>
          </div>

          {/* View All Staff Button */}
          <button
            onClick={onViewAllStaff}
            className="group inline-flex items-center gap-2 border border-[#0c2340] text-[#0c2340] hover:bg-[#0c2340] hover:text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all duration-200 self-start sm:self-auto"
          >
            <span>View All Staff</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Staff"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0c2340] hover:bg-amber-500 text-white flex items-center justify-center shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 px-4 sm:px-6">
            {visibleStaff.map((member) => (
              <div
                key={member.id}
                onClick={() => onSelectStaff(member)}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col hover:-translate-y-1.5"
              >
                {/* Photo */}
                <div className="relative aspect-[3/3.4] bg-slate-100 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="p-3.5 text-center flex-1 flex flex-col justify-center">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs font-semibold text-blue-700 mt-0.5 leading-snug">
                    {member.designation}
                  </p>
                  {member.department && (
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {member.department}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Staff"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0c2340] hover:bg-amber-500 text-white flex items-center justify-center shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Dots Pagination Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {[0, 1, 2, 3].map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setStartIndex(dotIndex)}
              aria-label={`Go to staff slide ${dotIndex + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                startIndex === dotIndex
                  ? 'w-6 bg-amber-500'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
