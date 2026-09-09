import React from 'react';

// 3D Protective Safety Shield
export const Shield3D = ({ className = "w-24 h-24", glow = true }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-wine-plum/30 via-smoky-rose/25 to-almond-silk/30 blur-xl animate-pulse-slow" />
      )}
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8c5254" />
            <stop offset="50%" stopColor="#6d2e46" />
            <stop offset="100%" stopColor="#3a1322" />
          </linearGradient>
          <linearGradient id="shieldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ece2d0" />
            <stop offset="50%" stopColor="#d5bdaf" />
            <stop offset="100%" stopColor="#a26769" />
          </linearGradient>
          <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ece2d0" />
          </linearGradient>
          <radialGradient id="shieldGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#e3d5ca" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6d2e46" stopOpacity="0" />
          </radialGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#3a1322" floodOpacity="0.35" />
          </filter>
        </defs>
        {/* Outer Bevel / 3D rim */}
        <path
          d="M60 12 C78 12 102 20 102 44 C102 80 60 106 60 106 C60 106 18 80 18 44 C18 20 42 12 60 12 Z"
          fill="url(#shieldRim)"
          filter="url(#softShadow)"
        />
        {/* Inner Shield Body */}
        <path
          d="M60 18 C75 18 96 25 96 46 C96 76 60 99 60 99 C60 99 24 76 24 46 C24 25 45 18 60 18 Z"
          fill="url(#shieldGrad)"
        />
        {/* Ambient Top Light Reflection */}
        <path
          d="M60 20 C73 20 92 27 92 46 C92 56 80 72 60 84 C40 72 28 56 28 46 C28 27 47 20 60 20 Z"
          fill="url(#shieldGlow)"
          opacity="0.4"
        />
        {/* Luminous Check Icon with 3D Depth */}
        <path
          d="M44 56 L55 67 L78 44"
          fill="none"
          stroke="url(#checkGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// 3D Safe Route Navigator Illustration
export const SafeRoute3D = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 via-powder-petal/30 to-wine-plum/20 blur-lg animate-pulse-slow" />
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="routePinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a26769" />
            <stop offset="100%" stopColor="#6d2e46" />
          </linearGradient>
          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d5bdaf" />
            <stop offset="100%" stopColor="#a26769" />
          </linearGradient>
        </defs>
        {/* 3D Map Base Plate */}
        <ellipse cx="60" cy="94" rx="44" ry="18" fill="#d6ccc2" opacity="0.6" />
        <ellipse cx="60" cy="90" rx="42" ry="16" fill="#f5ebe0" />
        {/* Curving Safety Corridor Path */}
        <path
          d="M32 94 C42 80 50 82 60 70 C70 58 84 56 88 42"
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M32 94 C42 80 50 82 60 70 C70 58 84 56 88 42"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        {/* Start Point Dot */}
        <circle cx="32" cy="94" r="6" fill="#6d2e46" stroke="#ffffff" strokeWidth="2" />
        {/* 3D Floating Pin Destination */}
        <g className="animate-float">
          <path
            d="M88 18 C77 18 68 27 68 38 C68 53 88 72 88 72 C88 72 108 53 108 38 C108 27 99 18 88 18 Z"
            fill="url(#routePinGrad)"
          />
          <circle cx="88" cy="38" r="8" fill="#ece2d0" />
          <circle cx="88" cy="38" r="4" fill="#6d2e46" />
        </g>
      </svg>
    </div>
  );
};

// 3D AI Safety Companion Sphere
export const AiCompanion3D = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-wine-plum/30 via-smoky-rose/25 to-almond-silk/30 blur-xl animate-pulse-slow" />
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <radialGradient id="aiSphereGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#d5bdaf" />
            <stop offset="70%" stopColor="#a26769" />
            <stop offset="100%" stopColor="#6d2e46" />
          </radialGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ece2d0" />
            <stop offset="100%" stopColor="#a26769" />
          </linearGradient>
        </defs>
        {/* Orbital Ring Background */}
        <ellipse
          cx="60"
          cy="60"
          rx="52"
          ry="20"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="3.5"
          transform="rotate(-25 60 60)"
          strokeDasharray="6 3"
          opacity="0.8"
        />
        {/* 3D Main Sphere */}
        <circle cx="60" cy="60" r="34" fill="url(#aiSphereGrad)" />
        {/* Cute Sparkle / Friendly Intelligence Eye */}
        <circle cx="52" cy="54" r="5" fill="#3a1322" />
        <circle cx="68" cy="54" r="5" fill="#3a1322" />
        <circle cx="50" cy="52" r="1.8" fill="#ffffff" />
        <circle cx="66" cy="52" r="1.8" fill="#ffffff" />
        <path
          d="M54 65 Q60 70 66 65"
          fill="none"
          stroke="#3a1322"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Orbital Ring Foreground Overlay */}
        <path
          d="M 12 76 A 52 20 0 0 0 108 44"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="3.5"
          transform="rotate(-25 60 60)"
        />
      </svg>
    </div>
  );
};

// 3D Community Incident Reporter Badge
export const CommunityReport3D = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-powder-petal/30 via-almond-silk/30 to-wine-plum/20 blur-lg animate-pulse-slow" />
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="commGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a26769" />
            <stop offset="100%" stopColor="#6d2e46" />
          </linearGradient>
          <linearGradient id="commCard" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdfbf9" />
            <stop offset="100%" stopColor="#e3d5ca" />
          </linearGradient>
        </defs>
        {/* Floating 3D report card */}
        <rect
          x="24"
          y="28"
          width="72"
          height="76"
          rx="14"
          fill="url(#commCard)"
          stroke="#d6ccc2"
          strokeWidth="2"
        />
        {/* Card Header & Lines */}
        <rect x="36" y="42" width="48" height="7" rx="3.5" fill="#a26769" opacity="0.85" />
        <rect x="36" y="56" width="34" height="5" rx="2.5" fill="#d5bdaf" />
        <rect x="36" y="66" width="42" height="5" rx="2.5" fill="#d5bdaf" />
        {/* 3D Verification Star Seal */}
        <circle cx="82" cy="80" r="15" fill="url(#commGrad)" />
        <path
          d="M82 72 L84.5 77.5 L90.5 78.5 L86 82.5 L87 88.5 L82 85.5 L77 88.5 L78 82.5 L73.5 78.5 L79.5 77.5 Z"
          fill="#ece2d0"
        />
      </svg>
    </div>
  );
};
