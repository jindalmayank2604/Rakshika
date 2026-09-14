import React from 'react';
import { MapPin, Calendar, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, User, ExternalLink } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const IncidentDetailModal = ({ report, isOpen, onClose }) => {
  if (!report) return null;

  const getStatusBadge = (status) => {
    if (status === 'Resolved') return <Badge variant="success">Resolved</Badge>;
    return <Badge variant="warning">Unresolved</Badge>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl" title="Incident Community Report">
      <div className="space-y-5">
        {/* Image Preview if available */}
        {report.image_url && (
          <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={report.image_url}
              alt={report.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="purple" size="sm">
                {report.category}
              </Badge>
              {getStatusBadge(report.status)}
            </div>
          </div>
        )}

        {/* Title and metadata */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
            {report.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              {report.address}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {(() => {
                if (!report.created_at) return new Date().toLocaleDateString();
                const d = new Date(report.created_at);
                return isNaN(d.getTime()) ? new Date().toLocaleDateString() : d.toLocaleDateString();
              })()}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {report.user_name || 'Community Member'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Observation Details:
          </span>
          <p className="text-sm text-slate-700 leading-relaxed">
            {report.description}
          </p>
        </div>

        {/* AI Insight Pill */}
        {report.ai_summary && (
          <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-indigo-900">Rakshika AI Incident Analysis:</span>
              <p className="text-xs text-indigo-700 mt-0.5 leading-normal">{report.ai_summary}</p>
            </div>
          </div>
        )}

        {/* Verification & Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Status: <span className="font-bold text-slate-800">{report.verification_status || 'Community Verified'}</span>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Report
          </Button>
        </div>
      </div>
    </Modal>
  );
};
