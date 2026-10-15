import React from 'react';

interface SchoolLogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({ size = 'md', theme = 'light', className = '' }) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {/* Outer Golden/Teal Ring */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        <circle cx="50" cy="50" r="47" fill={theme === 'dark' ? '#081c33' : '#ffffff'} stroke="#d97706" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="43" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
        
        {/* Laurel Wreath / Leaves in Green */}
        <path
          d="M 22 68 C 15 50 18 30 35 20 C 32 30 35 45 44 52 C 34 54 26 60 22 68 Z"
          fill="#10b981"
          opacity="0.85"
        />
        <path
          d="M 78 68 C 85 50 82 30 65 20 C 68 30 65 45 56 52 C 66 54 74 60 78 68 Z"
          fill="#10b981"
          opacity="0.85"
        />

        {/* Rising Sun Rays */}
        <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
          <line x1="50" y1="23" x2="50" y2="17" />
          <line x1="42" y1="25" x2="38" y2="20" />
          <line x1="58" y1="25" x2="62" y2="20" />
          <line x1="36" y1="30" x2="31" y2="27" />
          <line x1="64" y1="30" x2="69" y2="27" />
        </g>
        <circle cx="50" cy="33" r="8" fill="#f59e0b" />

        {/* Open Book in Center */}
        <path
          d="M 50 48 C 42 43 32 44 26 48 L 26 67 C 33 63 42 63 50 67 C 58 63 67 63 74 67 L 74 48 C 68 44 58 43 50 48 Z"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="2"
        />
        <line x1="50" y1="48" x2="50" y2="67" stroke="#0f172a" strokeWidth="2" />
        
        {/* Flame of Knowledge */}
        <path
          d="M 50 45 C 47 41 46 38 50 35 C 54 38 53 41 50 45 Z"
          fill="#dc2626"
        />
        <path
          d="M 50 44 C 48.5 41.5 48 39.5 50 37 C 52 39.5 51.5 41.5 50 44 Z"
          fill="#facc15"
        />

        {/* Lower Motto Ribbon */}
        <path
          d="M 20 78 Q 50 86 80 78 Q 72 88 50 90 Q 28 88 20 78 Z"
          fill="#0c2340"
        />
        <text
          x="50"
          y="85"
          textAnchor="middle"
          fontSize="5.5"
          fontWeight="bold"
          fill="#fef08a"
          letterSpacing="0.8"
        >
          MPS
        </text>
      </svg>
    </div>
  );
};
