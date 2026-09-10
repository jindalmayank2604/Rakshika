import React from 'react';
import { Bot, MapPinned, Route, ShieldCheck, UsersRound } from 'lucide-react';

const IllustrationFrame = ({ children, className = '', glow = true }) => (
  <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-200 via-linen to-dusty-rose/70 text-wine-plum shadow-lg ${glow ? 'shadow-rose-900/15' : ''} ${className}`}>
    {children}
  </div>
);

export const Shield3D = ({ className, glow }) => <IllustrationFrame className={className} glow={glow}><ShieldCheck className="h-3/5 w-3/5" /></IllustrationFrame>;
export const AiCompanion3D = ({ className }) => <IllustrationFrame className={className}><Bot className="h-3/5 w-3/5" /></IllustrationFrame>;
export const CommunityReport3D = ({ className }) => <IllustrationFrame className={className}><UsersRound className="h-3/5 w-3/5" /></IllustrationFrame>;
export const SafeRoute3D = ({ className }) => <IllustrationFrame className={className}><Route className="h-3/5 w-3/5" /></IllustrationFrame>;
export const MapSafety3D = ({ className }) => <IllustrationFrame className={className}><MapPinned className="h-3/5 w-3/5" /></IllustrationFrame>;
