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
    <GlassCard className="p-5 bg-gradient-to-br from-powder-petal/50 via-linen/80 to-parchment/60 dark:from-wine-plum/60 dark:to-smoky-rose/20 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent/20 text-wine-plum dark:text-bone">
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-bone">
            WeSafe Safety Advisory • {current.category}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={prevTip}
            className="p-1 rounded-lg hover:bg-powder-petal/50 text-dust-grey-dark dark:text-silver hover:text-wine-plum dark:hover:text-bone transition-colors"
            aria-label="Previous safety tip"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-bold text-dust-grey-dark dark:text-silver px-1">
            {currentIndex + 1}/{SAFETY_TIPS.length}
          </span>
          <button
            onClick={nextTip}
            className="p-1 rounded-lg hover:bg-powder-petal/50 text-dust-grey-dark dark:text-silver hover:text-wine-plum dark:hover:text-bone transition-colors"
            aria-label="Next safety tip"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h4 className="text-sm font-bold text-wine-plum dark:text-bone mb-1">{current.title}</h4>
      <p className="text-xs text-wine-plum/80 dark:text-bone/80 leading-relaxed">{current.tip}</p>
    </GlassCard>
  );
};
