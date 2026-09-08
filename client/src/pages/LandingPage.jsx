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
  Heart
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Hero3DIllustration } from '../assets/illustrations/3DIllustrations';
import { SafetyMap } from '../components/maps/SafetyMap';
import { useSafety } from '../context/SafetyContext';

export const LandingPage = () => {
  const { reports } = useSafety();

  const features = [
    {
      title: 'Instant 3-Sec SOS',
      description: 'Press-and-hold radial emergency trigger that broadcasts live GPS coordinates to your safety circle.',
      icon: ShieldCheck,
      color: 'bg-rose-500'
    },
    {
      title: 'Community Safety Map',
      description: 'Explore verified neighborhood hazards, poorly lit stretches, and street safety insights before stepping out.',
      icon: MapPin,
      color: 'bg-indigo-600'
    },
    {
      title: 'Proactive Incident Reporting',
      description: '5-step reporting with AI classification and photo evidence to help municipal cells fix dangerous blindspots.',
      icon: AlertTriangle,
      color: 'bg-amber-500'
    },
    {
      title: 'Rakshika AI Assistant',
      description: '24/7 empathetic guidance for late-night transit prep, assessing report legitimacy, and feeling protected.',
      icon: Bot,
      color: 'bg-teal-600'
    },
    {
      title: 'Trusted Safety Circle',
      description: 'Maintain primary emergency contacts with instant test dispatch and verification status.',
      icon: Users,
      color: 'bg-purple-600'
    },
    {
      title: 'Safety Index Analytics',
      description: 'Dynamic area safety score aggregated from verified community reports and street observations.',
      icon: Activity,
      color: 'bg-emerald-600'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Safety Circle',
      description: 'Add family and trusted mentors to receive real-time notifications in critical situations.'
    },
    {
      number: '02',
      title: 'Explore Your Surroundings',
      description: 'Check active safety scores, street lighting coverage, and verified reports along your route.'
    },
    {
      number: '03',
      title: 'Report Unsafe Situations',
      description: 'Document defective lighting, harassment spots, or isolated paths to safeguard other women.'
    },
    {
      number: '04',
      title: 'Stay Informed & Protected',
      description: 'Navigate with confidence backed by 24/7 AI-guided support and one-touch emergency triggers.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 flex flex-col">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="home" className="pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-xs font-bold text-primary-700">
              <Sparkles className="w-3.5 h-3.5 text-primary-600" />
              <span>Smart Safety for Every Journey</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Protect. Prevent.{' '}
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-teal-500 bg-clip-text text-transparent">
                Empower.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Rakshika helps you stay aware, report unsafe situations, connect with trusted people, and make safer decisions wherever you go.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full justify-center" icon={ArrowRight}>
                  Get Started Free
                </Button>
              </Link>
              <a href="#map-preview" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full justify-center" icon={Navigation}>
                  Explore Safety Map
                </Button>
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Verified Community Reports
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                24/7 AI Safety Companion
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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
      <section className="py-16 bg-white/70 backdrop-blur-md border-y border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary-600">
            Why Rakshika Exists
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
            Safety shouldn't begin after something goes wrong.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Traditional panic applications only trigger during distress. Rakshika changes the paradigm by focusing on **proactive awareness, street-level visibility, community reporting, and AI-guided journey preparation** so you travel with continuous confidence.
          </p>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary-600">
            4-Step Visual Flow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">How Rakshika Works</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Simple, comforting, and designed to support you at every stage of your movement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <GlassCard key={step.number} hoverEffect className="p-6 relative">
              <div className="text-3xl font-black text-primary-200 mb-3">{step.number}</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="py-20 bg-slate-50/60 border-y border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary-600">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Built for Real Protection</h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Every tool crafted with empathy, cutting-edge AI, and modern web engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <GlassCard key={f.title} hoverEffect className="p-6 space-y-3">
                  <div className={`w-12 h-12 rounded-2xl ${f.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
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
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary-600">
              Interactive Surroundings
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
              Live Community Safety Map
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Real-time visualization of lighting defects, suspicious loitering, broken surveillance, and verified safe routes.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link to="/report">
              <Button variant="primary" icon={AlertTriangle}>
                Report an Incident
              </Button>
            </Link>
          </div>
        </div>

        <SafetyMap reports={reports} height="h-[480px]" />
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
        <GlassCard className="p-8 sm:p-12 text-center bg-gradient-to-r from-primary-900 via-indigo-900 to-slate-900 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Take Confidence with You Everywhere
            </h2>
            <p className="text-sm sm:text-base text-indigo-200 leading-relaxed">
              Join thousands of commuters building a safer, more transparent, and empowered community.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full bg-white text-primary-900 hover:bg-slate-100 shadow-xl">
                  Create Your Account
                </Button>
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full text-white hover:bg-white/10">
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
