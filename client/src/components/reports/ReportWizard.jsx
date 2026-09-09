import React, { useState } from 'react';
import {
  SunMedium,
  AlertTriangle,
  Eye,
  VideoOff,
  Footprints,
  ShieldAlert,
  HelpCircle,
  Camera,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileText
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LocationPickerMap } from '../maps/LocationPickerMap';
import { INCIDENT_CATEGORIES } from '../../data/mockData';
import { apiService } from '../../services/api';
import { useSafety } from '../../context/SafetyContext';
import { useNotifications } from '../../context/NotificationContext';
import { Success3DIllustration } from '../../assets/illustrations/3DIllustrations';
import { CommunityReport3D } from '../ui/Illustrations3D';

export const ReportWizard = ({ onComplete }) => {
  const { addReport, currentLocation } = useSafety();
  const { showToast } = useNotifications();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);

  const [formData, setFormData] = useState({
    category: 'Poor Lighting',
    title: '',
    description: '',
    latitude: currentLocation?.lat || 28.5355,
    longitude: currentLocation?.lng || 77.3910,
    address: currentLocation?.address || 'Sector 12 Market Road',
    severity: 'Medium',
    image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80'
  });

  const [submittedReport, setSubmittedReport] = useState(null);

  const iconMap = {
    SunMedium,
    AlertTriangle,
    Eye,
    VideoOff,
    Footprints,
    ShieldAlert,
    HelpCircle
  };

  const handleNext = async () => {
    if (step === 1 && !formData.category) return;
    if (step === 2) {
      if (!formData.title || !formData.description) {
        showToast('Please fill out the title and description.', 'danger');
        return;
      }
      // Trigger AI Classification suggestion in background
      setAiAnalyzing(true);
      try {
        const analysis = await apiService.classifyIncident(formData.description, formData.category);
        setAiSuggestion(analysis);
        if (analysis.severity) {
          setFormData(prev => ({ ...prev, severity: analysis.severity }));
        }
      } catch (e) {
        console.warn('AI analysis note:', e);
      } finally {
        setAiAnalyzing(false);
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image_url: reader.result }));
        showToast('Cloudinary evidence image attached successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const created = await addReport({
        ...formData,
        ai_summary: aiSuggestion?.summary || 'WeSafe community hazard logged.'
      });
      setSubmittedReport(created);
      setStep(6); // Success Step
      showToast('Thank you! Your report has been submitted to keep our community safe.', 'success');
    } catch (e) {
      showToast('Failed to submit report. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Step 6: Reassuring Success Screen
  if (step === 6) {
    return (
      <GlassCard className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-lg">
        <CommunityReport3D className="w-32 h-32 mx-auto" />
        <div>
          <h3 className="text-2xl font-extrabold text-wine-plum dark:text-bone">
            Thank You for Empowering Safety
          </h3>
          <p className="text-sm text-dust-grey-dark dark:text-silver mt-2 leading-relaxed">
            Your community safety report has been logged and queued for moderation. Your contribution helps commuters make safer journey choices.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-powder-petal/50 dark:bg-wine-plum/50 border border-dust-grey/60 dark:border-smoky-rose/30 text-left text-xs text-wine-plum dark:text-bone space-y-1.5">
          <p><strong>Report Title:</strong> {formData.title}</p>
          <p><strong>Category:</strong> {formData.category}</p>
          <p><strong>Status:</strong> <span className="text-emerald-700 dark:text-emerald-400 font-bold">Submitted (Under Review)</span></p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Button
            variant="primary"
            onClick={() => {
              if (onComplete) onComplete();
              else window.location.href = '/map';
            }}
          >
            Explore on Safety Map
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setStep(1);
              setFormData({
                category: 'Poor Lighting',
                title: '',
                description: '',
                latitude: currentLocation?.lat || 28.5355,
                longitude: currentLocation?.lng || 77.3910,
                address: currentLocation?.address || 'Sector 12 Market Road',
                severity: 'Medium',
                image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80'
              });
            }}
          >
            File Another Hazard
          </Button>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 sm:p-8 max-w-2xl mx-auto border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-md">
      {/* Progress header */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-dust-grey-dark dark:text-silver mb-2">
          <span>Step {step} of 5</span>
          <span className="text-wine-plum dark:text-bone font-bold">
            {step === 1 && 'Select Hazard Type'}
            {step === 2 && 'Incident Details'}
            {step === 3 && 'Location Coordinates'}
            {step === 4 && 'Upload Evidence (Cloudinary)'}
            {step === 5 && 'Review & AI Classification'}
          </span>
        </div>
        <div className="w-full bg-dust-grey/40 dark:bg-wine-plum/60 rounded-full h-2 overflow-hidden">
          <div
            className="bg-wine-plum dark:bg-bone h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Category */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-wine-plum dark:text-bone">What type of concern would you like to report?</h3>
            <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">Select the category that best matches what you observed.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INCIDENT_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || ShieldAlert;
              const isSelected = formData.category === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-wine-plum dark:border-bone bg-powder-petal/60 dark:bg-wine-plum/70 shadow-sm ring-2 ring-wine-plum/20'
                      : 'border-dust-grey/60 dark:border-smoky-rose/30 bg-parchment/50 dark:bg-wine-plum/30 hover:bg-powder-petal/40'
                  }`}
                >
                  <div
                    className="p-2.5 rounded-xl text-bone flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-wine-plum dark:text-bone">{cat.name}</h4>
                    <p className="text-xs text-dust-grey-dark dark:text-silver mt-0.5 leading-snug">{cat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Description & Title */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-wine-plum dark:text-bone">Describe what happened or what you noticed</h3>
            <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">Be as clear and specific as possible to guide fellow commuters.</p>
          </div>

          <Input
            label="Incident Title"
            placeholder="e.g. Non-working streetlights from metro gate to bus depot"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-wine-plum dark:text-silver">Detailed Description</label>
            <textarea
              rows={4}
              placeholder="Describe what you observed, specific landmarks, timing, or safety hazard..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full glass-input rounded-xl p-3.5 text-sm"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-bold text-wine-plum dark:text-silver">Severity Assessment:</span>
            {['Low', 'Medium', 'High', 'Critical'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, severity: s }))}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  formData.severity === s
                    ? 'bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum shadow-xs'
                    : 'bg-powder-petal/60 dark:bg-wine-plum/60 text-wine-plum dark:text-silver hover:bg-powder-petal'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Location */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-wine-plum dark:text-bone">Pin Location on Safety Map</h3>
            <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">Confirm the exact location of the incident.</p>
          </div>

          <Input
            label="Location Address / Landmark"
            placeholder="e.g. Sector 12 Main Market near pillar 42"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          />

          <LocationPickerMap
            initialLat={formData.latitude}
            initialLng={formData.longitude}
            onLocationChange={(lat, lng) => {
              setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
            }}
          />
        </div>
      )}

      {/* Step 4: Photo evidence with Cloudinary */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-wine-plum dark:text-bone">Upload Photo Evidence (Cloudinary)</h3>
            <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">Photos help community verifiers and municipal officials take swift action.</p>
          </div>

          <div className="border-2 border-dashed border-dust-grey hover:border-accent rounded-3xl p-6 text-center bg-parchment/40 dark:bg-wine-plum/30 hover:bg-powder-petal/30 transition-all cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-powder-petal dark:bg-wine-plum text-accent dark:text-almond-dark flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-wine-plum dark:text-bone">Click to upload photo or capture camera evidence</p>
              <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">PNG, JPG up to 10MB (Cloudinary CDN Optimized)</p>
            </div>
          </div>

          {formData.image_url && (
            <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-dust-grey/60 dark:border-smoky-rose/30">
              <img
                src={formData.image_url}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 text-[10px] bg-wine-plum/90 text-bone font-bold px-2 py-0.5 rounded">
                Cloudinary Asset Ready
              </span>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Review & AI Auto-Classification */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-wine-plum dark:text-bone">Review & Submit Report</h3>
            <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">Confirm details before publishing to the community safety network.</p>
          </div>

          {/* AI Analysis Card */}
          <div className="p-4 rounded-2xl bg-powder-petal/60 dark:bg-wine-plum/60 border border-dust-grey/60 dark:border-smoky-rose/30 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-wine-plum text-bone flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-wine-plum dark:text-bone">WeSafe AI Auto-Classification (Gemini)</h4>
              <p className="text-xs text-wine-plum/90 dark:text-silver mt-1 leading-relaxed">
                {aiSuggestion?.summary || 'Identified infrastructure concern. Categorized for expedited community verification.'}
              </p>
              {aiSuggestion?.recommendedAction && (
                <p className="text-[11px] text-accent dark:text-almond-dark mt-1 font-medium">
                  <strong>Recommended Action:</strong> {aiSuggestion.recommendedAction}
                </p>
              )}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-2xl glass-card border border-dust-grey/60 dark:border-smoky-rose/30 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-dust-grey-dark dark:text-silver font-medium">Category:</span>
              <span className="font-bold text-wine-plum dark:text-bone">{formData.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dust-grey-dark dark:text-silver font-medium">Severity:</span>
              <span className="font-bold text-emergency">{formData.severity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dust-grey-dark dark:text-silver font-medium">Location:</span>
              <span className="font-bold text-wine-plum dark:text-bone truncate max-w-[240px]">{formData.address}</span>
            </div>
            <div className="pt-2 border-t border-dust-grey/40 dark:border-smoky-rose/20">
              <span className="text-dust-grey-dark dark:text-silver font-medium">Description:</span>
              <p className="text-wine-plum/90 dark:text-silver mt-1 font-normal">{formData.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-dust-grey/40 dark:border-smoky-rose/20 mt-6">
        {step > 1 ? (
          <Button variant="outline" onClick={handlePrev} icon={ArrowLeft}>
            Back
          </Button>
        ) : <div />}

        {step < 5 ? (
          <Button variant="primary" onClick={handleNext} icon={ArrowRight}>
            Continue
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            icon={CheckCircle2}
          >
            Submit Hazard Report
          </Button>
        )}
      </div>
    </GlassCard>
  );
};
