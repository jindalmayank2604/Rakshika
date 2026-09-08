import React from 'react';
import { RakshikaAIChat } from '../components/ai/RakshikaAIChat';
import { GlassCard } from '../components/ui/GlassCard';
import { Bot, Sparkles, Shield, Compass, PhoneCall } from 'lucide-react';

export const AIAssistantPage = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              AI-Powered Safety Companion
            </span>
            <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Gemini Integrated
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Rakshika AI Assistant
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Get situational safety checklists, travel guidance, and incident explanations anytime.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency 112</span>
          </a>
        </div>
      </div>

      {/* Main Chat Frame */}
      <GlassCard className="p-4 sm:p-6 h-[640px] flex flex-col">
        <RakshikaAIChat className="h-full" />
      </GlassCard>
    </div>
  );
};
