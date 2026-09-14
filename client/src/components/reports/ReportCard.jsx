import React from 'react';
import { MapPin, Calendar, CheckCircle, Clock, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

export const ReportCard = ({ report, onClick }) => {
  const getStatusBadge = (status) => {
    if (status === 'Resolved') return <Badge variant="success">Resolved</Badge>;
    return <Badge variant="warning">Unresolved</Badge>;
  };

  const getSeverityBadge = (severity) => {
    if (severity === 'Critical') return <Badge variant="danger" size="xs">Critical</Badge>;
    if (severity === 'High') return <Badge variant="danger" size="xs">High</Badge>;
    if (severity === 'Medium') return <Badge variant="warning" size="xs">Medium</Badge>;
    return <Badge variant="teal" size="xs">Low</Badge>;
  };

  return (
    <GlassCard
      hoverEffect
      onClick={onClick}
      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        {report.image_url ? (
          <img
            src={report.image_url}
            alt={report.title}
            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 border border-slate-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-primary-600 font-bold flex-shrink-0">
            📍
          </div>
        )}

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {report.category}
            </span>
            {getSeverityBadge(report.severity)}
            {getStatusBadge(report.status)}
          </div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
            {report.title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              {report.address}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(report.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </GlassCard>
  );
};
