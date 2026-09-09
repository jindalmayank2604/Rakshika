import React from 'react';
import { ShieldCheck, Info, Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useSafety } from '../../context/SafetyContext';
import { Shield3D } from '../ui/Illustrations3D';

export const SafetyScoreCard = () => {
  const { safetyScore, reports } = useSafety();

  const getScoreStatus = (score) => {
    if (score >= 80) return { label: 'Optimal Safe Zone', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-600', note: 'Few recent critical concerns reported in this sector.' };
    if (score >= 65) return { label: 'Moderate Caution', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-600', note: 'Some infrastructure or lighting reports active nearby.' };
    return { label: 'Heightened Awareness', color: 'text-rose-700 dark:text-rose-400', bg: 'bg-rose-600', note: 'Multiple unverified or active incident reports logged recently.' };
  };

  const status = getScoreStatus(safetyScore);
  const verifiedCount = reports.filter(r => r.status === 'Verified' || r.status === 'Resolved').length;

  return (
    <GlassCard className="p-6 relative overflow-hidden border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">Community Safety Insight</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-powder-petal/70 dark:bg-smoky-rose/30 text-wine-plum dark:text-bone font-bold border border-dust-grey/50">Live Sector</span>
          </div>
          <h3 className="text-lg font-extrabold text-wine-plum dark:text-bone">Current Area Awareness</h3>
        </div>

        {/* Big Score Dial with 3D Shield */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-3xl font-black text-wine-plum dark:text-bone leading-none">{safetyScore}<span className="text-lg font-bold text-dust-grey-dark dark:text-silver">/100</span></div>
            <div className={`text-xs font-bold ${status.color} mt-0.5`}>{status.label}</div>
          </div>
          <Shield3D className="w-12 h-12" glow={false} />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-dust-grey/40 dark:bg-wine-plum/60 rounded-full h-2.5 overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${status.bg}`}
          style={{ width: `${safetyScore}%` }}
        />
      </div>

      {/* Metric Pillars */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-dust-grey/40 dark:border-smoky-rose/20 text-center">
        <div className="p-2.5 rounded-xl bg-parchment/60 dark:bg-wine-plum/40 border border-dust-grey/40 dark:border-smoky-rose/20">
          <div className="text-base font-extrabold text-wine-plum dark:text-bone">{verifiedCount}</div>
          <div className="text-[10px] text-dust-grey-dark dark:text-silver font-medium">Verified Solved</div>
        </div>
        <div className="p-2.5 rounded-xl bg-parchment/60 dark:bg-wine-plum/40 border border-dust-grey/40 dark:border-smoky-rose/20">
          <div className="text-base font-extrabold text-wine-plum dark:text-bone">{reports.length}</div>
          <div className="text-[10px] text-dust-grey-dark dark:text-silver font-medium">Community Logs</div>
        </div>
        <div className="p-2.5 rounded-xl bg-parchment/60 dark:bg-wine-plum/40 border border-dust-grey/40 dark:border-smoky-rose/20">
          <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">94%</div>
          <div className="text-[10px] text-dust-grey-dark dark:text-silver font-medium">Lighting Index</div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-4 text-[11px] text-dust-grey-dark dark:text-silver leading-snug">
        <Info className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
        <span>Insight computed dynamically from verified community reports & municipal lighting feeds.</span>
      </div>
    </GlassCard>
  );
};
