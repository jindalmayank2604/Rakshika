import React, { useState } from 'react';
import { 
  Navigation, ShieldCheck, AlertTriangle, Lightbulb, 
  Clock, MapPin, Eye, Compass, ChevronRight, CheckCircle2,
  Share2, ShieldAlert, Sparkles, Building2, Flame
} from 'lucide-react';
import { SafeRoute3D, Shield3D } from '../ui/Illustrations3D';
import { useNotification } from '../../context/NotificationContext';

export const PRESET_LOCATIONS = [
  { name: 'City Central Metro Station', lat: 28.6139, lng: 77.2090, type: 'transit' },
  { name: 'North Tech Innovation Hub', lat: 28.6304, lng: 77.2177, type: 'office' },
  { name: 'Greenwood University Campus', lat: 28.5823, lng: 77.2345, type: 'education' },
  { name: 'Apex General 24/7 Hospital', lat: 28.6012, lng: 77.1950, type: 'safehaven' },
  { name: 'South Garden Residential Park', lat: 28.5689, lng: 77.2054, type: 'residence' },
];

export const MOCK_ROUTES = [
  {
    id: 'safest',
    title: 'WeSafe Recommended Safe Corridor',
    isRecommended: true,
    safetyScore: 94,
    distance: '4.8 km',
    duration: '16 mins',
    walkingTime: '42 mins',
    lightingScore: 96,
    cctvCoverage: '91%',
    policeBooths: 3,
    openSafeHavens: 6,
    hazardsAvoided: 3,
    tag: 'Highest Visibility & Police Presence',
    color: '#2b7a78',
    checkpoints: [
      { name: 'Grand Boulevard (100% Street Lighted)', safe: true, type: 'light' },
      { name: 'Metro Police Booth Station #4', safe: true, type: 'police' },
      { name: '24/7 MedPlus Safe Haven Partner', safe: true, type: 'store' },
      { name: 'CCTV Monitored Transit Plaza', safe: true, type: 'cctv' }
    ],
    pathCoordinates: [
      [28.6139, 77.2090],
      [28.6185, 77.2120],
      [28.6230, 77.2155],
      [28.6304, 77.2177]
    ]
  },
  {
    id: 'fastest',
    title: 'Shortest Cut (Through Alleyways)',
    isRecommended: false,
    safetyScore: 58,
    distance: '4.1 km',
    duration: '12 mins',
    walkingTime: '34 mins',
    lightingScore: 42,
    cctvCoverage: '28%',
    policeBooths: 0,
    openSafeHavens: 1,
    hazardsAvoided: 0,
    tag: '2 Active Community Hazard Reports (Poor Lighting)',
    color: '#a26769',
    checkpoints: [
      { name: 'Rear Industrial Service Lane', safe: false, type: 'hazard', note: 'Reported 3 hrs ago: Broken Streetlights' },
      { name: 'Unpaved Canal Passage', safe: false, type: 'hazard', note: 'Isolated section, no CCTV' },
      { name: 'Commercial Square East', safe: true, type: 'cctv' }
    ],
    pathCoordinates: [
      [28.6139, 77.2090],
      [28.6210, 77.2085],
      [28.6270, 77.2110],
      [28.6304, 77.2177]
    ]
  }
];

export const SaferRoutePlanner = ({ onSelectRoute }) => {
  const { addNotification } = useNotification();
  const [origin, setOrigin] = useState(PRESET_LOCATIONS[0].name);
  const [destination, setDestination] = useState(PRESET_LOCATIONS[1].name);
  const [selectedRouteId, setSelectedRouteId] = useState('safest');
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const selectedRoute = MOCK_ROUTES.find(r => r.id === selectedRouteId) || MOCK_ROUTES[0];

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setActiveStep(0);
    addNotification({
      type: 'safety',
      title: 'Safe Journey Tracking Active',
      message: `Navigating via ${selectedRoute.title}. Your emergency contacts will receive your live GPS path if triggered.`
    });
    if (onSelectRoute) {
      onSelectRoute(selectedRoute);
    }
  };

  const handleShareRoute = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addNotification({
      type: 'info',
      title: 'Route Shared',
      message: 'Secure live journey tracking link copied to clipboard.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Route Selector Header Card */}
      <div className="glass-card rounded-2xl p-5 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <SafeRoute3D className="w-12 h-12" />
            <div>
              <h2 className="text-lg font-bold text-wine-plum dark:text-bone flex items-center gap-2">
                AI Safer Route Recommendation
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-wine-plum dark:text-almond-dark font-medium border border-accent/20">
                  Proactive AI
                </span>
              </h2>
              <p className="text-xs text-dust-grey-dark dark:text-silver">
                Calculates well-lit corridors, avoids unverified hazard clusters, and prioritizes CCTV/police presence.
              </p>
            </div>
          </div>
        </div>

        {/* Origin / Destination Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="relative">
            <label className="text-xs font-semibold text-wine-plum dark:text-silver uppercase tracking-wider mb-1 block">
              Origin / Current Location
            </label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3 w-4 h-4 text-accent" />
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm glass-input font-medium cursor-pointer"
              >
                {PRESET_LOCATIONS.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="text-xs font-semibold text-wine-plum dark:text-silver uppercase tracking-wider mb-1 block">
              Destination Safe Haven / Target
            </label>
            <div className="relative flex items-center">
              <Navigation className="absolute left-3 w-4 h-4 text-wine-plum dark:text-bone" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm glass-input font-medium cursor-pointer"
              >
                {PRESET_LOCATIONS.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: Safest vs Fastest Routes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_ROUTES.map((route) => {
          const isSelected = selectedRouteId === route.id;
          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`cursor-pointer rounded-2xl p-5 transition-all relative border ${
                isSelected
                  ? 'border-wine-plum dark:border-bone bg-linen/90 dark:bg-wine-plum/80 shadow-warm-lg ring-2 ring-wine-plum/30'
                  : 'glass-card border-dust-grey/50 dark:border-smoky-rose/20 hover:border-accent/40 opacity-90'
              }`}
            >
              {route.isRecommended && (
                <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-wine-plum to-smoky-rose text-bone text-xs font-bold shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-almond-silk" />
                  WeSafe Best Safe Route
                </span>
              )}

              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-wine-plum dark:text-bone flex items-center gap-2">
                    {route.title}
                  </h3>
                  <span className="text-xs text-dust-grey-dark dark:text-silver font-medium">
                    {route.tag}
                  </span>
                </div>
                {/* Safety Score Radial Badge */}
                <div className={`px-3 py-1.5 rounded-xl text-center font-bold text-xs ${
                  route.safetyScore >= 80
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/40'
                }`}>
                  <div className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Safety Index</div>
                  <div className="text-sm font-extrabold">{route.safetyScore}/100</div>
                </div>
              </div>

              {/* Key Route Stats */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-dust-grey/40 dark:border-smoky-rose/30 my-3 text-center">
                <div>
                  <div className="text-[11px] text-dust-grey-dark dark:text-silver font-medium">Distance</div>
                  <div className="text-sm font-bold text-wine-plum dark:text-bone">{route.distance}</div>
                </div>
                <div>
                  <div className="text-[11px] text-dust-grey-dark dark:text-silver font-medium">Drive Time</div>
                  <div className="text-sm font-bold text-wine-plum dark:text-bone">{route.duration}</div>
                </div>
                <div>
                  <div className="text-[11px] text-dust-grey-dark dark:text-silver font-medium">Lighting</div>
                  <div className="text-sm font-bold text-wine-plum dark:text-bone">{route.lightingScore}%</div>
                </div>
              </div>

              {/* Safety Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-powder-petal/50 dark:bg-smoky-rose/20 text-wine-plum dark:text-bone font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  {route.policeBooths} Police Booths
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-powder-petal/50 dark:bg-smoky-rose/20 text-wine-plum dark:text-bone font-medium">
                  <Eye className="w-3.5 h-3.5 text-accent" />
                  {route.cctvCoverage} CCTV
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-powder-petal/50 dark:bg-smoky-rose/20 text-wine-plum dark:text-bone font-medium">
                  <Building2 className="w-3.5 h-3.5 text-accent" />
                  {route.openSafeHavens} Safe Havens
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Route Waypoint Breakdown & Navigation Execution */}
      <div className="glass-card rounded-2xl p-5 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-dust-grey/40 dark:border-smoky-rose/20">
          <div>
            <h4 className="font-bold text-wine-plum dark:text-bone flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent" />
              Route Safety Highlights & Verified Checkpoints
            </h4>
            <p className="text-xs text-dust-grey-dark dark:text-silver">
              Corridor passes verified community-safe spots with high illumination.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareRoute}
              className="px-3 py-2 rounded-xl text-xs font-semibold border border-dust-grey/80 dark:border-smoky-rose/40 text-wine-plum dark:text-bone hover:bg-powder-petal/40 dark:hover:bg-smoky-rose/30 transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Live Path
            </button>
            <button
              onClick={handleStartNavigation}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-wine-plum to-smoky-rose text-bone hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              {isNavigating ? 'Recalculate Path' : 'Start Safe Navigation'}
            </button>
          </div>
        </div>

        {/* Checkpoint list */}
        <div className="space-y-3">
          {selectedRoute.checkpoints.map((cp, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl flex items-center justify-between border ${
                cp.safe
                  ? 'bg-parchment/60 dark:bg-wine-plum/30 border-dust-grey/40 dark:border-smoky-rose/20'
                  : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  cp.safe
                    ? 'bg-wine-plum/10 text-wine-plum dark:bg-smoky-rose/20 dark:text-bone'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-200'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold text-wine-plum dark:text-bone flex items-center gap-2">
                    {cp.name}
                    {cp.safe ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  {cp.note && (
                    <div className="text-xs text-rose-600 dark:text-rose-300 font-medium">
                      {cp.note}
                    </div>
                  )}
                </div>
              </div>

              <span className="text-xs px-2 py-0.5 rounded-md font-medium capitalize bg-linen dark:bg-wine-plum/70 text-wine-plum dark:text-silver border border-dust-grey/40 dark:border-smoky-rose/30">
                {cp.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
