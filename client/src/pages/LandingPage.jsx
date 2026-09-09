import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  Users,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Navigation,
  Activity,
  Compass,
  Lightbulb
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Hero3DIllustration } from '../assets/illustrations/3DIllustrations';
import { SafetyMap } from '../components/maps/SafetyMap';
import { useSafety } from '../context/SafetyContext';
import { Shield3D, SafeRoute3D, AiCompanion3D, CommunityReport3D } from '../components/ui/Illustrations3D';

export const LandingPage = () => {
  const { reports } = useSafety();

  const features = [
    {
      title: 'AI Safer Route Recommendations',
      description: 'Calculates high-visibility corridors avoiding dark alleyways, unverified hazard clusters, and maximizing verified police/CCTV presence.',
      icon: Navigation,
      color: 'bg-wine-plum'
    },
    {
      title: 'Interactive Community Safety Map',
      description: 'Mapbox-powered real-time visualization of defective streetlights, secluded paths, harassment reports, and 24/7 safe havens.',
      icon: MapPin,
      color: 'bg-accent'
    },
    {
      title: 'WeSafe Gemini AI Assistant',
      description: '24/7 proactive companion providing pre-trip risk evaluation, cab safety checklists, and situational de-escalation tips.',
      icon: Bot,
      color: 'bg-wine-plum'
    },
    {
      title: 'Press-and-Hold 3-Sec SOS',
      description: 'Controlled radial countdown panic trigger that broadcasts live GPS coordinates and automated SMS to your emergency circle.',
      icon: ShieldCheck,
      color: 'bg-emergency'
    },
    {
      title: 'Community Incident Reporting',
      description: '5-step report wizard with Cloudinary media evidence and AI severity classification to safeguard fellow commuters.',
      icon: AlertTriangle,
      color: 'bg-accent'
    },
    {
      title: 'Proactive Safety Index',
      description: 'Dynamic area safety score calculated from verified reports, street lighting uptime, and municipal infrastructure status.',
      icon: Activity,
      color: 'bg-emerald-700'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Set Up Your Safety Circle',
      description: 'Add trusted emergency contacts who receive your live coordinates and journey alerts.'
    },
    {
      number: '02',
      title: 'Check Route Safety Index',
      description: 'Compare fastest vs safest paths based on street illumination, verified hazards, and safe haven checkpoints.'
    },
    {
      number: '03',
      title: 'Report Street Hazards',
      description: 'Log broken lighting, harassment incidents, or blind spots to protect your local community.'
    },
    {
      number: '04',
      title: 'Travel With AI Confidence',
      description: 'Get real-time situational guidance from WeSafe Gemini AI and instant 1-touch SOS protection.'
    }
  ];

  return (
    <div className="min-h-screen bg-linen dark:bg-[#3a1322] text-wine-plum dark:text-bone flex flex-col transition-colors duration-300">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="home" className="pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-powder-petal/80 dark:bg-wine-plum/80 border border-dust-grey/60 dark:border-smoky-rose/30 text-xs font-bold text-wine-plum dark:text-bone">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>AI-Powered Community Safety Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-wine-plum dark:text-bone">
              Protect. Prevent.{' '}
              <span className="bg-gradient-to-r from-wine-plum via-smoky-rose to-accent bg-clip-text text-transparent">
                Empower.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-dust-grey-dark dark:text-silver max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              WeSafe combines community safety reports, location intelligence, and Gemini AI to provide proactive safety insights and help you make safer journey decisions before, during, and after your trip.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full justify-center shadow-warm-md" icon={ArrowRight}>
                  Get Started Free
                </Button>
              </Link>
              <Link to="/map" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full justify-center border-dust-grey/70 dark:border-smoky-rose/30" icon={Navigation}>
                  Explore Safer Routes
                </Button>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-dust-grey/40 dark:border-smoky-rose/20 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-dust-grey-dark dark:text-silver font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Community Verified Reports
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Gemini 2.0 AI Safety Companion
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Installable Web App (PWA)
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="w-full max-w-md">
              <Hero3DIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / VALUE SECTION */}
      <section className="py-16 glass-card-subtle border-y border-dust-grey/50 dark:border-smoky-rose/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-accent dark:text-almond-dark">
            The WeSafe Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone leading-snug">
            Safety shouldn't begin after an emergency occurs.
          </h2>
          <p className="text-sm sm:text-base text-dust-grey-dark dark:text-silver leading-relaxed">
            Instead of only reacting to crises, WeSafe shifts the paradigm by combining crowdsourced community hazard data with location intelligence and AI to provide **proactive safety insights and safer route recommendations**.
          </p>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-accent dark:text-almond-dark">
            4-Step Journey Protection
          </span>
          <h2 className="text-3xl font-extrabold text-wine-plum dark:text-bone">How WeSafe Works</h2>
          <p className="text-sm text-dust-grey-dark dark:text-silver max-w-lg mx-auto">
            Intuitive, calm, and designed to support you at every stage of your movement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <GlassCard key={step.number} hoverEffect className="p-6 relative border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
              <div className="text-3xl font-black text-accent/40 dark:text-almond-dark/40 mb-3">{step.number}</div>
              <h3 className="text-base font-bold text-wine-plum dark:text-bone mb-2">{step.title}</h3>
              <p className="text-xs text-dust-grey-dark dark:text-silver leading-relaxed">{step.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="py-20 bg-parchment/60 dark:bg-wine-plum/40 border-y border-dust-grey/60 dark:border-smoky-rose/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-accent dark:text-almond-dark">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-wine-plum dark:text-bone">Built for Real Proactive Protection</h2>
            <p className="text-sm text-dust-grey-dark dark:text-silver max-w-lg mx-auto">
              Every tool engineered with empathy, location intelligence, and responsible Gemini AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <GlassCard key={f.title} hoverEffect className="p-6 space-y-3 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
                  <div className={`w-12 h-12 rounded-2xl ${f.color} text-bone flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-wine-plum dark:text-bone">{f.title}</h3>
                  <p className="text-xs text-dust-grey-dark dark:text-silver leading-relaxed">{f.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LIVE COMMUNITY MAP PREVIEW */}
      <section id="map-preview" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-accent dark:text-almond-dark">
              Mapbox Location Intelligence
            </span>
            <h2 className="text-3xl font-extrabold text-wine-plum dark:text-bone mt-1">
              Live Community Safety Map & Safer Routes
            </h2>
            <p className="text-sm text-dust-grey-dark dark:text-silver mt-2 max-w-xl">
              Real-time visualization of lighting defects, suspicious loitering, broken surveillance, and verified safe havens.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link to="/map">
              <Button variant="primary" icon={Navigation}>
                Open Route Planner
              </Button>
            </Link>
          </div>
        </div>

        <SafetyMap incidents={reports} height="h-[480px]" />
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
        <GlassCard className="p-8 sm:p-12 text-center bg-gradient-to-r from-wine-plum via-[#5c293c] to-wine-plum text-bone shadow-warm-lg relative overflow-hidden border border-smoky-rose/40">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-bone">
              Take Confidence with You Everywhere
            </h2>
            <p className="text-sm sm:text-base text-silver leading-relaxed">
              Join commuters building a proactive, transparent, and empowered community safety network.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full bg-bone text-wine-plum hover:bg-linen shadow-xl font-extrabold">
                  Create Your Account
                </Button>
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full text-bone hover:bg-white/10">
                  Open Web App
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>

      <Footer />
    </div>
  );
};
