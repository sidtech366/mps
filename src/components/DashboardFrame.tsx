import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface DashboardFrameProps {
  url: string | null;
  onClose: () => void;
}

/**
 * Full-screen in-page frame for the real school dashboard. The dashboard runs
 * inside this iframe rather than a browser redirect, so the address bar always
 * stays on this site and the backend's own URL is never shown to the visitor.
 */
export const DashboardFrame: React.FC<DashboardFrameProps> = ({ url, onClose }) => {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!url) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
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
      aria-label="School login portal"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-white"
    >
      <button
        onClick={onClose}
        aria-label="Close and return to the website"
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 pl-3 pr-2.5 h-9 rounded-full bg-[#0c2340] text-white text-xs font-semibold shadow-lg hover:bg-[#13335e] transition-colors"
      >
        <span className="hidden sm:inline">Back to Website</span>
        <X className="w-4 h-4" />
      </button>
      <iframe
        src={url}
        title="School Management Portal"
        className="w-full h-full border-0"
        allow="clipboard-write"
      />
    </div>
  );
};
