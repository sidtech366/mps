import React from 'react';
import { ArrowRight, Users, User, Star } from 'lucide-react';
import { SchoolConfig, Leader } from '../types';

interface AboutSchoolSectionProps {
  config: SchoolConfig;
  leaders: Leader[];
  onKnowMoreClick: () => void;
  onViewLeaderProfile: (leader: Leader) => void;
}

export const AboutSchoolSection: React.FC<AboutSchoolSectionProps> = ({
  config,
  leaders,
  onKnowMoreClick,
  onViewLeaderProfile,
}) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Mission, Vision, Stats */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tagline */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
              <span className="text-amber-600 font-extrabold tracking-widest text-xs uppercase">
                {config.aboutBadge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2340] tracking-tight leading-tight">
              {config.aboutTitle}
            </h2>

            {/* Paragraph */}
            <p className="text-slate-600 text-base leading-relaxed">
              {config.aboutDescription}
            </p>

            {/* 3 Stat Cards in a row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              
              {/* Stat 1: Students */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-base sm:text-lg text-slate-900 leading-none">
                    {config.stats.students}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1 leading-tight">
                    Happy Students
                  </div>
                </div>
              </div>

              {/* Stat 2: Staff */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-base sm:text-lg text-slate-900 leading-none">
                    {config.stats.staff}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1 leading-tight">
                    Experienced Staff
                  </div>
                </div>
              </div>

              {/* Stat 3: Years */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-amber-400 stroke-amber-500" />
                </div>
                <div>
                  <div className="font-extrabold text-base sm:text-lg text-slate-900 leading-none">
                    {config.stats.years}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1 leading-tight">
                    Years of Excellence
                  </div>
                </div>
              </div>

            </div>

            {/* Know More Button */}
            <div className="pt-2">
              <button
                onClick={onKnowMoreClick}
                className="group inline-flex items-center gap-2 bg-[#0c2340] hover:bg-[#13335e] text-white font-bold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* Right Column: Leadership Cards (Principal & Director) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {leaders.slice(0, 2).map((leader) => (
                <div
                  key={leader.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo with Badge */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge Pill over image matching screenshot */}
                    <div className="absolute bottom-3 left-3 bg-[#0c2340] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md">
                      {leader.roleBadge}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-extrabold text-lg text-[#0c2340]">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 mb-2">
                        {leader.designation}
                      </p>
                      <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                        "{leader.quote}"
                      </p>
                    </div>

                    <button
                      onClick={() => onViewLeaderProfile(leader)}
                      className="group inline-flex items-center justify-center gap-2 bg-[#0c2340] hover:bg-[#14355f] text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all duration-200 self-start"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
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
