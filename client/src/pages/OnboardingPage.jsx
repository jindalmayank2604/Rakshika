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
import { Shield3D } from '../components/ui/Illustrations3D';

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
    <div className="min-h-screen bg-linen dark:bg-[#3a1322] flex flex-col justify-center items-center py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="w-full max-w-xl">
        {/* Progress header */}
        <div className="mb-6 flex items-center justify-between text-xs font-bold text-dust-grey-dark dark:text-silver">
          <span>Onboarding • Step {step} of 5</span>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-wine-plum dark:text-bone hover:underline"
          >
            Skip to Dashboard
          </button>
        </div>

        <GlassCard className="p-6 sm:p-10 space-y-6 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-lg">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-4">
              <Shield3D className="w-16 h-16 mx-auto" />
              <h2 className="text-2xl font-black text-wine-plum dark:text-bone">
                Welcome to WeSafe
              </h2>
              <p className="text-sm text-dust-grey-dark dark:text-silver max-w-md mx-auto leading-relaxed">
                Your intelligent companion for proactive safety, community awareness, and emergency preparedness. Let's take 60 seconds to personalize your protection.
              </p>
            </div>
          )}

          {/* Step 2: Add Contacts */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-powder-petal dark:bg-wine-plum text-accent dark:text-almond-dark">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-wine-plum dark:text-bone">Add Trusted Contact</h3>
                  <p className="text-xs text-dust-grey-dark dark:text-silver">Your primary SOS responder in urgent situations.</p>
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
              <div className="w-14 h-14 rounded-2xl bg-powder-petal/80 dark:bg-wine-plum text-accent dark:text-almond-dark flex items-center justify-center mx-auto border border-dust-grey/50">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-wine-plum dark:text-bone">
                Enable Location for Live Safety & Route Intelligence
              </h3>
              <p className="text-xs text-dust-grey-dark dark:text-silver max-w-md mx-auto leading-relaxed">
                WeSafe uses your location to calculate safer route recommendations, display live lighting/hazard index, and pinpoint your coordinates during SOS mode.
              </p>
              <div className="p-3 bg-powder-petal/60 dark:bg-wine-plum/60 rounded-xl border border-dust-grey/60 dark:border-smoky-rose/30 text-xs text-wine-plum dark:text-bone font-medium">
                ✓ Precise GPS active for emergency assistance & navigation
              </div>
            </div>
          )}

          {/* Step 4: Explain SOS (3s hold) */}
          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emergency/15 text-emergency flex items-center justify-center mx-auto animate-pulse">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-wine-plum dark:text-bone">
                How the SOS Button Works
              </h3>
              <p className="text-xs text-dust-grey-dark dark:text-silver max-w-md mx-auto leading-relaxed">
                To prevent accidental triggers, WeSafe requires a <strong>press-and-hold for 3 seconds</strong>. Once activated, your GPS coordinates and emergency SMS alerts are dispatched immediately.
              </p>
            </div>
          )}

          {/* Step 5: Notifications */}
          {step === 5 && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-powder-petal/80 dark:bg-wine-plum text-wine-plum dark:text-bone flex items-center justify-center mx-auto border border-dust-grey/50">
                <Bell className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-wine-plum dark:text-bone">
                Notification Preferences
              </h3>
              <p className="text-xs text-dust-grey-dark dark:text-silver max-w-md mx-auto leading-relaxed">
                Get alerted when hazards near your regular transit route are verified, repaired, or when community members post updates.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-dust-grey/40 dark:border-smoky-rose/20">
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
