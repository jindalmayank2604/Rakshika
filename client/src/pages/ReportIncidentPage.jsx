import React from 'react';
import { ReportWizard } from '../components/reports/ReportWizard';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ReportIncidentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-powder-petal/80 dark:bg-wine-plum/80 text-wine-plum dark:text-bone text-xs font-bold border border-dust-grey/60 dark:border-smoky-rose/30">
          <AlertTriangle className="w-3.5 h-3.5 text-accent" />
          <span>WeSafe Community Protection</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
          Report an Unsafe Situation or Hazard
        </h2>
        <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver max-w-xl mx-auto leading-relaxed">
          Your report empowers fellow commuters and helps optimize safer route recommendations with verified hazard data.
        </p>
      </div>

      <ReportWizard onComplete={() => navigate('/map')} />
    </div>
  );
};
