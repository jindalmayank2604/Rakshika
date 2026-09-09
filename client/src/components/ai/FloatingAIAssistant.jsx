import React, { useState } from 'react';
import { Bot, Sparkles, X } from 'lucide-react';
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
          className="group relative flex items-center gap-2 bg-gradient-to-r from-wine-plum to-smoky-rose hover:from-primary-700 hover:to-smoky-rose text-bone px-4 py-3 rounded-full shadow-warm-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-dust-grey/60 dark:border-smoky-rose/40"
          aria-label="Open WeSafe AI Safety Companion"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-bone" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-wine-plum animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline text-bone">WeSafe AI</span>
        </button>
      </div>

      {/* Slide-out Assistant Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="max-w-lg"
        title="WeSafe AI • Proactive Safety Companion"
      >
        <div className="h-[480px]">
          <RakshikaAIChat className="h-full" />
        </div>
      </Modal>
    </>
  );
};
