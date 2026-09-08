import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  MapPin,
  ShieldAlert,
  Bell,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Phone
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useSafety } from '../context/SafetyContext';
import { useNotifications } from '../context/NotificationContext';
import { Hero3DIllustration, Success3DIllustration } from '../assets/illustrations/3DIllustrations';

export const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const { addContact } = useSafety();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [contactForm, setContactForm] = useState({
    name: 'Ananya Sharma',
    phone: '+91 98234 56789',
    relationship: 'Sister'
  });

  const handleAddContact = async () => {
    if (contactForm.name && contactForm.phone) {
      await addContact({ ...contactForm, is_primary: true });
      showToast('Primary emergency contact saved', 'success');
    }
    setStep(3);
  };

  const handleNext = () => {
    if (step < 5) setStep(prev => prev + 1);
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-[#FAF8FF] to-teal-50/50 flex flex-col justify-center items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-xl">
        {/* Progress header */}
        <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Onboarding • Step {step} of 5</span>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:underline"
          >
            Skip to Dashboard
          </button>
        </div>

        <GlassCard className="p-6 sm:p-10 space-y-6">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-primary-500/25">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Welcome to Rakshika
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your intelligent companion for proactive safety, community awareness, and emergency preparedness. Let's take 60 seconds to personalize your protection.
              </p>
            </div>
          )}

          {/* Step 2: Add Contacts */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Add Trusted Contact</h3>
                  <p className="text-xs text-slate-500">Your primary SOS responder in urgent situations.</p>
                </div>
              </div>

              <Input
                label="Contact Name"
                placeholder="e.g. Ananya Sharma"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              />

              <Input
                label="Phone Number"
                placeholder="+91 98234 56789"
                icon={Phone}
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              />

              <Input
                label="Relationship"
                placeholder="Sister / Parent / Friend"
                value={contactForm.relationship}
                onChange={(e) => setContactForm({ ...contactForm, relationship: e.target.value })}
              />
            </div>
          )}

          {/* Step 3: Location Permissions */}
          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Enable Location for Live Safety
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Rakshika uses your location exclusively to display real-time safety scores, nearby community incident alerts, and pinpoint your coordinates in SOS emergencies.
              </p>
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 text-xs text-teal-800 font-medium">
                ✓ Precise GPS active for emergency assistance
              </div>
            </div>
          )}

          {/* Step 4: Explain SOS (3s hold) */}
          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-pulse">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                How the SOS Button Works
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                To prevent accidental triggers, Rakshika requires a <strong>press-and-hold for 3 seconds</strong>. Once activated, your GPS coordinates and simulated alerts are broadcasted immediately.
              </p>
            </div>
          )}

          {/* Step 5: Notifications */}
          {step === 5 && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-primary-600 flex items-center justify-center mx-auto">
                <Bell className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Notification Preferences
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Get alerted when community hazards near your regular commute are resolved or when verified updates are posted.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(prev => prev - 1)} icon={ArrowLeft}>
                Back
              </Button>
            ) : <div />}

            {step === 2 ? (
              <Button variant="primary" onClick={handleAddContact} icon={ArrowRight}>
                Save Contact & Continue
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext} icon={ArrowRight}>
                {step === 5 ? 'Get Started' : 'Continue'}
              </Button>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
