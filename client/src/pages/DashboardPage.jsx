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
  Clock,
  Compass
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { SOSButton } from '../components/safety/SOSButton';
import { SafetyScoreCard } from '../components/safety/SafetyScoreCard';
import { SafetyTipsCarousel } from '../components/safety/SafetyTipsCarousel';
import { ReportCard } from '../components/reports/ReportCard';
import { IncidentDetailModal } from '../components/maps/IncidentDetailModal';
import { useAuth } from '../context/AuthContext';
import { useSafety } from '../context/SafetyContext';
import { Shield3D, SafeRoute3D, AiCompanion3D } from '../components/ui/Illustrations3D';

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
            <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
              WeSafe Live Protection
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
            {greetingTime()}, {user?.name ? user.name.split(' ')[0] : 'Priya'}
          </h2>
          <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
            Your safety circle is active and monitoring near <strong className="text-wine-plum dark:text-bone">{currentLocation?.address || 'Current Community Zone'}</strong>.
          </p>
        </div>

        {/* Quick Helpline Pills */}
        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emergency/15 hover:bg-emergency/25 text-emergency border border-emergency/30 text-xs font-bold transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Dial 112 (National Emergency)</span>
          </a>
          <a
            href="tel:1091"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-powder-petal/80 hover:bg-powder-petal text-wine-plum dark:text-bone dark:bg-wine-plum/80 border border-dust-grey/60 dark:border-smoky-rose/30 text-xs font-bold transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-accent" />
            <span>1091 (Women Line)</span>
          </a>
        </div>
      </div>

      {/* 2. Main Grid: SOS Trigger & Community Safety Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOS Panel */}
        <div className="lg:col-span-6 flex flex-col">
          <GlassCard className="p-6 flex-1 flex flex-col justify-between items-center text-center relative overflow-hidden bg-gradient-to-b from-linen via-parchment/60 to-linen dark:from-wine-plum/80 dark:to-[#3a1322] border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-md">
            <div className="w-full flex items-center justify-between pb-2 border-b border-dust-grey/40 dark:border-smoky-rose/20">
              <span className="text-xs font-bold text-emergency uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emergency animate-ping" />
                Emergency Trigger
              </span>
              <span className="text-[11px] text-dust-grey-dark dark:text-silver font-medium">
                Primary: {primaryContact ? primaryContact.name : 'Active'}
              </span>
            </div>

            {/* Interactive SOS Button */}
            <div className="py-2">
              <SOSButton />
            </div>

            <div className="w-full pt-3 border-t border-dust-grey/40 dark:border-smoky-rose/20 flex items-center justify-between text-xs text-dust-grey-dark dark:text-silver">
              <span>Haptic Feedback Ready</span>
              <span>GPS: {currentLocation?.lat?.toFixed(3) || '28.535'}, {currentLocation?.lng?.toFixed(3) || '77.391'}</span>
            </div>
          </GlassCard>
        </div>

        {/* Safety Score & Tips Panel */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <SafetyScoreCard />
          <SafetyTipsCarousel />
        </div>
      </div>

      {/* 3. Proactive Safe Route Callout Banner */}
      <div className="rounded-3xl p-6 glass-card border border-dust-grey/70 dark:border-smoky-rose/40 shadow-warm-md flex flex-col sm:flex-row items-center justify-between gap-5 bg-gradient-to-r from-linen via-powder-petal/30 to-parchment dark:from-wine-plum/90 dark:to-smoky-rose/40">
        <div className="flex items-center gap-4">
          <SafeRoute3D className="w-16 h-16 flex-shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent dark:text-almond-dark">
                Proactive Journey Intelligence
              </span>
              <span className="text-[10px] bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum font-extrabold px-2 py-0.5 rounded-full">
                AI Powered
              </span>
            </div>
            <h3 className="text-lg font-bold text-wine-plum dark:text-bone mt-0.5">
              Plan Ahead: Compare Fastest vs. Safest Corridors
            </h3>
            <p className="text-xs text-dust-grey-dark dark:text-silver max-w-xl mt-1">
              WeSafe evaluates street lighting density, verified police posts, and recent community hazard reports to recommend routes with optimal illumination and emergency assistance.
            </p>
          </div>
        </div>
        <Link to="/map" className="flex-shrink-0">
          <Button variant="primary" icon={Navigation} size="md">
            Open Route Planner
          </Button>
        </Link>
      </div>

      {/* 4. Quick Action Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/map">
          <GlassCard hoverEffect className="p-4 text-center space-y-2 group border border-dust-grey/60 dark:border-smoky-rose/30">
            <div className="w-10 h-10 rounded-2xl bg-powder-petal dark:bg-wine-plum group-hover:bg-wine-plum group-hover:text-bone text-wine-plum dark:text-bone mx-auto flex items-center justify-center transition-colors shadow-xs">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <h4 className="text-xs font-bold text-wine-plum dark:text-bone">Safety Map & Routes</h4>
            <p className="text-[10px] text-dust-grey-dark dark:text-silver">Explore street pins & corridors</p>
          </GlassCard>
        </Link>

        <Link to="/report">
          <GlassCard hoverEffect className="p-4 text-center space-y-2 group border border-dust-grey/60 dark:border-smoky-rose/30">
            <div className="w-10 h-10 rounded-2xl bg-powder-petal dark:bg-wine-plum group-hover:bg-wine-plum group-hover:text-bone text-wine-plum dark:text-bone mx-auto flex items-center justify-center transition-colors shadow-xs">
              <AlertTriangle className="w-5 h-5 text-accent" />
            </div>
            <h4 className="text-xs font-bold text-wine-plum dark:text-bone">Report Hazard</h4>
            <p className="text-[10px] text-dust-grey-dark dark:text-silver">Log lighting or unsafe spots</p>
          </GlassCard>
        </Link>

        <Link to="/ai-assistant">
          <GlassCard hoverEffect className="p-4 text-center space-y-2 group border border-dust-grey/60 dark:border-smoky-rose/30">
            <div className="w-10 h-10 rounded-2xl bg-powder-petal dark:bg-wine-plum group-hover:bg-wine-plum group-hover:text-bone text-wine-plum dark:text-bone mx-auto flex items-center justify-center transition-colors shadow-xs">
              <Bot className="w-5 h-5 text-accent" />
            </div>
            <h4 className="text-xs font-bold text-wine-plum dark:text-bone">WeSafe AI Assistant</h4>
            <p className="text-[10px] text-dust-grey-dark dark:text-silver">Pre-trip checklist & tips</p>
          </GlassCard>
        </Link>

        <Link to="/contacts">
          <GlassCard hoverEffect className="p-4 text-center space-y-2 group border border-dust-grey/60 dark:border-smoky-rose/30">
            <div className="w-10 h-10 rounded-2xl bg-powder-petal dark:bg-wine-plum group-hover:bg-wine-plum group-hover:text-bone text-wine-plum dark:text-bone mx-auto flex items-center justify-center transition-colors shadow-xs">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <h4 className="text-xs font-bold text-wine-plum dark:text-bone">Emergency Circle</h4>
            <p className="text-[10px] text-dust-grey-dark dark:text-silver">{contacts.length} Active Contacts</p>
          </GlassCard>
        </Link>
      </div>

      {/* 5. Recent Nearby Community Reports */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-wine-plum dark:text-bone">Recent Community Reports</h3>
            <p className="text-xs text-dust-grey-dark dark:text-silver">Observations logged in your sector</p>
          </div>
          <Link to="/map" className="text-xs font-bold text-accent dark:text-almond-dark hover:underline flex items-center gap-1">
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
