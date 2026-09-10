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
    <GlassCard className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-wine-plum to-smoky-rose text-bone font-extrabold text-lg flex items-center justify-center shadow-md shadow-wine-plum/20 flex-shrink-0">
          {contact.name[0]}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-wine-plum dark:text-bone">{contact.name}</h4>
            {contact.is_primary && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-powder-petal dark:bg-wine-plum text-[10px] font-bold text-wine-plum dark:text-bone border border-dust-grey/60 dark:border-smoky-rose/30">
                <Star className="w-2.5 h-2.5 fill-current text-accent" />
                Primary SOS
              </span>
            )}
          </div>
          <p className="text-xs text-dust-grey-dark dark:text-silver font-medium">{contact.relationship} • {contact.phone}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          onClick={() => onCallSimulate(contact)}
          className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
          title={`Call ${contact.name}`}
          aria-label={`Call ${contact.name}`}
        >
          <Phone className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSmsSimulate(contact)}
          className="p-2.5 rounded-xl bg-powder-petal/60 dark:bg-wine-plum/60 text-wine-plum dark:text-bone hover:bg-powder-petal transition-colors"
          title={`Send test SOS SMS to ${contact.name}`}
          aria-label={`Send test SOS SMS to ${contact.name}`}
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2.5 rounded-xl text-dust-grey-dark dark:text-silver hover:text-emergency hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
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
