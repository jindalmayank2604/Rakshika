import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  Users,
  Bot,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Navigation,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SOSButton } from '../components/safety/SOSButton';
import { SafetyScoreCard } from '../components/safety/SafetyScoreCard';
import { SafetyTipsCarousel } from '../components/safety/SafetyTipsCarousel';
import { ReportCard } from '../components/reports/ReportCard';
import { IncidentDetailModal } from '../components/maps/IncidentDetailModal';
import { useAuth } from '../context/AuthContext';
import { useSafety } from '../context/SafetyContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { reports, contacts, currentLocation, safetyScore } = useSafety();
  const [selectedReport, setSelectedReport] = useState(null);

  const greetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const primaryContact = contacts.find(c => c.is_primary) || contacts[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header Greeting & Status Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Safety Companion Online
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {greetingTime()}, {user?.name ? user.name.split(' ')[0] : 'Priya'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your safety circle is active and monitoring near <strong className="text-slate-700">{currentLocation.address}</strong>.
          </p>
        </div>

        {/* Quick Helpline Pills */}
        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Dial 112 (Police)</span>
          </a>
          <a
            href="tel:1091"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1091 (Women Line)</span>
          </a>
        </div>
      </div>

      {/* 2. Main Grid: SOS Trigger & Community Safety Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOS Panel */}
        <div className="lg:col-span-6 flex flex-col">
          <GlassCard className="p-6 flex-1 flex flex-col justify-between items-center text-center relative overflow-hidden bg-gradient-to-b from-white/90 via-rose-50/20 to-white/90 border-rose-100/80 shadow-glass">
            <div className="w-full flex items-center justify-between pb-2 border-b border-rose-100/60">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                Emergency Trigger
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Primary: {primaryContact ? primaryContact.name : 'Configured'}
              </span>
            </div>

            {/* Interactive SOS Button */}
            <div className="py-2">
              <SOSButton />
            </div>

            <div className="w-full pt-3 border-t border-rose-100/60 flex items-center justify-between text-xs text-slate-500">
              <span>Haptic Feedback Ready</span>
              <span>Coordinates: {currentLocation.lat.toFixed(3)}, {currentLocation.lng.toFixed(3)}</span>
            </div>
          </GlassCard>
        </div>

        {/* Safety Score & Tips Panel */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <SafetyScoreCard />
          <SafetyTipsCarousel />
        </div>
      </div>

      {/* 3. Quick Action Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/map">
          <GlassCard hoverEffect className="p-4 text-center space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 group-hover:bg-primary-600 text-primary-600 group-hover:text-white mx-auto flex items-center justify-center transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Safety Map</h4>
            <p className="text-[10px] text-slate-500">Explore street pins</p>
          </GlassCard>
        </Link>

        <Link to="/report">
          <GlassCard hoverEffect className="p-4 text-center space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 group-hover:bg-amber-600 text-amber-600 group-hover:text-white mx-auto flex items-center justify-center transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Report Concern</h4>
            <p className="text-[10px] text-slate-500">Log lighting/harassment</p>
          </GlassCard>
        </Link>

        <Link to="/ai-assistant">
          <GlassCard hoverEffect className="p-4 text-center space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 group-hover:bg-teal-600 text-teal-600 group-hover:text-white mx-auto flex items-center justify-center transition-colors">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Rakshika AI</h4>
            <p className="text-[10px] text-slate-500">Late-night trip prep</p>
          </GlassCard>
        </Link>

        <Link to="/contacts">
          <GlassCard hoverEffect className="p-4 text-center space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 group-hover:bg-purple-600 text-purple-600 group-hover:text-white mx-auto flex items-center justify-center transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Emergency Circle</h4>
            <p className="text-[10px] text-slate-500">{contacts.length} Active Contacts</p>
          </GlassCard>
        </Link>
      </div>

      {/* 4. Recent Nearby Community Reports */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Recent Community Reports</h3>
            <p className="text-xs text-slate-500">Observations logged in your sector</p>
          </div>
          <Link to="/map" className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1">
            <span>View all on map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.slice(0, 4).map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onClick={() => setSelectedReport(report)}
            />
          ))}
        </div>
      </div>

      {/* Incident Detail Modal */}
      {selectedReport && (
        <IncidentDetailModal
          report={selectedReport}
          isOpen={Boolean(selectedReport)}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};
