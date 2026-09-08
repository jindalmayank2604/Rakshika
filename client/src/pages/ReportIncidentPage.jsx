import React from 'react';
import { ReportWizard } from '../components/reports/ReportWizard';
import { Shield, AlertTriangle, Sparkles, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ReportIncidentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Community Protection Form</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Report an Unsafe Situation or Hazard
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          Your report empowers fellow women commuters and alerts local authorities to address blindspots, broken lighting, and suspicious activity.
        </p>
      </div>

      <ReportWizard onComplete={() => navigate('/map')} />
    </div>
  );
};
