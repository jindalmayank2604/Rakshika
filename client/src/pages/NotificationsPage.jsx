import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';

export const NotificationsPage = () => {
  const { notifications, markAsRead } = useNotifications();

  const getIcon = (type) => {
    if (type === 'report_verified') return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    if (type === 'safety_alert') return <AlertTriangle className="w-5 h-5 text-emergency" />;
    if (type === 'contact_alert') return <ShieldCheck className="w-5 h-5 text-accent" />;
    return <Bell className="w-5 h-5 text-wine-plum dark:text-bone" />;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
            Alerts & Activity
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
          Notifications Center
        </h2>
        <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
          Real-time updates regarding your hazard reports, verification milestones, and safety circle broadcasts.
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <GlassCard
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`p-4 sm:p-5 flex items-start gap-4 transition-all cursor-pointer border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm ${
              n.is_read ? 'opacity-85' : 'bg-powder-petal/50 dark:bg-wine-plum/60'
            }`}
          >
            <div className="p-2.5 rounded-2xl bg-parchment dark:bg-wine-plum shadow-sm flex-shrink-0 border border-dust-grey/50">
              {getIcon(n.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-wine-plum dark:text-bone">{n.title}</h4>
                <span className="text-[11px] text-dust-grey-dark dark:text-silver">{n.time}</span>
              </div>
              <p className="text-xs text-wine-plum/90 dark:text-silver leading-relaxed">{n.message}</p>
            </div>

            {!n.is_read && (
              <span className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0 mt-1" />
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
