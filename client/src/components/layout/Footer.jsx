import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Shield3D } from '../ui/Illustrations3D';

export const Footer = () => {
  return (
    <footer className="bg-wine-plum text-bone pt-16 pb-12 border-t border-smoky-rose/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield3D className="w-10 h-10" glow={false} />
              <span className="text-xl font-extrabold text-bone tracking-tight">WeSafe</span>
            </div>
            <p className="text-sm text-silver leading-relaxed">
              Protect. Prevent. Empower. Smart community safety platform combining local hazard reports, location intelligence, and Gemini AI for proactive journey confidence.
            </p>
            <p className="text-xs text-silver/80">
              *AI-powered safety companion & community reporting platform.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-bone uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-silver">
              <li><Link to="/map" className="hover:text-bone transition-colors">Safer Route Planner</Link></li>
              <li><Link to="/map" className="hover:text-bone transition-colors">Community Hazard Map</Link></li>
              <li><Link to="/report" className="hover:text-bone transition-colors">Report an Incident</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-bone transition-colors">WeSafe Gemini AI</Link></li>
              <li><Link to="/contacts" className="hover:text-bone transition-colors">Emergency Circle</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-bone uppercase tracking-wider mb-4">Emergency Helplines</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-rose-300 font-semibold">
                <Phone className="w-4 h-4" />
                <span>National Emergency: 112</span>
              </li>
              <li className="flex items-center gap-2 text-rose-300 font-semibold">
                <Phone className="w-4 h-4" />
                <span>Women Helpline: 1091</span>
              </li>
              <li className="flex items-center gap-2 text-rose-300 font-semibold">
                <Phone className="w-4 h-4" />
                <span>NCW Helpline: 7827170170</span>
              </li>
              <li><Link to="/settings" className="hover:text-bone text-silver transition-colors">Privacy & Safety Policy</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-bold text-bone uppercase tracking-wider mb-4">Community Mission</h4>
            <p className="text-sm text-silver mb-4 leading-relaxed">
              Built to shift safety from reactive panic to proactive prevention, helping everyone make informed journey decisions.
            </p>
            <div className="flex items-center gap-2 text-xs text-silver">
              <span>Made with care</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>for communities everywhere</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-smoky-rose/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver/80">
          <p>© {new Date().getFullYear()} WeSafe Community Safety Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/settings" className="hover:text-bone transition-colors">Privacy Policy</Link>
            <Link to="/settings" className="hover:text-bone transition-colors">Terms of Service</Link>
            <Link to="/settings" className="hover:text-bone transition-colors">Security Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
