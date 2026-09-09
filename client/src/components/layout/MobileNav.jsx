import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, AlertTriangle, Bot, Users, ShieldAlert } from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';

export const MobileNav = ({ onOpenSOS }) => {
  const { sosActive } = useSafety();

  const items = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Routes', path: '/map', icon: MapPin },
    { name: 'Report', path: '/report', icon: AlertTriangle },
    { name: 'WeSafe AI', path: '/ai-assistant', icon: Bot },
    { name: 'Circle', path: '/contacts', icon: Users }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-dust-grey/60 dark:border-smoky-rose/30 shadow-[0_-8px_20px_rgba(109,46,70,0.08)] px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around">
        {items.slice(0, 2).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-semibold transition-all ${
                  isActive ? 'text-wine-plum dark:text-bone font-bold' : 'text-dust-grey-dark dark:text-silver hover:text-wine-plum'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        {/* Center Floating SOS Button */}
        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={onOpenSOS}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-extrabold shadow-lg transition-transform active:scale-95 ${
              sosActive
                ? 'bg-emergency animate-pulse ring-4 ring-rose-300'
                : 'bg-gradient-to-tr from-rose-700 to-rose-600 shadow-rose-900/40 hover:scale-105'
            }`}
            aria-label="Open emergency SOS trigger"
          >
            <ShieldAlert className="w-7 h-7" />
          </button>
          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 mt-1">SOS</span>
        </div>

        {items.slice(2).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-semibold transition-all ${
                  isActive ? 'text-wine-plum dark:text-bone font-bold' : 'text-dust-grey-dark dark:text-silver hover:text-wine-plum'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
