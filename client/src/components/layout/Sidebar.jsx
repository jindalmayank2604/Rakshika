import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  AlertTriangle,
  FileText,
  Users,
  Bot,
  Bell,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  LogIn,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { Shield3D } from '../ui/Illustrations3D';

export const Sidebar = () => {
  const { user, isGuest, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Safety Map & Routes', path: '/map', icon: MapPin },
    { name: 'Report Hazard', path: '/report', icon: AlertTriangle },
    { name: 'My Reports', path: '/my-reports', icon: FileText },
    { name: 'Emergency Circle', path: '/contacts', icon: Users },
    { name: 'WeSafe AI Assistant', path: '/ai-assistant', icon: Bot, highlight: true },
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 glass-nav border-r border-dust-grey/60 dark:border-smoky-rose/30 p-4 justify-between select-none shadow-warm-sm">
      <div className="space-y-6">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center gap-3 px-2 py-1.5 group">
          <Shield3D className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div>
            <h1 className="text-xl font-extrabold text-wine-plum dark:text-bone tracking-tight leading-none">
              WeSafe
            </h1>
            <p className="text-[10px] font-bold text-accent dark:text-almond-dark uppercase tracking-wider mt-1">
              Protect. Prevent. Empower.
            </p>
          </div>
        </Link>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum shadow-md'
                      : 'text-wine-plum/80 dark:text-bone/80 hover:text-wine-plum dark:hover:text-bone hover:bg-powder-petal/50 dark:hover:bg-smoky-rose/20'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-accent dark:text-almond-dark' : ''}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emergency text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-accent/20 text-wine-plum dark:text-bone">
                    Gemini AI
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Real Admin Navigation - Only visible to authenticated admins */}
          {user?.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-wine-plum text-bone shadow-md'
                    : 'text-wine-plum dark:text-bone bg-powder-petal/50 dark:bg-wine-plum/60 hover:bg-powder-petal'
                }`
              }
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Admin Portal</span>
            </NavLink>
          )}
        </nav>
      </div>

      {/* User Card, Theme Toggle & Logout/Login */}
      <div className="pt-4 border-t border-dust-grey/50 dark:border-smoky-rose/30 space-y-3">
        <div className="flex items-center justify-between px-1">
          {user ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-wine-plum to-smoky-rose flex items-center justify-center text-bone font-bold text-sm shadow-sm flex-shrink-0">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-wine-plum dark:text-bone truncate">{user.name}</p>
                <p className="text-[10px] text-dust-grey-dark dark:text-silver capitalize">{user.role} Account</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-dust-grey/60 dark:bg-smoky-rose/40 flex items-center justify-center text-wine-plum dark:text-bone font-bold text-xs flex-shrink-0">
                G
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-wine-plum dark:text-bone">Guest User</p>
                <p className="text-[10px] text-dust-grey-dark dark:text-silver">Read-only Map View</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-wine-plum dark:text-bone hover:bg-powder-petal/50 dark:hover:bg-smoky-rose/30 transition-colors"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? <Sun className="w-4 h-4 text-almond-dark" /> : <Moon className="w-4 h-4 text-wine-plum" />}
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-dust-grey-dark dark:text-silver hover:text-emergency hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="p-1.5 rounded-lg text-wine-plum dark:text-bone hover:bg-powder-petal/60 transition-colors"
                title="Sign In"
              >
                <LogIn className="w-4 h-4 text-accent" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

