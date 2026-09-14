import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ShieldCheck, User, Sparkles, Navigation, Moon, Sun, AlertTriangle, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useSafety } from '../../context/SafetyContext';
import { useTheme } from '../../context/ThemeContext';
import { Shield3D } from '../ui/Illustrations3D';

export const AppHeader = ({ onOpenSOS }) => {
  const { user, isGuest } = useAuth();
  const { unreadCount, notifications, markAsRead } = useNotifications();
  const { safetyScore, currentLocation } = useSafety();
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 glass-nav border-b border-dust-grey/60 dark:border-smoky-rose/30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-warm-sm">
      <div className="flex items-center gap-3">
        {/* Mobile brand indicator */}
        <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
          <Shield3D className="w-8 h-8" glow={false} />
          <div>
            <span className="font-extrabold text-wine-plum dark:text-bone tracking-tight text-base">WeSafe</span>
          </div>
        </Link>

        {/* Location pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-powder-petal/60 dark:bg-wine-plum/60 border border-dust-grey/60 dark:border-smoky-rose/30 text-xs font-semibold text-wine-plum dark:text-bone">
          <Navigation className="w-3.5 h-3.5 text-accent" />
          <span className="truncate max-w-[220px]">{currentLocation?.address || 'Current Community Zone'}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Safety Score Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300/60 dark:border-emerald-700/60 text-xs font-bold text-emerald-900 dark:text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Safety Index {safetyScore}%</span>
        </div>

        {/* SOS Desktop trigger */}
        <button
          onClick={onOpenSOS}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emergency/15 text-emergency hover:bg-emergency/25 border border-emergency/30 text-xs font-extrabold transition-colors shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emergency animate-ping" />
          <span>SOS Panic</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-wine-plum dark:text-bone hover:bg-powder-petal/60 dark:hover:bg-smoky-rose/30 transition-colors"
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          {isDark ? <Sun className="w-4 h-4 text-almond-dark" /> : <Moon className="w-4 h-4 text-wine-plum" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-wine-plum dark:text-bone hover:bg-powder-petal/60 dark:hover:bg-smoky-rose/30 relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emergency text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-modal border border-dust-grey/80 dark:border-smoky-rose/40 shadow-2xl rounded-2xl p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-dust-grey/40 dark:border-smoky-rose/30">
                <h4 className="text-sm font-bold text-wine-plum dark:text-bone">Notifications</h4>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-accent dark:text-almond-dark hover:underline"
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
                      n.is_read
                        ? 'bg-parchment/60 dark:bg-wine-plum/30 text-dust-grey-dark dark:text-silver'
                        : 'bg-linen dark:bg-wine-plum/80 text-wine-plum dark:text-bone font-medium border border-dust-grey/40 dark:border-smoky-rose/30'
                    }`}
                  >
                    <p className="font-bold text-wine-plum dark:text-bone mb-0.5">{n.title}</p>
                    <p className="leading-snug">{n.message}</p>
                    <p className="text-[10px] text-dust-grey-dark dark:text-silver mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Guest Status */}
        {user ? (
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-dust-grey/60 dark:border-smoky-rose/30">
            <span className="text-xs font-bold text-wine-plum dark:text-bone">{user.name}</span>
            {user.role === 'admin' && (
              <span className="px-2 py-0.5 rounded-full bg-accent/20 text-wine-plum dark:text-bone text-[10px] font-bold">Admin</span>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
};

