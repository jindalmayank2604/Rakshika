import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';

export const NotificationsPage = () => {
  const { notifications, markAsRead } = useNotifications();

  const getIcon = (type) => {
    if (type === 'report_verified') return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    if (type === 'safety_alert') return <AlertTriangle className="w-5 h-5 text-rose-600" />;
    if (type === 'contact_alert') return <ShieldCheck className="w-5 h-5 text-purple-600" />;
    return <Bell className="w-5 h-5 text-primary-600" />;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
            Alerts & Activity
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Notifications Center
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Real-time updates regarding your incident reports, verification milestones, and safety circle.
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <GlassCard
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`p-4 sm:p-5 flex items-start gap-4 transition-all cursor-pointer ${
              n.is_read ? 'opacity-85' : 'bg-primary-50/40 border-primary-100 shadow-sm'
            }`}
          >
            <div className="p-2.5 rounded-2xl bg-white shadow-sm flex-shrink-0">
              {getIcon(n.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                <span className="text-[11px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
            </div>

            {!n.is_read && (
              <span className="w-2.5 h-2.5 rounded-full bg-primary-600 flex-shrink-0 mt-1" />
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
