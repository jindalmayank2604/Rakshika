import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  MapPin,
  Bot,
  Users,
  Navigation,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Volume2,
  VolumeX,
  PhoneCall
} from 'lucide-react';
import { Button } from '../ui/Button';

export const CinematicStoryHero = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const animFrameRef = useRef(null);

  // Scroll tracking with smooth damping
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      setProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth lerp interpolation for silky 60fps animations
  useEffect(() => {
    let current = 0;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      current = lerp(current, progress, 0.12);
      setSmoothProgress(current);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [progress]);

  // Derive story phase values from smoothProgress (0.0 to 1.0)
  // Phase 1 (0.0 - 0.22): Calm Night
  // Phase 2 (0.22 - 0.45): Footsteps behind
  // Phase 3 (0.45 - 0.68): Tension & awareness
  // Phase 4 (0.68 - 0.88): Phone out & Rakshika UI
  // Phase 5 (0.88 - 1.00): Safe haven & Empowerment

  const p = smoothProgress;

  // Walking gait cycle derived from progress
  const walkSpeed = p * 42;
  const legAngleLeft = Math.sin(walkSpeed) * 26 * (p < 0.88 ? 1 : Math.max(0, 1 - (p - 0.88) * 8));
  const legAngleRight = Math.sin(walkSpeed + Math.PI) * 26 * (p < 0.88 ? 1 : Math.max(0, 1 - (p - 0.88) * 8));
  const armAngleLeft = Math.sin(walkSpeed + Math.PI) * 20 * (p < 0.65 ? 1 : 0.2);
  const armAngleRight = p > 0.65 ? -35 : Math.sin(walkSpeed) * 20;
  const bobbing = Math.abs(Math.sin(walkSpeed * 2)) * 5;

  // Background Parallax translations
  const bgCityX = -p * 180;
  const streetX = -p * 500;
  const lampX = -(p * 750) % 400;

  // Follower dynamics
  // Appears around p = 0.20, gets closer till 0.65, then fades/stops as safe zone arrives
  const followerOpacity = p < 0.18 ? 0 : p < 0.68 ? Math.min(1, (p - 0.18) * 4) : Math.max(0, 1 - (p - 0.68) * 5);
  const followerScale = 0.55 + Math.min(0.25, Math.max(0, (p - 0.25) * 0.6));
  const followerDistanceX = 140 - Math.min(60, Math.max(0, (p - 0.25) * 120));

  // Phone glow and Rakshika UI emergence
  const phoneUIVisibility = p < 0.62 ? 0 : p < 0.72 ? (p - 0.62) * 10 : p > 0.95 ? Math.max(0, 1 - (p - 0.95) * 10) : 1;
  const phoneGlowOpacity = Math.min(1, Math.max(0, (p - 0.60) * 4));

  // Ambient lighting transition: Dark Mauve/Black -> Warm Blush/Soft Pink Safe Haven
  const safeZoneLight = Math.max(0, (p - 0.80) * 5);

  return (
    <div ref={containerRef} className="relative w-full h-[450vh] bg-[#07070B] select-none">
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Visual Layers (Canvas / SVG World) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Dynamic Sky Gradient (Dark Night to Soft Blush-Lit Dawn/Haven) */}
          <div
            className="absolute inset-0 transition-colors duration-700"
            style={{
              background: `linear-gradient(180deg, 
                ${safeZoneLight > 0.5 ? '#1F1424' : '#07070B'} 0%, 
                ${safeZoneLight > 0.5 ? '#3A1E2E' : '#120E1A'} 45%, 
                ${safeZoneLight > 0.5 ? '#5C2D44' : '#1C1324'} 80%, 
                ${safeZoneLight > 0.5 ? '#351625' : '#0D0A12'} 100%)`
            }}
          />

          {/* Stars & Night Dust */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[12%] left-[18%] w-1 h-1 rounded-full bg-rose-200 animate-pulse" />
            <div className="absolute top-[22%] left-[45%] w-1.5 h-1.5 rounded-full bg-pink-100" />
            <div className="absolute top-[15%] left-[78%] w-1 h-1 rounded-full bg-rose-300 animate-pulse" />
            <div className="absolute top-[30%] left-[88%] w-1 h-1 rounded-full bg-pink-200" />
            <div className="absolute top-[8%] left-[60%] w-1.5 h-1.5 rounded-full bg-white opacity-80" />
          </div>

          {/* Distant City Skyline Silhouettes */}
          <svg
            className="absolute bottom-32 left-0 w-[200vw] h-64 text-[#140F1E] transition-transform duration-75"
            style={{ transform: `translateX(${bgCityX}px)` }}
            viewBox="0 0 1600 300"
            fill="currentColor"
          >
            <path d="M0 300 L0 180 L40 180 L40 120 L90 120 L90 200 L140 200 L140 90 L190 90 L190 300 L240 300 L240 140 L300 140 L300 300 L360 300 L360 110 L420 110 L420 190 L480 190 L480 300 L540 300 L540 80 L600 80 L600 300 L680 300 L680 160 L740 160 L740 300 L820 300 L820 100 L880 100 L880 300 L960 300 L960 130 L1020 130 L1020 300 L1100 300 L1100 90 L1180 90 L1180 300 L1260 300 L1260 150 L1340 150 L1340 300 L1420 300 L1420 110 L1500 110 L1500 300 L1600 300 Z" />
            {/* Glowing Window Dots */}
            <rect x="50" y="140" width="4" height="6" fill="#C08091" opacity="0.6" />
            <rect x="65" y="155" width="4" height="6" fill="#E8B4C0" opacity="0.5" />
            <rect x="155" y="110" width="4" height="6" fill="#FED7AA" opacity="0.4" />
            <rect x="380" y="130" width="4" height="6" fill="#C08091" opacity="0.7" />
            <rect x="560" y="100" width="4" height="6" fill="#E8B4C0" opacity="0.6" />
            <rect x="840" y="120" width="4" height="6" fill="#FED7AA" opacity="0.5" />
            <rect x="1120" y="110" width="4" height="6" fill="#C08091" opacity="0.7" />
          </svg>

          {/* Street Road & Sidewalk Perspective */}
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0A070F] via-[#120D1A] to-[#1C1428] border-t border-rose-950/40">
            {/* Sidewalk curb line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-900/30 via-slate-700/40 to-rose-900/30 shadow-md" />
            {/* Ground Texture / Street perspective lines */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(#C08091 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                transform: `translateX(${streetX % 32}px)`
              }}
            />
          </div>

          {/* Street Light Posts with Warm Dusty-Rose Cones */}
          <div
            className="absolute bottom-28 left-0 w-[300vw] h-96 flex justify-around pointer-events-none"
            style={{ transform: `translateX(${lampX}px)` }}
          >
            {[0, 1, 2, 3].map((lampIndex) => (
              <div key={lampIndex} className="relative flex flex-col items-center">
                {/* Lamp Pole */}
                <div className="w-1.5 h-64 bg-gradient-to-b from-slate-600 to-slate-900 rounded-t" />
                {/* Lamp Fixture */}
                <div className="w-8 h-3 rounded-full bg-rose-300 shadow-[0_0_20px_#C08091] -mt-1" />
                {/* Light Cone on Sidewalk */}
                <div
                  className="absolute top-2 w-64 h-80 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at top, rgba(232, 180, 192, 0.28) 0%, rgba(192, 128, 145, 0.12) 40%, transparent 75%)',
                    filter: 'blur(8px)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Safe Haven Warm Glow Entrance in Scene 5 (Appears as user reaches end) */}
          <div
            className="absolute bottom-24 right-[10%] w-96 h-96 rounded-full pointer-events-none transition-opacity duration-700"
            style={{
              opacity: safeZoneLight,
              background: 'radial-gradient(circle, rgba(232, 180, 192, 0.35) 0%, rgba(13, 148, 136, 0.18) 50%, transparent 80%)',
              filter: 'blur(30px)'
            }}
          />

          {/* 3D SCENE ACTORS: FOLLOWER & WOMAN */}
          <div className="absolute bottom-24 left-0 right-0 h-96 flex items-end justify-center pointer-events-none">
            {/* ACTOR 1: THE DISTANT FOLLOWER SILHOUETTE */}
            <div
              className="absolute transition-all duration-75"
              style={{
                left: `calc(50% - ${followerDistanceX}px)`,
                bottom: '12px',
                opacity: followerOpacity,
                transform: `scale(${followerScale})`,
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.8)) blur(0.5px)'
              }}
            >
              {/* Silhouette Vector */}
              <svg width="100" height="220" viewBox="0 0 100 220" fill="none">
                {/* Long casting shadow */}
                <ellipse cx="50" cy="210" rx="35" ry="8" fill="#030206" opacity="0.8" />
                {/* Shadow Coat / Body */}
                <path d="M35 50 C28 90 20 180 20 205 L80 205 C80 180 72 90 65 50 Z" fill="#0A0710" />
                {/* Coat Collar */}
                <path d="M35 50 L50 85 L65 50 Z" fill="#130E1E" />
                {/* Head / Hood */}
                <circle cx="50" cy="32" r="18" fill="#0A0710" />
                {/* Legs in walking stance */}
                <line
                  x1="38"
                  y1="200"
                  x2={38 + Math.sin(walkSpeed + 0.8) * 14}
                  y2="218"
                  stroke="#0A0710"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <line
                  x1="62"
                  y1="200"
                  x2={62 - Math.sin(walkSpeed + 0.8) * 14}
                  y2="218"
                  stroke="#0A0710"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* ACTOR 2: THE MAIN WOMAN HERO */}
            <div
              className="relative transition-transform duration-75"
              style={{
                transform: `translateY(${-bobbing}px)`,
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))'
              }}
            >
              <svg width="220" height="340" viewBox="0 0 220 340" fill="none">
                <defs>
                  {/* Woman Jacket Gradient: Sophisticated Deep Mauve & Dusty Rose */}
                  <linearGradient id="womanJacket" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8A4F65" />
                    <stop offset="50%" stopColor="#5E3345" />
                    <stop offset="100%" stopColor="#3B1C2A" />
                  </linearGradient>

                  {/* Skin Tone with Night/Phone Lighting */}
                  <linearGradient id="womanSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5D0C5" />
                    <stop offset="100%" stopColor="#D99B8B" />
                  </linearGradient>

                  {/* Dark Lustrous Hair */}
                  <linearGradient id="womanHair" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E1724" />
                    <stop offset="100%" stopColor="#140810" />
                  </linearGradient>

                  {/* Slacks / Pants */}
                  <linearGradient id="womanPants" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1C1420" />
                    <stop offset="100%" stopColor="#0B070D" />
                  </linearGradient>

                  {/* Phone Screen Glow */}
                  <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#C08091" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ground Contact Shadow */}
                <ellipse cx="110" cy="326" rx="48" ry="10" fill="#040206" opacity="0.85" />

                {/* LEFT LEG */}
                <g style={{ transformOrigin: '98px 190px', transform: `rotate(${legAngleLeft}deg)` }}>
                  <path d="M92 190 L92 270 L86 325" stroke="url(#womanPants)" strokeWidth="18" strokeLinecap="round" />
                  {/* Left Boot */}
                  <rect x="76" y="318" width="22" height="10" rx="4" fill="#070409" />
                </g>

                {/* RIGHT LEG */}
                <g style={{ transformOrigin: '122px 190px', transform: `rotate(${legAngleRight}deg)` }}>
                  <path d="M128 190 L128 270 L134 325" stroke="url(#womanPants)" strokeWidth="18" strokeLinecap="round" />
                  {/* Right Boot */}
                  <rect x="126" y="318" width="22" height="10" rx="4" fill="#070409" />
                </g>

                {/* TORSO & JACKET */}
                {/* Flowing Scarf / Inner Top */}
                <path d="M102 105 L110 145 L118 105 Z" fill="#E8B4C0" />
                {/* Tailored Jacket */}
                <path d="M85 110 C75 140 70 195 72 205 L148 205 C150 195 145 140 135 110 C125 100 95 100 85 110 Z" fill="url(#womanJacket)" />

                {/* LEFT ARM (Natural Swing) */}
                <g style={{ transformOrigin: '82px 115px', transform: `rotate(${armAngleLeft}deg)` }}>
                  <path d="M82 115 L74 165 L76 195" stroke="url(#womanJacket)" strokeWidth="16" strokeLinecap="round" />
                  <circle cx="76" cy="202" r="7" fill="url(#womanSkin)" />
                </g>

                {/* RIGHT ARM (Swings naturally in Scene 1-3, raises phone in Scene 4-5) */}
                <g style={{ transformOrigin: '138px 115px', transform: `rotate(${armAngleRight}deg)` }}>
                  <path
                    d={p > 0.65 ? "M138 115 L145 150 L126 142" : "M138 115 L146 165 L144 195"}
                    stroke="url(#womanJacket)"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  <circle cx={p > 0.65 ? 122 : 144} cy={p > 0.65 ? 140 : 202} r="7" fill="url(#womanSkin)" />

                  {/* SMARTPHONE IN HAND (Revealed in Phase 4 & 5) */}
                  {p > 0.62 && (
                    <g style={{ opacity: phoneGlowOpacity }}>
                      {/* Phone Body */}
                      <rect x="110" y="118" width="22" height="38" rx="4" fill="#0F172A" stroke="#E8B4C0" strokeWidth="1.5" />
                      {/* Phone Screen Glowing with Rakshika Teal/Rose */}
                      <rect x="112" y="121" width="18" height="32" rx="2" fill="#14B8A6" />
                      {/* Mini Shield Icon on Phone Screen */}
                      <circle cx="121" cy="132" r="4" fill="white" />
                      <circle cx="121" cy="132" r="2" fill="#E11D48" />
                    </g>
                  )}
                </g>

                {/* HEAD, FACE & HAIR */}
                {/* Neck */}
                <rect x="103" y="85" width="14" height="22" rx="6" fill="url(#womanSkin)" />

                {/* Head (Turns slightly when noticing at p between 0.45 and 0.68) */}
                <g style={{ transformOrigin: '110px 65px', transform: `rotate(${p > 0.45 && p < 0.68 ? -10 : 0}deg)` }}>
                  {/* Hair Base */}
                  <ellipse cx="110" cy="62" rx="28" ry="34" fill="url(#womanHair)" />
                  {/* Face Oval */}
                  <ellipse cx="110" cy="66" rx="20" ry="24" fill="url(#womanSkin)" />
                  {/* Flowing Waves Hair Over Shoulder */}
                  <path d="M88 55 C88 32 102 30 120 32 C138 35 140 55 136 75 C128 50 115 48 98 62 Z" fill="url(#womanHair)" />
                  <path d="M125 65 C132 85 130 115 125 130 C120 115 124 85 122 70 Z" fill="url(#womanHair)" />

                  {/* Facial Features */}
                  {/* Eyes (Confidence & Awareness) */}
                  <ellipse cx="103" cy="66" rx="2.5" ry="3" fill="#1A0D15" />
                  <ellipse cx="117" cy="66" rx="2.5" ry="3" fill="#1A0D15" />
                  <circle cx="104" cy="65" r="0.8" fill="white" />
                  <circle cx="118" cy="65" r="0.8" fill="white" />

                  {/* Soft blush on cheeks */}
                  <circle cx="99" cy="73" r="3.5" fill="#E8B4C0" opacity="0.6" />
                  <circle cx="121" cy="73" r="3.5" fill="#E8B4C0" opacity="0.6" />

                  {/* Lips: Serious during Scene 2-3, Calm & Empowered in Scene 5 */}
                  <path
                    d={p > 0.85 ? "M106 79 Q110 84 114 79" : "M106 80 L114 80"}
                    stroke="#A8526B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* Soft Light Reflection on Woman's Face from Phone in Scene 4 */}
                {p > 0.62 && (
                  <circle cx="116" cy="90" r="35" fill="url(#screenGlow)" pointerEvents="none" opacity={phoneGlowOpacity * 0.7} />
                )}
              </svg>
            </div>
          </div>

          {/* HOLOGRAPHIC RAKSHIKA GLASS UI (Revealed in Scene 4 & 5) */}
          <div
            className="absolute top-[22%] sm:top-[28%] left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-none transition-all duration-300"
            style={{
              opacity: phoneUIVisibility,
              transform: `translate(-50%, ${(1 - phoneUIVisibility) * 30}px) scale(${0.9 + phoneUIVisibility * 0.1})`
            }}
          >
            <div className="bg-[#181122]/90 backdrop-blur-2xl border border-rose-400/40 rounded-3xl p-5 shadow-[0_15px_45px_rgba(192,128,145,0.25)] space-y-3.5">
              {/* Top Status Bar */}
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-700 to-teal-500 flex items-center justify-center text-white text-xs font-black shadow-sm">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight">Rakshika Live Companion</h4>
                    <p className="text-[10px] text-teal-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                      Live Route Monitoring Active
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800/60">
                  GPS Linked
                </span>
              </div>

              {/* Safety Circle Dispatch Status */}
              <div className="p-3 bg-[#24172E]/90 rounded-2xl border border-rose-950/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-900/60 flex items-center justify-center text-rose-300 text-xs font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">Primary Circle: Ananya S.</p>
                    <p className="text-[10px] text-slate-400">Live coordinates receiving • Sector 12</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/40">
                  Connected
                </span>
              </div>

              {/* Rakshika AI Companion Advice */}
              <div className="p-3 bg-gradient-to-r from-teal-950/60 to-purple-950/60 rounded-2xl border border-teal-500/30 flex items-start gap-2.5">
                <Bot className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-teal-100 leading-snug">
                  <strong>Rakshika AI:</strong> Well-lit Metro Station entrance is <strong>120m ahead</strong> on your right. Stay on the illuminated sidewalk.
                </p>
              </div>

              {/* Quick SOS Trigger Button */}
              <div className="pt-1 flex items-center justify-between gap-2">
                <div className="flex-1 py-2 px-3 rounded-xl bg-rose-950/70 border border-rose-800/50 text-rose-200 text-[11px] font-bold flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>SOS Ready (Hold 3s)</span>
                </div>
                <div className="py-2 px-3 rounded-xl bg-slate-900/80 text-slate-300 text-[11px] font-semibold border border-slate-800">
                  Dial 112 Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOP CINEMATIC BRANDING & PROGRESS BAR */}
        <div className="relative z-30 pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-800 via-rose-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-rose-900/40 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">
                Rakshika
              </span>
              <span className="hidden sm:block text-[10px] font-bold tracking-widest text-rose-300/80 uppercase -mt-0.5">
                Smart Safety Story
              </span>
            </div>
          </Link>

          {/* Scene Chapter Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-rose-900/50 text-xs font-semibold text-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>
              {p < 0.22 && 'Scene 1: Walking Alone at Night'}
              {p >= 0.22 && p < 0.45 && 'Scene 2: Footsteps in the Distance'}
              {p >= 0.45 && p < 0.68 && 'Scene 3: Heightened Awareness'}
              {p >= 0.68 && p < 0.88 && 'Scene 4: Rakshika Companion Active'}
              {p >= 0.88 && 'Scene 5: Safe & Empowered'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Link to="/login">
              <button className="px-4 py-2 rounded-xl text-xs font-bold text-rose-100 hover:text-white hover:bg-white/10 transition-colors">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white text-xs font-bold shadow-md shadow-rose-900/50 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* BOTTOM STORY TEXT CAPTION OVERLAYS (Changes smoothly per scene) */}
        <div className="relative z-30 pb-10 px-4 sm:px-8 max-w-4xl mx-auto w-full text-center">
          {/* SCENE 1 CAPTION */}
          {p < 0.22 && (
            <div className="space-y-2 animate-fade-in">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-400 bg-rose-950/70 px-3 py-1 rounded-full border border-rose-900/60">
                01 • Normal Evening Commute
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                Walking back after a long day.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Quiet streets, distant city traffic, moving comfortably through the urban night.
              </p>
              <div className="pt-2 flex items-center justify-center gap-1 text-[11px] text-rose-300 font-bold animate-bounce">
                <span>Scroll down to continue the journey</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* SCENE 2 CAPTION */}
          {p >= 0.22 && p < 0.45 && (
            <div className="space-y-2 animate-fade-in">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/70 px-3 py-1 rounded-full border border-amber-900/60">
                02 • Something Feels Different
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                A distant shadow steps into the corridor.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Footsteps match your pace fifty paces behind. The street feels quieter than usual.
              </p>
            </div>
          )}

          {/* SCENE 3 CAPTION */}
          {p >= 0.45 && p < 0.68 && (
            <div className="space-y-2 animate-fade-in">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800/60">
                03 • Pure Heightened Awareness
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                Not helplessness — instant preparedness.
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-lg mx-auto">
                Instinct turns to proactive action. Knowing your safety circle is ready with one touch.
              </p>
            </div>
          )}

          {/* SCENE 4 CAPTION */}
          {p >= 0.68 && p < 0.88 && (
            <div className="space-y-2 animate-fade-in">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-950/70 px-3 py-1 rounded-full border border-teal-800/60">
                04 • Rakshika in Hand
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                Backed by real-time protection & AI guidance.
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto">
                Live location automatically shared, emergency contacts on alert, and the nearest safe haven identified.
              </p>
            </div>
          )}

          {/* SCENE 5 CAPTION & HERO FINAL CALL-TO-ACTION */}
          {p >= 0.88 && (
            <div className="space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-700/60 text-xs font-black text-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Smart Safety for Every Journey</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Protect. Prevent.{' '}
                <span className="bg-gradient-to-r from-rose-300 via-pink-200 to-teal-300 bg-clip-text text-transparent">
                  Empower.
                </span>
              </h1>

              <p className="text-xs sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
                Safety shouldn't start after something goes wrong. Rakshika helps you stay aware, report hazards, connect with trusted people, and move with unwavering confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-xl shadow-rose-950/60"
                    icon={ArrowRight}
                  >
                    Get Started Free
                  </Button>
                </Link>
                <a href="#map-preview" className="w-full sm:w-auto">
                  <Button
                    variant="glass"
                    size="lg"
                    className="w-full justify-center text-white bg-white/10 hover:bg-white/20 border-white/20"
                    icon={Navigation}
                  >
                    Explore Safety Map
                  </Button>
                </a>
              </div>
            </div>
          )}

          {/* Mini Scroll Timeline Bar */}
          <div className="w-48 mx-auto bg-slate-800/80 rounded-full h-1 mt-5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-600 to-teal-400 h-full rounded-full transition-all duration-75"
              style={{ width: `${p * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
