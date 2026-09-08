import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  Bot,
  Users,
  Navigation,
  ArrowRight,
  Sparkles,
  ChevronDown,
  PhoneCall,
  Activity,
  Heart,
  Eye,
  SunMedium,
  VideoOff,
  Footprints,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useSafety } from '../../context/SafetyContext';

export const SeamlessCinematicLanding = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const animFrameRef = useRef(null);
  const { reports } = useSafety();

  // Scroll listener tracking entire container
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

  // Silky 60fps interpolation
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

  const p = smoothProgress;

  // Chapter jump helper
  const scrollToChapter = (targetP) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalHeight = rect.height - window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + targetP * totalHeight;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Walking gait cycle derived continuously from progress
  const walkSpeed = p * 60;
  const isWalking = p < 0.72;
  const legAngleLeft = isWalking ? Math.sin(walkSpeed) * 28 : 0;
  const legAngleRight = isWalking ? Math.sin(walkSpeed + Math.PI) * 28 : 0;
  const armAngleLeft = isWalking ? Math.sin(walkSpeed + Math.PI) * 22 : 5;
  const armAngleRight = p > 0.32 ? -36 : Math.sin(walkSpeed) * 22;
  const bobbing = isWalking ? Math.abs(Math.sin(walkSpeed * 2)) * 5 : 0;

  // Parallax shifts
  const bgCityX = -p * 260;
  const streetX = -p * 800;
  const lampX = -(p * 1200) % 400;

  // Follower dynamics
  // Appears around p = 0.14, stays prominent through p = 0.38, fades into past by p = 0.58
  const followerOpacity = p < 0.12 ? 0 : p < 0.40 ? Math.min(1, (p - 0.12) * 5) : Math.max(0, 1 - (p - 0.40) * 5);
  const followerDistanceX = 160 - Math.min(75, Math.max(0, (p - 0.14) * 160));
  const followerScale = 0.55 + Math.min(0.25, Math.max(0, (p - 0.14) * 0.7));

  // Phone glow and UI triggers
  const phoneActive = p >= 0.30;
  const phoneGlowOpacity = Math.min(1, Math.max(0, (p - 0.28) * 5));

  // Safe haven ambient lighting (transitions into warm blush & gold)
  const safeZoneLight = Math.max(0, (p - 0.68) * 3.5);

  // Chapter index definition
  const chapters = [
    { id: 1, target: 0.05, title: 'The Commute', desc: 'Evening journey begins' },
    { id: 2, target: 0.20, title: 'Awareness', desc: 'Heightened vigilance' },
    { id: 3, target: 0.36, title: 'SOS Circle', desc: 'Live GPS & trusted contacts' },
    { id: 4, target: 0.50, title: 'Rakshika AI', desc: 'Real-time safety guidance' },
    { id: 5, target: 0.66, title: 'Safety Map', desc: 'Community hazard pins' },
    { id: 6, target: 0.80, title: 'How It Works', desc: '4-step prevention circle' },
    { id: 7, target: 0.94, title: 'Empowerment', desc: 'Confidence & Protection' }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[750vh] bg-[#07070B] text-slate-100 select-none">
      {/* Sticky Cinematic Stage Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* ======================================================== */}
        {/* 1. LAYER: DYNAMIC BACKGROUND SKY & CITYSCAPE              */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Dynamic Sky Gradient (Dark Night Mauve -> Soft Blush Golden Haven) */}
          <div
            className="absolute inset-0 transition-colors duration-700"
            style={{
              background: `linear-gradient(180deg, 
                ${safeZoneLight > 0.4 ? '#221424' : '#07070B'} 0%, 
                ${safeZoneLight > 0.4 ? '#432034' : '#110D18'} 45%, 
                ${safeZoneLight > 0.4 ? '#68334E' : '#1A1222'} 80%, 
                ${safeZoneLight > 0.4 ? '#381726' : '#0C0912'} 100%)`
            }}
          />

          {/* Twinkling Stars & Nebula Dust */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[15%] w-1 h-1 rounded-full bg-rose-200 animate-pulse" />
            <div className="absolute top-[20%] left-[42%] w-1.5 h-1.5 rounded-full bg-pink-100" />
            <div className="absolute top-[14%] left-[75%] w-1 h-1 rounded-full bg-rose-300 animate-pulse" />
            <div className="absolute top-[28%] left-[85%] w-1 h-1 rounded-full bg-pink-200" />
            <div className="absolute top-[8%] left-[58%] w-1.5 h-1.5 rounded-full bg-white opacity-80" />
          </div>

          {/* Distant City Skyline Silhouettes with Parallax */}
          <svg
            className="absolute bottom-28 left-0 w-[240vw] h-64 text-[#140F1E] transition-transform duration-75"
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
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09060E] via-[#110C18] to-[#1A1325] border-t border-rose-950/40">
            {/* Curb line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-900/30 via-slate-700/40 to-rose-900/30 shadow-md" />
            {/* Street Texture Lines moving with scroll */}
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
            className="absolute bottom-24 left-0 w-[320vw] h-96 flex justify-around pointer-events-none"
            style={{ transform: `translateX(${lampX}px)` }}
          >
            {[0, 1, 2, 3].map((lampIndex) => (
              <div key={lampIndex} className="relative flex flex-col items-center">
                <div className="w-1.5 h-64 bg-gradient-to-b from-slate-600 to-slate-900 rounded-t" />
                <div className="w-8 h-3 rounded-full bg-rose-300 shadow-[0_0_20px_#C08091] -mt-1" />
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

          {/* Safe Haven Glowing Ambient Aura */}
          <div
            className="absolute bottom-20 right-[8%] w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-700"
            style={{
              opacity: safeZoneLight,
              background: 'radial-gradient(circle, rgba(232, 180, 192, 0.35) 0%, rgba(13, 148, 136, 0.18) 50%, transparent 80%)',
              filter: 'blur(35px)'
            }}
          />

          {/* ======================================================== */}
          {/* 2. LAYER: CHARACTERS (FOLLOWER & WOMAN HERO)             */}
          {/* ======================================================== */}
          <div className="absolute bottom-20 left-0 right-0 h-96 flex items-end justify-center pointer-events-none">
            {/* FOLLOWER SHADOW SILHOUETTE */}
            <div
              className="absolute transition-all duration-75"
              style={{
                left: `calc(50% - ${followerDistanceX}px)`,
                bottom: '10px',
                opacity: followerOpacity,
                transform: `scale(${followerScale})`,
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.8))'
              }}
            >
              <svg width="100" height="220" viewBox="0 0 100 220" fill="none">
                <ellipse cx="50" cy="210" rx="35" ry="8" fill="#030206" opacity="0.8" />
                <path d="M35 50 C28 90 20 180 20 205 L80 205 C80 180 72 90 65 50 Z" fill="#0A0710" />
                <path d="M35 50 L50 85 L65 50 Z" fill="#130E1E" />
                <circle cx="50" cy="32" r="18" fill="#0A0710" />
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

            {/* THE MAIN WOMAN CHARACTER */}
            <div
              className="relative transition-transform duration-75"
              style={{
                transform: `translateY(${-bobbing}px)`,
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))'
              }}
            >
              <svg width="220" height="340" viewBox="0 0 220 340" fill="none">
                <defs>
                  <linearGradient id="mainWomanJacket" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8A4F65" />
                    <stop offset="50%" stopColor="#5E3345" />
                    <stop offset="100%" stopColor="#3B1C2A" />
                  </linearGradient>
                  <linearGradient id="mainWomanSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5D0C5" />
                    <stop offset="100%" stopColor="#D99B8B" />
                  </linearGradient>
                  <linearGradient id="mainWomanHair" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E1724" />
                    <stop offset="100%" stopColor="#140810" />
                  </linearGradient>
                  <linearGradient id="mainWomanPants" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1C1420" />
                    <stop offset="100%" stopColor="#0B070D" />
                  </linearGradient>
                  <radialGradient id="mainScreenGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#C08091" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ground Shadow */}
                <ellipse cx="110" cy="326" rx="48" ry="10" fill="#040206" opacity="0.85" />

                {/* Left Leg */}
                <g style={{ transformOrigin: '98px 190px', transform: `rotate(${legAngleLeft}deg)` }}>
                  <path d="M92 190 L92 270 L86 325" stroke="url(#mainWomanPants)" strokeWidth="18" strokeLinecap="round" />
                  <rect x="76" y="318" width="22" height="10" rx="4" fill="#070409" />
                </g>

                {/* Right Leg */}
                <g style={{ transformOrigin: '122px 190px', transform: `rotate(${legAngleRight}deg)` }}>
                  <path d="M128 190 L128 270 L134 325" stroke="url(#mainWomanPants)" strokeWidth="18" strokeLinecap="round" />
                  <rect x="126" y="318" width="22" height="10" rx="4" fill="#070409" />
                </g>

                {/* Torso */}
                <path d="M102 105 L110 145 L118 105 Z" fill="#E8B4C0" />
                <path d="M85 110 C75 140 70 195 72 205 L148 205 C150 195 145 140 135 110 C125 100 95 100 85 110 Z" fill="url(#mainWomanJacket)" />

                {/* Left Arm */}
                <g style={{ transformOrigin: '82px 115px', transform: `rotate(${armAngleLeft}deg)` }}>
                  <path d="M82 115 L74 165 L76 195" stroke="url(#mainWomanJacket)" strokeWidth="16" strokeLinecap="round" />
                  <circle cx="76" cy="202" r="7" fill="url(#mainWomanSkin)" />
                </g>

                {/* Right Arm (Raises phone in hand as she uses Rakshika) */}
                <g style={{ transformOrigin: '138px 115px', transform: `rotate(${armAngleRight}deg)` }}>
                  <path
                    d={p > 0.32 ? "M138 115 L145 150 L126 142" : "M138 115 L146 165 L144 195"}
                    stroke="url(#mainWomanJacket)"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  <circle cx={p > 0.32 ? 122 : 144} cy={p > 0.32 ? 140 : 202} r="7" fill="url(#mainWomanSkin)" />

                  {/* Smartphone in hand */}
                  {p > 0.30 && (
                    <g style={{ opacity: phoneGlowOpacity }}>
                      <rect x="110" y="118" width="22" height="38" rx="4" fill="#0F172A" stroke="#E8B4C0" strokeWidth="1.5" />
                      <rect x="112" y="121" width="18" height="32" rx="2" fill="#14B8A6" />
                      <circle cx="121" cy="132" r="4" fill="white" />
                      <circle cx="121" cy="132" r="2" fill="#E11D48" />
                    </g>
                  )}
                </g>

                {/* Neck & Head */}
                <rect x="103" y="85" width="14" height="22" rx="6" fill="url(#mainWomanSkin)" />
                <g style={{ transformOrigin: '110px 65px', transform: `rotate(${p > 0.18 && p < 0.32 ? -10 : 0}deg)` }}>
                  <ellipse cx="110" cy="62" rx="28" ry="34" fill="url(#mainWomanHair)" />
                  <ellipse cx="110" cy="66" rx="20" ry="24" fill="url(#mainWomanSkin)" />
                  <path d="M88 55 C88 32 102 30 120 32 C138 35 140 55 136 75 C128 50 115 48 98 62 Z" fill="url(#mainWomanHair)" />
                  <path d="M125 65 C132 85 130 115 125 130 C120 115 124 85 122 70 Z" fill="url(#mainWomanHair)" />
                  <ellipse cx="103" cy="66" rx="2.5" ry="3" fill="#1A0D15" />
                  <ellipse cx="117" cy="66" rx="2.5" ry="3" fill="#1A0D15" />
                  <circle cx="104" cy="65" r="0.8" fill="white" />
                  <circle cx="118" cy="65" r="0.8" fill="white" />
                  <circle cx="99" cy="73" r="3.5" fill="#E8B4C0" opacity="0.6" />
                  <circle cx="121" cy="73" r="3.5" fill="#E8B4C0" opacity="0.6" />
                  <path
                    d={p > 0.70 ? "M106 79 Q110 84 114 79" : "M106 80 L114 80"}
                    stroke="#A8526B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* Light glow reflection on face */}
                {p > 0.30 && (
                  <circle cx="116" cy="90" r="35" fill="url(#mainScreenGlow)" pointerEvents="none" opacity={phoneGlowOpacity * 0.7} />
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. LAYER: TOP BRANDING & CHAPTER SCRUBBER BAR             */}
        {/* ======================================================== */}
        <header className="relative z-30 pt-5 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-800 via-rose-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-rose-950/40 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">Rakshika</span>
              <span className="hidden sm:block text-[10px] font-bold tracking-widest text-rose-300/80 uppercase -mt-0.5">
                Protect • Prevent • Empower
              </span>
            </div>
          </Link>

          {/* Current Chapter Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#160E1E]/80 backdrop-blur-xl border border-rose-900/50 text-xs font-semibold text-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>
              {p < 0.14 && '01 • The Commute'}
              {p >= 0.14 && p < 0.28 && '02 • Awareness & Vigilance'}
              {p >= 0.28 && p < 0.44 && '03 • Connected SOS Circle'}
              {p >= 0.44 && p < 0.60 && '04 • Rakshika AI Guidance'}
              {p >= 0.60 && p < 0.74 && '05 • Community Safety Map'}
              {p >= 0.74 && p < 0.88 && '06 • 4-Step Protection Circle'}
              {p >= 0.88 && '07 • Safe, Empowered & Ready'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/login">
              <button className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-100 hover:text-white hover:bg-white/10 transition-colors">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950/50 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </header>

        {/* SIDE CHAPTER NAVIGATION SCRUBBER (Clickable Dots) */}
        <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-auto">
          {chapters.map((ch) => {
            const isActive = Math.abs(p - ch.target) < 0.08;
            return (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.target)}
                className="group flex items-center gap-2.5 text-right focus:outline-none"
              >
                <span
                  className={`text-[11px] font-bold transition-all ${
                    isActive ? 'text-rose-300 opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {ch.title}
                </span>
                <span
                  className={`w-3 h-3 rounded-full transition-all duration-300 border ${
                    isActive
                      ? 'bg-rose-500 border-rose-300 scale-125 shadow-[0_0_10px_#E11D48]'
                      : 'bg-slate-800/80 border-slate-700 group-hover:border-rose-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 4. LAYER: SCROLL-DRIVEN PRODUCT INFO & STORY OVERLAYS    */}
        {/* ======================================================== */}
        <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-4 sm:px-8 max-w-5xl mx-auto w-full pointer-events-none">
          {/* ---------------------------------------------------- */}
          {/* ACT 1 (0.00 - 0.14): THE COMMUTE & THE CORE PROBLEM */}
          {/* ---------------------------------------------------- */}
          {p < 0.14 && (
            <div className="text-center space-y-4 max-w-2xl animate-fade-in pointer-events-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-300 bg-rose-950/80 px-4 py-1.5 rounded-full border border-rose-800/60 shadow-md">
                Smart Safety for Every Journey
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Walking alone at night shouldn't feel like a gamble.
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Every evening, millions of women commute home through poorly lit avenues, quiet alleys, and isolated transit hubs. <strong>Safety shouldn't begin only after something goes wrong.</strong>
              </p>
              <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-rose-300 font-bold animate-bounce">
                <span>Scroll down to experience the journey</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* ACT 2 (0.14 - 0.28): AWARENESS & VIGILANCE           */}
          {/* ---------------------------------------------------- */}
          {p >= 0.14 && p < 0.28 && (
            <div className="text-center space-y-4 max-w-2xl animate-fade-in pointer-events-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-800/60 shadow-md">
                Heightened Vigilance
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Footsteps match your pace fifty paces behind.
              </h2>
              <p className="text-sm sm:text-base text-rose-100 max-w-xl mx-auto leading-relaxed">
                Traditional emergency apps leave you in helpless panic until an attack occurs. Rakshika is built differently — turning instinct into proactive connection, route awareness, and instant support.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-black/50 border border-rose-900/40 text-xs text-rose-300">
                <Shield className="w-3.5 h-3.5 text-rose-400" />
                <span>Proactive prevention before distress</span>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* ACT 3 (0.28 - 0.44): CONNECTED SOS CIRCLE             */}
          {/* ---------------------------------------------------- */}
          {p >= 0.28 && p < 0.44 && (
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fade-in pointer-events-auto">
              <div className="space-y-3 text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800/60">
                  Feature 01 • Emergency Circle
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Instant 3-Sec SOS & Live Coordinate Broadcast
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press and hold for 3 seconds to avoid false alarms. Your exact GPS link, battery status, and ambient updates dispatch immediately to your trusted family and mentors.
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs text-rose-300 font-semibold">
                  <span className="flex items-center gap-1">✓ Radial Progress Ring</span>
                  <span className="flex items-center gap-1">✓ SMS Dispatch</span>
                  <span className="flex items-center gap-1">✓ 112 Police Sync</span>
                </div>
              </div>

              {/* Floating SOS Card Preview */}
              <div className="bg-[#181122]/90 backdrop-blur-2xl border border-rose-400/40 rounded-3xl p-5 shadow-[0_15px_45px_rgba(192,128,145,0.25)] space-y-3">
                <div className="flex items-center justify-between border-b border-rose-900/50 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    SOS Dispatch Active
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/40">
                    Live GPS Streaming
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-rose-950/60 text-xs text-slate-200">
                  <strong>Location:</strong> Sector 12 Main Market (28.5355° N, 77.3910° E)
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Ananya Sharma (Sister)</span>
                    <span className="text-emerald-400 font-bold">Alert Received ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vikram Sharma (Father)</span>
                    <span className="text-emerald-400 font-bold">Alert Received ✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* ACT 4 (0.44 - 0.60): RAKSHIKA AI COMPANION            */}
          {/* ---------------------------------------------------- */}
          {p >= 0.44 && p < 0.60 && (
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fade-in pointer-events-auto">
              <div className="space-y-3 text-left order-2 md:order-1">
                <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800/60">
                  Feature 02 • Rakshika AI
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  24/7 Intelligent Situational Safety Guidance
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Integrated with Google Gemini, Rakshika AI assesses reported hazards along your route, assists with late-night cab checks, and recommends illuminated safe corridors in real time.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-teal-300 font-semibold">
                  <span className="bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-800/40">"What to do if followed?"</span>
                  <span className="bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-800/40">"Nearest open pharmacy"</span>
                </div>
              </div>

              {/* Floating AI Chat Card Preview */}
              <div className="order-1 md:order-2 bg-[#131B24]/90 backdrop-blur-2xl border border-teal-400/40 rounded-3xl p-5 shadow-[0_15px_45px_rgba(45,212,191,0.2)] space-y-3">
                <div className="flex items-center gap-2 border-b border-teal-900/50 pb-2">
                  <div className="w-7 h-7 rounded-xl bg-teal-600 flex items-center justify-center text-white text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Rakshika AI Assistant</h4>
                    <p className="text-[10px] text-teal-300">Live Journey Guidance</p>
                  </div>
                </div>
                <div className="p-3 bg-teal-950/60 rounded-2xl border border-teal-800/40 text-xs text-teal-100 leading-relaxed">
                  "I notice you are transiting near Sector 12 bus stop. Streetlights are unfunctional for the next 100m. <strong>Recommended:</strong> Cross to the right side where 24/7 convenience stores and metro police booth are open."
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* ACT 5 (0.60 - 0.74): COMMUNITY SAFETY MAP             */}
          {/* ---------------------------------------------------- */}
          {p >= 0.60 && p < 0.74 && (
            <div className="w-full max-w-4xl space-y-5 animate-fade-in pointer-events-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8B4C0] bg-rose-950/80 px-3.5 py-1.5 rounded-full border border-rose-800/60">
                  Feature 03 • Community Safety Map & Incident Reporting
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Real-time Street Hazards Identified by Commuters
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                  Women and citizens document defective lighting, harassment spots, and broken CCTV via our 5-step wizard to alert the community and push municipal fixes.
                </p>
              </div>

              {/* Holographic Category Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#1D1424]/90 border border-amber-500/40 shadow-lg text-center space-y-1">
                  <SunMedium className="w-5 h-5 text-amber-400 mx-auto" />
                  <h5 className="text-xs font-bold text-white">Poor Lighting</h5>
                  <p className="text-[10px] text-slate-400">Street lamps non-functional</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1D1424]/90 border border-rose-500/40 shadow-lg text-center space-y-1">
                  <AlertTriangle className="w-5 h-5 text-rose-400 mx-auto" />
                  <h5 className="text-xs font-bold text-white">Harassment</h5>
                  <p className="text-[10px] text-slate-400">Verbal catcalling reported</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1D1424]/90 border border-purple-500/40 shadow-lg text-center space-y-1">
                  <Eye className="w-5 h-5 text-purple-400 mx-auto" />
                  <h5 className="text-xs font-bold text-white">Suspicious Loitering</h5>
                  <p className="text-[10px] text-slate-400">Unidentified groups</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1D1424]/90 border border-teal-500/40 shadow-lg text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto" />
                  <h5 className="text-xs font-bold text-white">Verified Safe Haven</h5>
                  <p className="text-[10px] text-slate-400">24/7 Guarded Outposts</p>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* ACT 6 (0.74 - 0.88): HOW IT WORKS 4-STEP FLOW        */}
          {/* ---------------------------------------------------- */}
          {p >= 0.74 && p < 0.88 && (
            <div className="w-full max-w-4xl space-y-6 animate-fade-in pointer-events-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-300 bg-rose-950/80 px-3.5 py-1.5 rounded-full border border-rose-800/60">
                  Visual Architecture
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  How Rakshika Protects in 4 Steps
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                  A seamless cycle from personal preparedness to community-wide empowerment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { num: '01', title: 'Create Safety Circle', desc: 'Add trusted emergency contacts with instant test SMS readiness.' },
                  { num: '02', title: 'Explore Surroundings', desc: 'Inspect live Community Safety Score (0-100) and neighborhood pins.' },
                  { num: '03', title: 'Report Hazards', desc: 'Log infrastructure defects with AI classification & photo proof.' },
                  { num: '04', title: 'Stay Protected', desc: '24/7 AI companion and single-touch 3-sec SOS backup.' }
                ].map((st) => (
                  <div key={st.num} className="p-4 rounded-2xl bg-[#20152B]/85 border border-rose-800/40 backdrop-blur-xl shadow-lg space-y-2">
                    <span className="text-2xl font-black text-rose-300/80">{st.num}</span>
                    <h4 className="text-sm font-bold text-white">{st.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* ACT 7 (0.88 - 1.00): GRAND EMPOWERMENT & FINAL CTAS  */}
          {/* ---------------------------------------------------- */}
          {p >= 0.88 && (
            <div className="w-full max-w-4xl text-center space-y-6 animate-fade-in pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-700/60 text-xs font-black text-rose-200 shadow-xl">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Rakshika • Empowering Every Journey</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                Protect. Prevent.{' '}
                <span className="bg-gradient-to-r from-rose-300 via-pink-200 to-teal-300 bg-clip-text text-transparent">
                  Empower.
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
                You are never alone. Join thousands of women using intelligent AI companionship, community reporting, and real-time emergency preparedness.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 shadow-2xl shadow-rose-950/80 text-white font-extrabold"
                    icon={ArrowRight}
                  >
                    Create Free Account
                  </Button>
                </Link>

                <Link to="/map" className="w-full sm:w-auto">
                  <Button
                    variant="glass"
                    size="lg"
                    className="w-full justify-center text-white bg-white/10 hover:bg-white/20 border-white/25 backdrop-blur-xl"
                    icon={Navigation}
                  >
                    Open Live Safety Map
                  </Button>
                </Link>

                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-center text-rose-100 hover:text-white border-rose-700/50 hover:bg-rose-950/40"
                  >
                    View App Dashboard
                  </Button>
                </Link>
              </div>

              {/* Emergency Helplines & Trust Disclaimers */}
              <div className="pt-6 border-t border-rose-900/40 flex flex-wrap items-center justify-center gap-6 text-xs text-rose-200/80">
                <a href="tel:112" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  <span>National Emergency: <strong>112</strong></span>
                </a>
                <a href="tel:1091" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <PhoneCall className="w-3.5 h-3.5 text-pink-400" />
                  <span>Women Helpline: <strong>1091</strong></span>
                </a>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PWA Installable • 100% Free & Open Community</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 5. LAYER: BOTTOM CONTINUOUS SCROLL TIMELINE TRACK        */}
        {/* ======================================================== */}
        <div className="relative z-30 pb-6 px-4 max-w-md mx-auto w-full text-center">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1.5 px-1">
            <span>START COMMUTE</span>
            <span className="text-rose-400 font-extrabold">{Math.round(p * 100)}% COMPLETE</span>
            <span>EMPOWERED</span>
          </div>
          <div className="w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-rose-600 via-pink-400 to-teal-400 h-full rounded-full transition-all duration-75"
              style={{ width: `${p * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
