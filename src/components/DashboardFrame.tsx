import React, { useEffect, useRef } from 'react';

interface DashboardFrameProps {
  url: string | null;
  onClose: () => void;
}

/**
 * Full-screen in-page frame for the real school dashboard. The dashboard runs
 * inside this iframe rather than a browser redirect, so the address bar always
 * stays on this site and the backend's own URL is never shown to the visitor.
 *
 * There is no close button here by design - the phone/browser's own Back
 * gesture closes it. A history entry is pushed the moment it opens, so Back
 * pops straight out of the dashboard and back onto the website instead of
 * leaving the site entirely.
 */
export const DashboardFrame: React.FC<DashboardFrameProps> = ({ url, onClose }) => {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!url) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    try {
      window.history.pushState({ mpsDashboard: true }, '', window.location.href);
    } catch (err) {
      // history API unavailable in some embedded/preview contexts - Escape still works
    }
    const onPopState = () => onClose();
    window.addEventListener('popstate', onPopState);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus.current && typeof previousFocus.current.focus === 'function') {
        previousFocus.current.focus();
      }
    };
  }, [url, onClose]);

  if (!url) return null;

  return (
    <div
      role="dialog"
      aria-label="School Management Portal"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-white"
    >
      <iframe
        src={url}
        title="School Management Portal"
        className="w-full h-full border-0"
        allow="clipboard-write"
      />
    </div>
  );
};
