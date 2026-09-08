import React from 'react';
import { Shield, Heart, ExternalLink, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Rakshika</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Smart safety for every journey. Empowering women with community awareness, proactive incident reporting, and 24/7 AI-guided protection.
            </p>
            <p className="text-xs text-slate-500">
              *Prototype application designed for empowerment & community safety awareness.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/map" className="hover:text-primary-400 transition-colors">Community Safety Map</Link></li>
              <li><Link to="/report" className="hover:text-primary-400 transition-colors">Report an Incident</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-primary-400 transition-colors">Rakshika AI Assistant</Link></li>
              <li><Link to="/contacts" className="hover:text-primary-400 transition-colors">Emergency Circle</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Emergency Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-rose-400 font-semibold">
                <Phone className="w-4 h-4" />
                <span>National Emergency: 112</span>
              </li>
              <li className="flex items-center gap-2 text-pink-400 font-semibold">
                <Phone className="w-4 h-4" />
                <span>Women Helpline: 1091</span>
              </li>
              <li className="flex items-center gap-2 text-amber-400 font-semibold">
                <Phone className="w-4 h-4" />
                <span>NCW Helpline: 7827170170</span>
              </li>
              <li><Link to="/settings" className="hover:text-primary-400 transition-colors">Privacy & Safety Policy</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Empowerment</h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Built with purpose to make streets safer, commute confident, and voices heard.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for women everywhere</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Rakshika Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/settings" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/settings" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/settings" className="hover:text-slate-400 transition-colors">Security Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
