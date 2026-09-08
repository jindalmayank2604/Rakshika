import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from './Button';

export const InstallPWABanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user dismissed recently
      const dismissed = localStorage.getItem('rakshika_pwa_dismissed');
      if (!dismissed) {
        setVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted PWA installation');
    }
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('rakshika_pwa_dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-sm bg-white/95 backdrop-blur-xl border border-indigo-100 shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold shadow-md shadow-primary-500/20">
          🛡️
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">Install Rakshika</h4>
          <p className="text-xs text-slate-500">Quick home screen SOS access</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Button size="sm" variant="primary" onClick={handleInstallClick} icon={Download}>
          Install
        </Button>
        <button
          onClick={handleDismiss}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          aria-label="Dismiss install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
