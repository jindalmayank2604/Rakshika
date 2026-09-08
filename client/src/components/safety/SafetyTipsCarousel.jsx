import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SAFETY_TIPS } from '../../data/mockData';

export const SafetyTipsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTip = () => {
    setCurrentIndex((prev) => (prev + 1) % SAFETY_TIPS.length);
  };

  const prevTip = () => {
    setCurrentIndex((prev) => (prev - 1 + SAFETY_TIPS.length) % SAFETY_TIPS.length);
  };

  const current = SAFETY_TIPS[currentIndex];

  return (
    <GlassCard className="p-5 bg-gradient-to-br from-indigo-50/70 via-white/80 to-teal-50/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-100 text-primary-700">
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
            Smart Safety Tip • {current.category}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={prevTip}
            className="p-1 rounded-lg hover:bg-white text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Previous safety tip"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-bold text-slate-400 px-1">
            {currentIndex + 1}/{SAFETY_TIPS.length}
          </span>
          <button
            onClick={nextTip}
            className="p-1 rounded-lg hover:bg-white text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Next safety tip"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h4 className="text-sm font-bold text-slate-900 mb-1">{current.title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed">{current.tip}</p>
    </GlassCard>
  );
};
