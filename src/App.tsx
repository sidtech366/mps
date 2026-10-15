/**
 * Motherland Public School - Official Website
 */

import React, { useState, useEffect } from 'react';
import { HeaderTopBar } from './components/HeaderTopBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickActionBadges } from './components/QuickActionBadges';
import { AboutSchoolSection } from './components/AboutSchoolSection';
import { StaffCarouselSection } from './components/StaffCarouselSection';
import { GallerySection } from './components/GallerySection';
import { BottomGridSection } from './components/BottomGridSection';
import { Footer } from './components/Footer';

// Modals
import { AdmissionModal } from './components/modals/AdmissionModal';
import { LoginPortalModal } from './components/modals/LoginPortalModal';
import { FeeStructureModal } from './components/modals/FeeStructureModal';
import { OnlineFeeModal } from './components/modals/OnlineFeeModal';
import { ResultModal } from './components/modals/ResultModal';
import { DownloadFormsModal } from './components/modals/DownloadFormsModal';
import {
  LeaderProfileModal,
  NoticeDetailModal,
  VideoPlayerModal,
  PhotoLightboxModal,
  StaffDetailModal,
} from './components/modals/DetailModals';

import { AppData, Leader, NoticeItem, VideoItem, GalleryPhoto, StaffMember } from './types';
import { defaultSchoolData } from './data/defaultData';
import { fetchSchoolData } from './services/appsScriptService';

export default function App() {
  const [appData, setAppData] = useState<AppData>(defaultSchoolData);
  const [activeNav, setActiveNav] = useState('home');

  // Modal Visibility States
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState('student');
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [onlineFeeModalOpen, setOnlineFeeModalOpen] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [downloadFormsModalOpen, setDownloadFormsModalOpen] = useState(false);

  // Detail Modal States
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Fetch data on initial mount
  useEffect(() => {
    async function loadData() {
      const res = await fetchSchoolData();
      setAppData(res.data);
    }
    loadData();
  }, []);

  // Smooth scroll or navigation
  const handleNavigate = (sectionId: string) => {
    setActiveNav(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveNav('home');
  };

  // Centralized Quick Action click handler
  const handleQuickAction = (actionKey: string) => {
    switch (actionKey) {
      case 'admission':
        setAdmissionModalOpen(true);
        break;
      case 'student_login':
        setLoginRole('student');
        setLoginModalOpen(true);
        break;
      case 'parent_login':
        setLoginRole('parent');
        setLoginModalOpen(true);
        break;
      case 'staff_login':
        setLoginRole('staff');
        setLoginModalOpen(true);
        break;
      case 'result':
        setResultModalOpen(true);
        break;
      case 'fee_structure':
        setFeeModalOpen(true);
        break;
      case 'online_fee':
        setOnlineFeeModalOpen(true);
        break;
      case 'download_forms':
        setDownloadFormsModalOpen(true);
        break;
      default:
        break;
    }
  };

  // Handle Hero Login submission
  const handleHeroLogin = (mobileOrAction: string, roleName: string) => {
    setLoginRole(roleName);
    setLoginModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. Header Top Bar (Navy Blue) */}
      <HeaderTopBar config={appData.config} />

      {/* 2. Main Navigation Bar */}
      <Navbar
        config={appData.config}
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onOpenLoginModal={() => {
          setLoginRole('student');
          setLoginModalOpen(true);
        }}
      />

      <main className="flex-1">
        {/* 3. Hero Section with Floating Login Widget */}
        <HeroSection
          config={appData.config}
          onExploreClick={() => handleNavigate('about')}
          onLoginSubmit={handleHeroLogin}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* 4. Quick Action Badges Bar (Overlapping strip) */}
        <QuickActionBadges onActionClick={handleQuickAction} />

        {/* 5. About School & Leadership Section */}
        <AboutSchoolSection
          config={appData.config}
          leaders={appData.leaders}
          onKnowMoreClick={() => handleNavigate('campus')}
          onViewLeaderProfile={(leader) => setSelectedLeader(leader)}
        />

        {/* 6. Dedicated Staff Carousel */}
        <StaffCarouselSection
          staffList={appData.staff}
          onViewAllStaff={() => {
            const firstStaff = appData.staff[0];
            if (firstStaff) setSelectedStaff(firstStaff);
          }}
          onSelectStaff={(staff) => setSelectedStaff(staff)}
        />

        {/* 7. Photo Gallery & Video Gallery (2 columns) */}
        <GallerySection
          photos={appData.photos}
          videos={appData.videos}
          onViewAllPhotos={() => {
            if (appData.photos.length > 0) setSelectedPhoto(appData.photos[0]);
          }}
          onViewAllVideos={() => {
            if (appData.videos.length > 0) setSelectedVideo(appData.videos[0]);
          }}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          onPlayVideo={(video) => setSelectedVideo(video)}
        />

        {/* 8. Bottom Grid: Quick Links, Latest Notices, Request for Admission */}
        <BottomGridSection
          notices={appData.notices}
          onActionClick={handleQuickAction}
          onNoticeClick={(notice) => setSelectedNotice(notice)}
          onViewAllNotices={() => {
            if (appData.notices.length > 0) setSelectedNotice(appData.notices[0]);
          }}
          onApplyAdmission={() => setAdmissionModalOpen(true)}
        />
      </main>

      {/* 9. Comprehensive Footer */}
      <Footer
        config={appData.config}
        onNavigate={handleNavigate}
        onOpenLoginModal={() => {
          setLoginRole('student');
          setLoginModalOpen(true);
        }}
        onScrollToTop={handleScrollToTop}
      />

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Online Admission Application Modal */}
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        schoolName={appData.config.schoolName}
        classes={appData.classes}
      />

      {/* Student / Parent / Staff Login Modal */}
      <LoginPortalModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        initialRole={loginRole}
      />

      {/* Fee Structure Modal */}
      <FeeStructureModal
        isOpen={feeModalOpen}
        onClose={() => setFeeModalOpen(false)}
        fees={appData.feeStructure}
        onOpenOnlinePayment={() => setOnlineFeeModalOpen(true)}
      />

      {/* Online Fee Payment Modal (requires login - no unauthenticated backend endpoint) */}
      <OnlineFeeModal
        isOpen={onlineFeeModalOpen}
        onClose={() => setOnlineFeeModalOpen(false)}
        schoolName={appData.config.schoolName}
        onOpenLogin={() => { setLoginRole('student'); setLoginModalOpen(true); }}
      />

      {/* Result Verification Modal (requires login - no unauthenticated backend endpoint) */}
      <ResultModal
        isOpen={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
        schoolName={appData.config.schoolName}
        onOpenLogin={() => { setLoginRole('student'); setLoginModalOpen(true); }}
      />

      {/* Download Forms Modal (requires login - no unauthenticated backend endpoint) */}
      <DownloadFormsModal
        isOpen={downloadFormsModalOpen}
        onClose={() => setDownloadFormsModalOpen(false)}
        schoolName={appData.config.schoolName}
        onOpenLogin={() => { setLoginRole('student'); setLoginModalOpen(true); }}
      />

      {/* Leader Profile Modal */}
      <LeaderProfileModal
        leader={selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />

      {/* Notice Detail Modal */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Photo Lightbox Modal */}
      <PhotoLightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* Staff Member Profile Modal */}
      <StaffDetailModal
        staff={selectedStaff}
        onClose={() => setSelectedStaff(null)}
      />

    </div>
  );
}
