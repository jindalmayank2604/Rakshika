import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Shield, ShieldCheck, User, Sparkles, Navigation } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useSafety } from '../../context/SafetyContext';
import { Badge } from '../ui/Badge';

export const AppHeader = ({ onOpenSOS }) => {
  const { user, switchRole } = useAuth();
  const { unreadCount, notifications, markAsRead } = useNotifications();
  const { safetyScore, currentLocation } = useSafety();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile brand indicator */}
        <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold shadow-sm">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight">Rakshika</span>
        </Link>

        {/* Location pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 text-xs font-medium text-slate-700">
          <Navigation className="w-3.5 h-3.5 text-primary-600" />
          <span className="truncate max-w-[200px]">{currentLocation.address}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Safety Score Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-100 text-xs font-bold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Safety Index {safetyScore}%</span>
        </div>

        {/* SOS Desktop trigger */}
        <button
          onClick={onOpenSOS}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
          <span>SOS Mode</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-2xl rounded-2xl p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-primary-600 hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                      n.is_read ? 'bg-slate-50 text-slate-600' : 'bg-primary-50/60 text-slate-800 font-medium'
                    }`}
                  >
                    <p className="font-bold text-slate-900 mb-0.5">{n.title}</p>
                    <p className="leading-snug">{n.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Demo Switch role */}
        <button
          onClick={() => switchRole(user?.role === 'admin' ? 'user' : 'admin')}
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          title="Toggle user/admin mode for demonstration"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>{user?.role === 'admin' ? 'Admin' : 'User'} Mode</span>
        </button>
      </div>
    </header>
  );
};
