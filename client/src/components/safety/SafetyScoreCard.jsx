import React from 'react';
import { ShieldCheck, Info, Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useSafety } from '../../context/SafetyContext';

export const SafetyScoreCard = () => {
  const { safetyScore, reports } = useSafety();

  const getScoreStatus = (score) => {
    if (score >= 80) return { label: 'Optimal Awareness', color: 'text-emerald-600', bg: 'bg-emerald-500', note: 'Few recent critical concerns reported in this sector.' };
    if (score >= 65) return { label: 'Moderate Caution', color: 'text-amber-600', bg: 'bg-amber-500', note: 'Some infrastructure or lighting reports active nearby.' };
    return { label: 'Heightened Awareness', color: 'text-rose-600', bg: 'bg-rose-500', note: 'Multiple unverified or active incident reports logged recently.' };
  };

  const status = getScoreStatus(safetyScore);
  const verifiedCount = reports.filter(r => r.status === 'Verified' || r.status === 'Resolved').length;

  return (
    <GlassCard className="p-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">Community Safety Insight</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-bold">Live Sector</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Current Area Awareness</h3>
        </div>

        {/* Big Score Dial */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-3xl font-black text-slate-900 leading-none">{safetyScore}<span className="text-lg font-bold text-slate-400">/100</span></div>
            <div className={`text-xs font-bold ${status.color} mt-0.5`}>{status.label}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${status.bg}`}
          style={{ width: `${safetyScore}%` }}
        />
      </div>

      {/* Metric Pillars */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
        <div className="p-2.5 rounded-xl bg-slate-50/70">
          <div className="text-base font-extrabold text-slate-900">{verifiedCount}</div>
          <div className="text-[10px] text-slate-500 font-medium">Verified Solved</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50/70">
          <div className="text-base font-extrabold text-slate-900">{reports.length}</div>
          <div className="text-[10px] text-slate-500 font-medium">Community Logs</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50/70">
          <div className="text-base font-extrabold text-emerald-600">92%</div>
          <div className="text-[10px] text-slate-500 font-medium">Response Rate</div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-4 text-[11px] text-slate-400 leading-snug">
        <Info className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
        <span>Insight computed dynamically from verified community reports & municipal feeds.</span>
      </div>
    </GlassCard>
  );
};
