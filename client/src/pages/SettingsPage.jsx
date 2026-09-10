import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, MapPin, Shield, Lock, Moon, Sun, Globe, HelpCircle } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useNotifications } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage = () => {
  const { showToast } = useNotifications();
  const { isDark, toggleTheme } = useTheme();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [locationHighAccuracy, setLocationHighAccuracy] = useState(true);
  const [anonymousReporting, setAnonymousReporting] = useState(false);
  const [sosCountdownTime, setSosCountdownTime] = useState('3');

  const handleSave = () => {
    showToast('WeSafe preferences saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
            System & Privacy
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
          Application Settings
        </h2>
        <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
          Configure notification alerts, location privacy, and emergency trigger behavior.
        </p>
      </div>

      <div className="space-y-4">
        {/* Appearance Setting */}
        <GlassCard className="p-6 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-powder-petal/80 dark:bg-wine-plum/80 text-wine-plum dark:text-bone border border-dust-grey/60 dark:border-smoky-rose/30">
                {isDark ? <Moon className="w-5 h-5 text-almond-dark" /> : <Sun className="w-5 h-5 text-wine-plum" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-wine-plum dark:text-bone">Visual Theme</h3>
                <p className="text-xs text-dust-grey-dark dark:text-silver">
                  {isDark ? 'Dark Mode (Smoky Rose & Wine Plum)' : 'Light Mode (Parchment & Linen)'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum text-xs font-extrabold shadow-sm transition-all"
            >
              {isDark ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </GlassCard>

        {/* Safety & SOS Settings */}
        <GlassCard className="p-6 space-y-4 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-dust-grey/40 dark:border-smoky-rose/20">
            <div className="p-2.5 rounded-xl bg-emergency/15 text-emergency">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-wine-plum dark:text-bone">Emergency Trigger Preferences</h3>
              <p className="text-xs text-dust-grey-dark dark:text-silver">Customize SOS sensitivity and hold durations</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-bold text-wine-plum dark:text-bone">SOS Press-and-Hold Duration</h4>
              <p className="text-xs text-dust-grey-dark dark:text-silver">Time required to prevent accidental triggers</p>
            </div>
            <select
              value={sosCountdownTime}
              onChange={(e) => setSosCountdownTime(e.target.value)}
              className="glass-input rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer"
            >
              <option value="2">2 Seconds</option>
              <option value="3">3 Seconds (Recommended)</option>
              <option value="5">5 Seconds</option>
            </select>
          </div>
        </GlassCard>

        {/* Privacy & Location */}
        <GlassCard className="p-6 space-y-4 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-dust-grey/40 dark:border-smoky-rose/20">
            <div className="p-2.5 rounded-xl bg-accent/20 text-wine-plum dark:text-bone">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-wine-plum dark:text-bone">Location & Anonymity</h3>
              <p className="text-xs text-dust-grey-dark dark:text-silver">Control how your hazard submissions appear to others</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-bold text-wine-plum dark:text-bone">High-Precision GPS Safe Routing</h4>
              <p className="text-xs text-dust-grey-dark dark:text-silver">Provide precise street-level accuracy during route navigation & SOS</p>
            </div>
            <input
              type="checkbox"
              checked={locationHighAccuracy}
              onChange={(e) => setLocationHighAccuracy(e.target.checked)}
              className="w-5 h-5 rounded text-wine-plum focus:ring-accent"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-bold text-wine-plum dark:text-bone">Anonymous Community Submissions</h4>
              <p className="text-xs text-dust-grey-dark dark:text-silver">Hide your name from publicly displayed incident markers</p>
            </div>
            <input
              type="checkbox"
              checked={anonymousReporting}
              onChange={(e) => setAnonymousReporting(e.target.checked)}
              className="w-5 h-5 rounded text-wine-plum focus:ring-accent"
            />
          </div>
        </GlassCard>

        {/* Notifications */}
        <GlassCard className="p-6 space-y-4 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-dust-grey/40 dark:border-smoky-rose/20">
            <div className="p-2.5 rounded-xl bg-powder-petal/80 dark:bg-wine-plum/80 text-wine-plum dark:text-bone">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-wine-plum dark:text-bone">Push Notifications</h3>
              <p className="text-xs text-dust-grey-dark dark:text-silver">Stay informed about nearby safety reports</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-bold text-wine-plum dark:text-bone">Proximity Safety Alerts</h4>
              <p className="text-xs text-dust-grey-dark dark:text-silver">Receive alerts if critical incidents occur within 1 km</p>
            </div>
            <input
              type="checkbox"
              checked={pushEnabled}
              onChange={(e) => setPushEnabled(e.target.checked)}
              className="w-5 h-5 rounded text-wine-plum focus:ring-accent"
            />
          </div>
        </GlassCard>

        <div className="flex justify-end pt-2">
          <Button variant="primary" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
