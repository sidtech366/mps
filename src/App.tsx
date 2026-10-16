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
import { DashboardFrame } from './components/DashboardFrame';
import { PageLoader } from './components/PageLoader';

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
import { fetchSchoolData, buildDashboardSsoUrl, checkSession } from './services/appsScriptService';
import { saveSessionToken, loadSessionToken, clearSessionToken } from './services/session';

export default function App() {
  const [appData, setAppData] = useState<AppData>(defaultSchoolData);
  const [activeNav, setActiveNav] = useState('home');
  // True until the first real fetchSchoolData() resolves - while true, a full-page
  // branded preloader covers the whole site, so visitors never see the bundled demo
  // content flash before the live data quietly swaps in underneath.
  const [loading, setLoading] = useState(true);

  // Modal Visibility States
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState('student');
  const [loginMode, setLoginMode] = useState<'login' | 'forgot'>('login');
  // Real school dashboard, shown in-page via iframe (never a redirect) once logged in.
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
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
      // Whether the fetch ended up live or fell back to demo data, it's a real,
      // final state now - fade the preloader away either way.
      setLoading(false);
    }
    loadData();
  }, []);

  // If this browser already has a valid login session (saved on a previous visit),
  // jump straight into the dashboard - no homepage/login needed again. Only an actual
  // logout or an expired session (backend keeps the token alive for 6 hours) sends the
  // visitor back to the normal homepage.
  useEffect(() => {
    const saved = loadSessionToken();
    if (!saved) return;
    checkSession(saved).then((valid) => {
      if (valid) {
        setDashboardUrl(buildDashboardSsoUrl(saved));
      } else {
        clearSessionToken();
      }
    });
  }, []);

  const handleLoggedIn = (token: string) => {
    saveSessionToken(token);
    setDashboardUrl(buildDashboardSsoUrl(token));
  };

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
        setLoginMode('login');
        setLoginModalOpen(true);
        break;
      case 'parent_login':
        setLoginRole('parent');
        setLoginMode('login');
        setLoginModalOpen(true);
        break;
      case 'staff_login':
        setLoginRole('staff');
        setLoginMode('login');
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


  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">

      {/* 0. Full-page branded preloader - covers everything until live data is ready,
          then fades away smoothly (no demo-content flash, no per-section skeletons). */}
      <PageLoader active={loading} logoUrl={appData.config.logoUrl} schoolName={appData.config.schoolName} />

      {/* 1. Header Top Bar (Navy Blue) */}
      <HeaderTopBar config={appData.config} />

      {/* 2. Main Navigation Bar */}
      <Navbar
        config={appData.config}
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onOpenLoginModal={() => {
          setLoginRole('student');
          setLoginMode('login');
          setLoginModalOpen(true);
        }}
      />

      <main className="flex-1">
        {/* 3. Hero Section with Floating Login Widget */}
        <HeroSection
          config={appData.config}
          onExploreClick={() => handleNavigate('about')}
          onLoggedIn={handleLoggedIn}
          onForgotPassword={() => {
            setLoginMode('forgot');
            setLoginModalOpen(true);
          }}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* 4. Quick Action Badges Bar (Overlapping strip) */}
        <QuickActionBadges onActionClick={handleQuickAction} labels={appData.config.quickLinkLabels} />

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
          config={appData.config}
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
          config={appData.config}
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
          config={appData.config}
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
          setLoginMode('login');
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
        initialMode={loginMode}
        onLoggedIn={handleLoggedIn}
      />

      {/* Real school dashboard - opens in-page via iframe, address bar stays on this site */}
      <DashboardFrame url={dashboardUrl} onClose={() => setDashboardUrl(null)} />

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
        onOpenLogin={() => { setLoginRole('student'); setLoginMode('login'); setLoginModalOpen(true); }}
      />

      {/* Result Verification Modal (requires login - no unauthenticated backend endpoint) */}
      <ResultModal
        isOpen={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
        schoolName={appData.config.schoolName}
        onOpenLogin={() => { setLoginRole('student'); setLoginMode('login'); setLoginModalOpen(true); }}
      />

      {/* Download Forms Modal (requires login - no unauthenticated backend endpoint) */}
      <DownloadFormsModal
        isOpen={downloadFormsModalOpen}
        onClose={() => setDownloadFormsModalOpen(false)}
        schoolName={appData.config.schoolName}
        onOpenLogin={() => { setLoginRole('student'); setLoginMode('login'); setLoginModalOpen(true); }}
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
