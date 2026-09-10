import React from 'react';
import { RakshikaAIChat } from '../components/ai/RakshikaAIChat';
import { GlassCard } from '../components/ui/GlassCard';
import { Bot, Sparkles, Shield, Compass, PhoneCall, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import { AiCompanion3D } from '../components/ui/Illustrations3D';

export const AIAssistantPage = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AiCompanion3D className="w-14 h-14" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
                Proactive Location & Safety AI
              </span>
              <span className="text-[10px] bg-powder-petal/70 dark:bg-smoky-rose/30 text-wine-plum dark:text-bone font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-dust-grey/50">
                <Sparkles className="w-3 h-3 text-accent" />
                Gemini 2.0 Integrated
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
              WeSafe AI Safety Assistant
            </h2>
            <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
              Get proactive route risk evaluations, cab safety checklists, and situational guidance 24/7.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emergency/15 text-emergency text-xs font-bold border border-emergency/30 hover:bg-emergency/25 transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency 112</span>
          </a>
        </div>
      </div>

      {/* Main Chat Frame */}
      <GlassCard className="p-4 sm:p-6 h-[640px] flex flex-col border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-md">
        <RakshikaAIChat className="h-full" />
      </GlassCard>
    </div>
  );
};
