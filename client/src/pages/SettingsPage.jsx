import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, MapPin, Shield, Lock, Moon, Sun, Globe, HelpCircle } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useNotifications } from '../context/NotificationContext';

export const SettingsPage = () => {
  const { showToast } = useNotifications();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [locationHighAccuracy, setLocationHighAccuracy] = useState(true);
  const [anonymousReporting, setAnonymousReporting] = useState(false);
  const [sosCountdownTime, setSosCountdownTime] = useState('3');

  const handleSave = () => {
    showToast('Preferences saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
            System & Privacy
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Application Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure notification alerts, location privacy, and emergency trigger behavior.
        </p>
      </div>

      <div className="space-y-4">
        {/* Safety & SOS Settings */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Emergency Trigger Preferences</h3>
              <p className="text-xs text-slate-500">Customize SOS sensitivity and hold durations</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900">SOS Press-and-Hold Duration</h4>
              <p className="text-xs text-slate-500">Time required to prevent accidental triggers</p>
            </div>
            <select
              value={sosCountdownTime}
              onChange={(e) => setSosCountdownTime(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
            >
              <option value="2">2 Seconds</option>
              <option value="3">3 Seconds (Recommended)</option>
              <option value="5">5 Seconds</option>
            </select>
          </div>
        </GlassCard>

        {/* Privacy & Location */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Location & Anonymity</h3>
              <p className="text-xs text-slate-500">Control how your observations appear to others</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900">High-Precision GPS Tracking</h4>
              <p className="text-xs text-slate-500">Provide precise street-level accuracy during SOS mode</p>
            </div>
            <input
              type="checkbox"
              checked={locationHighAccuracy}
              onChange={(e) => setLocationHighAccuracy(e.target.checked)}
              className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Anonymous Community Submissions</h4>
              <p className="text-xs text-slate-500">Hide your user name from public map pins</p>
            </div>
            <input
              type="checkbox"
              checked={anonymousReporting}
              onChange={(e) => setAnonymousReporting(e.target.checked)}
              className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500"
            />
          </div>
        </GlassCard>

        {/* Notifications */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-indigo-100 text-primary-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Push Notifications</h3>
              <p className="text-xs text-slate-500">Stay informed about nearby safety reports</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Proximity Safety Alerts</h4>
              <p className="text-xs text-slate-500">Receive alerts if critical incidents occur within 1 km</p>
            </div>
            <input
              type="checkbox"
              checked={pushEnabled}
              onChange={(e) => setPushEnabled(e.target.checked)}
              className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500"
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
