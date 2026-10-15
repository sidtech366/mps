import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { GalleryPhoto, VideoItem } from '../types';

interface GallerySectionProps {
  photos: GalleryPhoto[];
  videos: VideoItem[];
  onViewAllPhotos: () => void;
  onViewAllVideos: () => void;
  onSelectPhoto: (photo: GalleryPhoto) => void;
  onPlayVideo: (video: VideoItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  photos,
  videos,
  onViewAllPhotos,
  onViewAllVideos,
  onSelectPhoto,
  onPlayVideo,
}) => {
  const featuredVideo = videos.find((v) => v.isFeatured) || videos[0];
  const sideVideos = videos.filter((v) => v.id !== featuredVideo?.id).slice(0, 3);

  return (
    <section id="gallery" className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Photo Gallery */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-1 bg-amber-500 rounded-full"></span>
                    <span className="text-amber-600 font-extrabold tracking-widest text-xs uppercase">
                      PHOTO GALLERY
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] tracking-tight">
                    Moments from Our Campus
                  </h3>
                </div>

                <button
                  onClick={onViewAllPhotos}
                  className="group inline-flex items-center gap-1.5 border border-[#0c2340] text-[#0c2340] hover:bg-[#0c2340] hover:text-white font-bold text-xs px-4 py-2 rounded-full transition-all duration-200"
                >
                  <span>View All Photos</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* 4 Photos Grid (matching the 4 thumbnails in screenshot) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {photos.slice(0, 4).map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => onSelectPhoto(photo)}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer bg-slate-200 transition-all duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <p className="text-[11px] font-bold text-white leading-tight">
                        {photo.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Video Gallery */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-1 bg-amber-500 rounded-full"></span>
                    <span className="text-amber-600 font-extrabold tracking-widest text-xs uppercase">
                      VIDEO GALLERY
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] tracking-tight">
                    Watch Our School Videos
                  </h3>
                </div>

                <button
                  onClick={onViewAllVideos}
                  className="group inline-flex items-center gap-1.5 border border-[#0c2340] text-[#0c2340] hover:bg-[#0c2340] hover:text-white font-bold text-xs px-4 py-2 rounded-full transition-all duration-200"
                >
                  <span>View All Videos</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Video Grid: 1 Big featured + 3 side thumbnails */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Big Featured Video */}
                {featuredVideo && (
                  <div
                    onClick={() => onPlayVideo(featuredVideo)}
                    className="sm:col-span-7 group relative aspect-[16/10] sm:aspect-auto rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer bg-slate-900 transition-all duration-300"
                  >
                    <img
                      src={featuredVideo.thumbnailUrl}
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    
                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    {/* Central Play Icon Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-slate-950/80 group-hover:bg-amber-500 text-white group-hover:text-slate-950 border-2 border-white/80 group-hover:border-amber-400 flex items-center justify-center shadow-xl transition-all duration-300 transform group-hover:scale-110">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div className="pr-2">
                        <h4 className="text-white font-bold text-sm leading-snug drop-shadow-sm">
                          {featuredVideo.title}
                        </h4>
                        <p className="text-[11px] text-amber-300 font-medium">
                          {featuredVideo.description}
                        </p>
                      </div>
                      <span className="bg-slate-950/80 text-white text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-sm shrink-0">
                        {featuredVideo.duration}
                      </span>
                    </div>
                  </div>
                )}

                {/* 3 Side Videos */}
                <div className="sm:col-span-5 flex flex-col justify-between gap-2.5">
                  {sideVideos.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onPlayVideo(item)}
                      className="group flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 hover:border-amber-200"
                    >
                      {/* Thumbnail with small play button */}
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-slate-900/80 group-hover:bg-amber-500 text-white group-hover:text-slate-900 flex items-center justify-center transition-colors">
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Text info */}
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-slate-800 group-hover:text-amber-600 transition-colors truncate">
                          {item.title}
                        </h5>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
