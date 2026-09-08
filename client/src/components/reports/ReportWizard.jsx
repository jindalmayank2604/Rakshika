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
import { Badge } from '../ui/Badge';
import { LocationPickerMap } from '../maps/LocationPickerMap';
import { INCIDENT_CATEGORIES } from '../../data/mockData';
import { apiService } from '../../services/api';
import { useSafety } from '../../context/SafetyContext';
import { useNotifications } from '../../context/NotificationContext';
import { Success3DIllustration } from '../../assets/illustrations/3DIllustrations';

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
    latitude: currentLocation.lat,
    longitude: currentLocation.lng,
    address: currentLocation.address,
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
        showToast('Image uploaded successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const created = await addReport({
        ...formData,
        ai_summary: aiSuggestion?.summary || 'Community incident logged.'
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
      <GlassCard className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
        <Success3DIllustration className="w-32 h-32 mx-auto" />
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Thank You for Empowering Safety
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Your community safety report has been logged and queued for review. Your contribution helps women and commuters navigate with greater confidence.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-left text-xs text-slate-700 space-y-1.5">
          <p><strong>Report Title:</strong> {formData.title}</p>
          <p><strong>Category:</strong> {formData.category}</p>
          <p><strong>Status:</strong> <span className="text-primary-700 font-bold">Submitted (Under Review)</span></p>
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
                latitude: currentLocation.lat,
                longitude: currentLocation.lng,
                address: currentLocation.address,
                severity: 'Medium',
                image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80'
              });
            }}
          >
            File Another Report
          </Button>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 sm:p-8 max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Step {step} of 5</span>
          <span className="text-primary-600">
            {step === 1 && 'Select Category'}
            {step === 2 && 'Incident Details'}
            {step === 3 && 'Location Coordinates'}
            {step === 4 && 'Upload Evidence'}
            {step === 5 && 'Review & AI Classification'}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Category */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">What type of concern would you like to report?</h3>
            <p className="text-xs text-slate-500 mt-1">Select the category that best matches what you observed.</p>
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
                      ? 'border-primary-500 bg-primary-50/70 shadow-sm ring-2 ring-primary-500/20'
                      : 'border-slate-200/80 bg-white/60 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className="p-2.5 rounded-xl text-white flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{cat.description}</p>
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
            <h3 className="text-lg font-bold text-slate-900">Describe what happened or what you noticed</h3>
            <p className="text-xs text-slate-500 mt-1">Be as clear and specific as possible to guide fellow commuters.</p>
          </div>

          <Input
            label="Incident Title"
            placeholder="e.g. Non-working streetlights from metro gate to bus depot"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Detailed Description</label>
            <textarea
              rows={4}
              placeholder="Describe what you observed, specific landmarks, timing, or safety hazard..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-bold text-slate-700">Severity Assessment:</span>
            {['Low', 'Medium', 'High', 'Critical'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, severity: s }))}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  formData.severity === s
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
            <h3 className="text-lg font-bold text-slate-900">Pin Location on Safety Map</h3>
            <p className="text-xs text-slate-500 mt-1">Confirm the exact location of the incident.</p>
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

      {/* Step 4: Photo evidence */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Upload Photo Evidence (Optional)</h3>
            <p className="text-xs text-slate-500 mt-1">Photos help community verifiers and municipal officials take swift action.</p>
          </div>

          <div className="border-2 border-dashed border-slate-300 hover:border-primary-400 rounded-3xl p-6 text-center bg-slate-50/50 hover:bg-primary-50/20 transition-all cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-primary-600 flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">Click to upload photo or take picture</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>

          {formData.image_url && (
            <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-slate-200">
              <img
                src={formData.image_url}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/80 text-white font-bold px-2 py-0.5 rounded">
                Photo Attached
              </span>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Review & AI Auto-Classification */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Review & Submit Report</h3>
            <p className="text-xs text-slate-500 mt-1">Confirm the details before logging into the community map.</p>
          </div>

          {/* AI Analysis Card */}
          <div className="p-4 rounded-2xl bg-indigo-50/90 border border-indigo-100 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-primary-600 text-white flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-indigo-950">Rakshika AI Auto-Assessment</h4>
              <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
                {aiSuggestion?.summary || 'Identified infrastructure concern. Categorized for expedited community verification.'}
              </p>
              {aiSuggestion?.recommendedAction && (
                <p className="text-[11px] text-indigo-700 mt-1 font-medium">
                  <strong>Recommended Action:</strong> {aiSuggestion.recommendedAction}
                </p>
              )}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Category:</span>
              <span className="font-bold text-slate-900">{formData.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Severity:</span>
              <span className="font-bold text-rose-600">{formData.severity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Location:</span>
              <span className="font-bold text-slate-900 truncate max-w-[240px]">{formData.address}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Description:</span>
              <p className="text-slate-800 mt-1 font-normal">{formData.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
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
            Submit Report
          </Button>
        )}
      </div>
    </GlassCard>
  );
};
