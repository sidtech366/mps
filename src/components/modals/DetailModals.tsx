import React from 'react';
import { X, Play, Download, Calendar, Tag, User, GraduationCap, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Leader, NoticeItem, VideoItem, GalleryPhoto, StaffMember } from '../../types';

// Leader Profile Modal
export const LeaderProfileModal: React.FC<{
  leader: Leader | null;
  onClose: () => void;
}> = ({ leader, onClose }) => {
  if (!leader) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <span className="bg-amber-500/20 text-amber-300 font-bold text-xs px-2.5 py-1 rounded-full border border-amber-400/30">
            {leader.roleBadge}
          </span>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
            <img
              src={leader.image}
              alt={leader.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover object-top shadow-md border-2 border-slate-100 shrink-0"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#0c2340]">{leader.name}</h3>
              <p className="text-xs font-semibold text-blue-700">{leader.designation}</p>
              {leader.qualifications && (
                <div className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{leader.qualifications}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-xl text-xs text-slate-800 italic leading-relaxed">
            "{leader.quote}"
          </div>

          {leader.bio && (
            <div className="text-xs text-slate-600 leading-relaxed space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">Message & Biography</h4>
              <p>{leader.bio}</p>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#0c2340] text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#14355f] transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notice Detail Modal
export const NoticeDetailModal: React.FC<{
  notice: NoticeItem | null;
  onClose: () => void;
}> = ({ notice, onClose }) => {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <h3 className="font-bold text-sm sm:text-base">Official Notice Circular</h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 border-b pb-3">
            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {notice.category || 'General'}
            </span>
            <span>Date: {notice.dateStr || `${notice.day} ${notice.month} 2025`}</span>
          </div>

          <h4 className="text-base font-extrabold text-[#0c2340] leading-snug">
            {notice.title}
          </h4>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
            {notice.content || 'Please refer to the school administrative department for complete guidelines regarding this circular.'}
          </div>

          {notice.attachmentName && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-900 truncate">
                📎 {notice.attachmentName}
              </span>
              <button
                onClick={() => alert(`Downloading circular attachment: ${notice.attachmentName}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
              >
                <Download className="w-3 h-3" />
                <span>Download PDF</span>
              </button>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-5 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Player Modal
export const VideoPlayerModal: React.FC<{
  video: VideoItem | null;
  onClose: () => void;
}> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
        <div className="bg-[#0c2340] px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-sm truncate">{video.title}</span>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <iframe
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-4 bg-[#081a2e] text-white flex items-center justify-between text-xs">
          <div>
            <p className="font-semibold text-slate-200">{video.description || 'School Event Video'}</p>
            <span className="text-[11px] text-amber-400">Duration: {video.duration}</span>
          </div>
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs"
          >
            Close Player
          </button>
        </div>
      </div>
    </div>
  );
};

// Photo Lightbox Modal
export const PhotoLightboxModal: React.FC<{
  photo: GalleryPhoto | null;
  onClose: () => void;
}> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
        <div className="bg-[#0c2340] px-5 py-3 text-white flex items-center justify-between">
          <span className="font-bold text-sm truncate">{photo.title}</span>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        <div className="p-4 bg-[#081a2e] text-white flex items-center justify-between text-xs">
          <div>
            <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold mr-2">
              {photo.category}
            </span>
            <span className="text-slate-300">{photo.caption || photo.title}</span>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-1.5 rounded-lg text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Staff Member Detail Modal
export const StaffDetailModal: React.FC<{
  staff: StaffMember | null;
  onClose: () => void;
}> = ({ staff, onClose }) => {
  if (!staff) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between">
          <span className="font-extrabold text-sm">Faculty Profile</span>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="w-28 h-28 rounded-full overflow-hidden mx-auto shadow-md border-4 border-amber-400">
            <img src={staff.photo} alt={staff.name} className="w-full h-full object-cover object-top" />
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0c2340]">{staff.name}</h3>
            <p className="text-xs font-bold text-blue-700 mt-0.5">{staff.designation}</p>
            {staff.department && (
              <span className="text-xs text-slate-500 block mt-1">{staff.department}</span>
            )}
          </div>

          {staff.qualification && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Qualifications & Experience:</span>
              <span>{staff.qualification}</span>
            </div>
          )}

          <div className="pt-2 flex justify-center">
            <button
              onClick={onClose}
              className="bg-[#0c2340] text-white font-bold text-xs px-6 py-2.5 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
