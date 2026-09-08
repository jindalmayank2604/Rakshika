import React from 'react';

/**
 * 3D Caricature Style SVG Illustrations
 * Crafted with soft gradients, rounded friendly geometry, modern lighting, and reassuring aesthetics.
 */

export const Hero3DIllustration = ({ className = "w-full max-w-lg h-auto" }) => (
  <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="heroBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EEF2FF" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#E0E7FF" stop-opacity="0.3" />
      </linearGradient>
      <linearGradient id="characterSkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FED7AA" />
        <stop offset="100%" stop-color="#FDBA74" />
      </linearGradient>
      <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366F1" />
        <stop offset="100%" stop-color="#4338CA" />
      </linearGradient>
      <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#312E81" />
        <stop offset="100%" stop-color="#1E1B4B" />
      </linearGradient>
      <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E293B" />
        <stop offset="100%" stop-color="#0F172A" />
      </linearGradient>
      <linearGradient id="shieldGradGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2DD4BF" />
        <stop offset="100%" stop-color="#0D9488" />
      </linearGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#6366F1" flood-opacity="0.25"/>
      </filter>
      <filter id="tealGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0D9488" flood-opacity="0.35"/>
      </filter>
      <filter id="roseGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#E11D48" flood-opacity="0.3"/>
      </filter>
    </defs>

    {/* Soft background aura circles */}
    <circle cx="300" cy="250" r="200" fill="url(#heroBgGrad)" />
    <circle cx="450" cy="140" r="70" fill="#CCFBF1" fill-opacity="0.6" filter="blur(20px)" />
    <circle cx="160" cy="380" r="90" fill="#DDD6FE" fill-opacity="0.5" filter="blur(30px)" />

    {/* Floating Safety Indicators (Glass Badges) */}
    {/* Badge 1: Live Safety Shield */}
    <g filter="url(#tealGlow)" className="animate-float">
      <rect x="70" y="110" width="160" height="52" rx="26" fill="white" fill-opacity="0.9" />
      <circle cx="96" cy="136" r="16" fill="url(#shieldGradGlow)" />
      <path d="M96 128 L99 134 L105 135 L100 139 L102 145 L96 141 L90 145 L92 139 L87 135 L93 134 Z" fill="white" />
      <text x="122" y="132" font-family="Plus Jakarta Sans" font-size="11" font-weight="700" fill="#0F766E">SAFE ZONE</text>
      <text x="122" y="146" font-family="Plus Jakarta Sans" font-size="9" font-weight="500" fill="#64748B">Live Protected</text>
    </g>

    {/* Badge 2: Emergency Contact Circle */}
    <g filter="url(#softGlow)" style={{ animation: 'float 5s ease-in-out infinite 1s' }}>
      <rect x="380" y="90" width="160" height="52" rx="26" fill="white" fill-opacity="0.9" />
      <circle cx="406" cy="116" r="16" fill="#6366F1" />
      <circle cx="406" cy="113" r="6" fill="#EEF2FF" />
      <path d="M397 125 C397 120 401 118 406 118 C411 118 415 120 415 125 Z" fill="#EEF2FF" />
      <text x="432" y="112" font-family="Plus Jakarta Sans" font-size="11" font-weight="700" fill="#4338CA">3 CONTACTS</text>
      <text x="432" y="126" font-family="Plus Jakarta Sans" font-size="9" font-weight="500" fill="#64748B">Circle Active</text>
    </g>

    {/* Badge 3: AI Assistant Guidance */}
    <g filter="url(#roseGlow)" style={{ animation: 'float 7s ease-in-out infinite 2s' }}>
      <rect x="390" y="340" width="150" height="50" rx="25" fill="white" fill-opacity="0.9" />
      <circle cx="415" cy="365" r="15" fill="#E11D48" />
      <text x="415" y="370" font-family="Plus Jakarta Sans" font-size="14" font-weight="800" fill="white" text-anchor="middle">AI</text>
      <text x="438" y="361" font-family="Plus Jakarta Sans" font-size="10" font-weight="700" fill="#9F1239">Rakshika AI</text>
      <text x="438" y="374" font-family="Plus Jakarta Sans" font-size="9" font-weight="500" fill="#64748B">Route Ready</text>
    </g>

    {/* Central 3D Confident Woman Character */}
    <g filter="url(#softGlow)">
      {/* Hair back volume */}
      <ellipse cx="295" cy="205" rx="55" ry="60" fill="url(#hairGrad)" />
      
      {/* Neck */}
      <rect x="286" y="240" width="24" height="35" rx="10" fill="url(#characterSkin)" />

      {/* Head / Face */}
      <ellipse cx="298" cy="195" rx="38" ry="44" fill="url(#characterSkin)" />
      
      {/* Hair bangs / front stylish wave */}
      <path d="M260 180 C260 145 285 140 315 145 C345 150 345 185 340 200 C325 170 300 165 275 185 Z" fill="url(#hairGrad)" />
      
      {/* Soft warm facial features */}
      {/* Eyes */}
      <ellipse cx="284" cy="195" rx="4" ry="5" fill="#1E1B4B" />
      <circle cx="285" cy="193" r="1.5" fill="white" />
      <ellipse cx="312" cy="195" rx="4" ry="5" fill="#1E1B4B" />
      <circle cx="313" cy="193" r="1.5" fill="white" />
      
      {/* Eyebrows */}
      <path d="M278 186 Q285 183 291 187" stroke="#312E81" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M305 187 Q312 183 319 186" stroke="#312E81" stroke-width="2.5" stroke-linecap="round" fill="none" />
      
      {/* Cheerful confident smile */}
      <path d="M289 214 Q298 222 307 214" stroke="#E11D48" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <circle cx="277" cy="207" r="5" fill="#FB7185" fill-opacity="0.4" />
      <circle cx="319" cy="207" r="5" fill="#FB7185" fill-opacity="0.4" />

      {/* Modern Stylish Jacket / Torso */}
      <path d="M250 270 C240 320 230 430 230 460 L370 460 C370 430 360 320 350 270 C335 260 315 255 298 255 C280 255 265 260 250 270 Z" fill="url(#jacketGrad)" />
      
      {/* Inner top */}
      <path d="M280 262 L298 295 L316 262 Z" fill="#EEF2FF" />

      {/* Hands holding modern smartphone with safety shield displayed */}
      {/* Left arm */}
      <path d="M245 285 Q220 340 260 370" stroke="url(#jacketGrad)" stroke-width="26" stroke-linecap="round" fill="none" />
      {/* Right arm */}
      <path d="M350 285 Q375 340 335 370" stroke="url(#jacketGrad)" stroke-width="26" stroke-linecap="round" fill="none" />

      {/* Smartphone */}
      <rect x="272" y="315" width="56" height="95" rx="12" fill="url(#phoneGrad)" />
      <rect x="276" y="322" width="48" height="81" rx="8" fill="#F8FAFC" />
      
      {/* Phone Screen UI (Shield + Pulse) */}
      <circle cx="300" cy="355" r="16" fill="#EEF2FF" />
      <path d="M300 345 C308 345 312 349 312 355 C312 363 300 371 300 371 C300 371 288 363 288 355 C288 349 292 345 300 345 Z" fill="#6366F1" />
      <rect x="286" y="380" width="28" height="4" rx="2" fill="#6366F1" />
      <rect x="290" y="388" width="20" height="3" rx="1.5" fill="#CBD5E1" />

      {/* Hands on phone */}
      <circle cx="268" cy="365" r="11" fill="url(#characterSkin)" />
      <circle cx="332" cy="365" r="11" fill="url(#characterSkin)" />
    </g>
  </svg>
);

export const AIAssistantIllustration = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="aiOrbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#818CF8" />
        <stop offset="50%" stop-color="#6366F1" />
        <stop offset="100%" stop-color="#0D9488" />
      </linearGradient>
      <filter id="aiGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#6366F1" flood-opacity="0.4"/>
      </filter>
    </defs>
    <g filter="url(#aiGlow)">
      <circle cx="60" cy="60" r="45" fill="url(#aiOrbGrad)" />
      <circle cx="60" cy="60" r="38" fill="white" fill-opacity="0.15" />
      
      {/* Friendly Eyes */}
      <circle cx="48" cy="56" r="4" fill="white" />
      <circle cx="72" cy="56" r="4" fill="white" />
      
      {/* Smile */}
      <path d="M52 68 Q60 76 68 68" stroke="white" stroke-width="3" stroke-linecap="round" fill="none" />

      {/* Sparkles */}
      <path d="M60 24 L62 30 L68 32 L62 34 L60 40 L58 34 L52 32 L58 30 Z" fill="#FDE047" />
      <circle cx="86" cy="40" r="3" fill="#FDE047" />
    </g>
  </svg>
);

export const Success3DIllustration = ({ className = "w-36 h-36" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34D399" />
        <stop offset="100%" stop-color="#059669" />
      </linearGradient>
      <filter id="successGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#059669" flood-opacity="0.3"/>
      </filter>
    </defs>
    <circle cx="80" cy="80" r="65" fill="#ECFDF5" />
    <g filter="url(#successGlow)">
      <circle cx="80" cy="80" r="50" fill="url(#successGrad)" />
      <path d="M56 80 L72 96 L106 62" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <circle cx="40" cy="45" r="5" fill="#6EE7B7" />
    <circle cx="120" cy="45" r="4" fill="#6EE7B7" />
    <circle cx="130" cy="115" r="6" fill="#A7F3D0" />
  </svg>
);

export const EmptyStateIllustration = ({ className = "w-44 h-44" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="75" fill="#F5F3FF" />
    <circle cx="100" cy="100" r="55" fill="#EDE9FE" />
    <path d="M75 90 C75 75 85 65 100 65 C115 65 125 75 125 90 C125 102 115 110 100 120 L100 130" stroke="#818CF8" stroke-width="6" stroke-linecap="round" fill="none" />
    <circle cx="100" cy="148" r="4" fill="#818CF8" />
  </svg>
);
