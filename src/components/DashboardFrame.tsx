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
        aria-label="Close"
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-lg hover:bg-[#13335e] transition-colors"
      >
        <X className="w-5 h-5" />
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
