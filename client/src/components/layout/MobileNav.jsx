import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, AlertTriangle, Bot, Users } from 'lucide-react';

export const MobileNav = () => {
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
        {items.map((item) => {
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
