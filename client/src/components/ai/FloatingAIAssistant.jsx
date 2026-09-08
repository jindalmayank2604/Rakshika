import React, { useState } from 'react';
import { Bot, Sparkles, X, ShieldAlert } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { RakshikaAIChat } from './RakshikaAIChat';

export const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-20 lg:bottom-8 right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white px-4 py-3 rounded-full shadow-xl shadow-primary-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open Rakshika AI Safety Companion"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-primary-600 animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">Rakshika AI</span>
        </button>
      </div>

      {/* Slide-out Assistant Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="max-w-lg"
        title="Rakshika AI • 24/7 Safety Companion"
      >
        <div className="h-[480px]">
          <RakshikaAIChat className="h-full" />
        </div>
      </Modal>
    </>
  );
};
