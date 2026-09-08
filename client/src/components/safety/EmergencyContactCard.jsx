import React from 'react';
import { Phone, MessageSquare, Trash2, Star, CheckCircle, Shield } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const EmergencyContactCard = ({
  contact,
  onDelete,
  onCallSimulate,
  onSmsSimulate
}) => {
  return (
    <GlassCard className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-primary-500/20 flex-shrink-0">
          {contact.name[0]}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900">{contact.name}</h4>
            {contact.is_primary && (
              <Badge variant="primary" size="xs">
                <Star className="w-2.5 h-2.5 fill-current" />
                Primary SOS
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium">{contact.relationship} • {contact.phone}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          onClick={() => onCallSimulate(contact)}
          className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
          title={`Call ${contact.name}`}
          aria-label={`Call ${contact.name}`}
        >
          <Phone className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSmsSimulate(contact)}
          className="p-2.5 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
          title={`Send test SOS SMS to ${contact.name}`}
          aria-label={`Send test SOS SMS to ${contact.name}`}
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete contact"
            aria-label="Delete contact"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </GlassCard>
  );
};
