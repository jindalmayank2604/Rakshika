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
  Sparkles,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export const Sidebar = () => {
  const { user, logout, switchRole } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Safety Map', path: '/map', icon: MapPin },
    { name: 'Report Incident', path: '/report', icon: AlertTriangle },
    { name: 'My Reports', path: '/my-reports', icon: FileText },
    { name: 'Emergency Contacts', path: '/contacts', icon: Users },
    { name: 'Rakshika AI', path: '/ai-assistant', icon: Bot, highlight: true },
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white/80 backdrop-blur-xl border-r border-slate-200/70 p-4 justify-between select-none">
      <div className="space-y-6">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-700 via-primary-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-primary-500/25">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
              Rakshika
            </h1>
            <p className="text-[11px] font-semibold text-primary-600 mt-1">Smart Safety Companion</p>
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
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-primary-600' : ''}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emergency text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary-100 text-primary-700">
                    AI
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Admin Navigation */}
          {user?.role === 'admin' ? (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-900 text-white shadow-md'
                    : 'text-indigo-800 bg-indigo-50/70 hover:bg-indigo-100'
                }`
              }
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </NavLink>
          ) : (
            <div className="pt-2">
              <button
                onClick={() => switchRole('admin')}
                className="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-primary-700 hover:bg-slate-50 border border-dashed border-slate-200 transition-colors"
                title="Switch to demo admin reviewer"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>View Admin Portal</span>
                </span>
                <span className="text-[10px] bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-700">Demo</span>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* User Card & Logout */}
      <div className="pt-4 border-t border-slate-200/70 space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
              {user?.name ? user.name[0].toUpperCase() : 'P'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Priya Sharma'}</p>
              <p className="text-[10px] text-slate-500 capitalize">{user?.role || 'user'} Account</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
