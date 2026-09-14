import React, { useState } from 'react';
import { ArrowRight, MapPin, Route, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

const ROUTE_OPTIONS = [
  { id: 'well-lit', name: 'Well-lit streets', detail: 'Prioritizes busier streets and lighting coverage.', duration: '18 min', distance: '1.4 km' },
  { id: 'community', name: 'Community-aware route', detail: 'Avoids areas with recent community reports where possible.', duration: '21 min', distance: '1.7 km' },
];

export const SaferRoutePlanner = ({ onSelectRoute }) => {
  const [destination, setDestination] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectRoute = async (route) => {
    setSelectedId(route.id);
    let destCoords = null;

    if (destination.trim()) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination.trim())}&limit=1`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            destCoords = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
          }
        }
      } catch (err) {
        console.warn('Destination geocode note:', err);
      }
    }

    onSelectRoute?.({
      ...route,
      destination: destination.trim() || 'Selected destination',
      destinationCoords: destCoords
    });
  };

  return (
    <GlassCard className="p-5 sm:p-6 space-y-5">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-powder-petal p-2.5 text-wine-plum dark:bg-smoky-rose/40 dark:text-bone">
          <Route className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-wine-plum dark:text-bone">Plan with awareness</h3>
          <p className="mt-1 text-xs text-dust-grey-dark dark:text-silver">
            Review options based on available community information—not a safety guarantee.
          </p>
        </div>
      </div>

      <label className="block text-xs font-bold text-wine-plum dark:text-bone" htmlFor="route-destination">
        Destination
      </label>

      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-accent" />
        <input
          id="route-destination"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Enter a destination or landmark..."
          className="glass-input w-full rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold"
        />
      </div>

      <div className="space-y-3">
        {ROUTE_OPTIONS.map((route) => (
          <button
            key={route.id}
            type="button"
            onClick={() => handleSelectRoute(route)}
            className={`w-full rounded-2xl border p-4 text-left transition-all ${
              selectedId === route.id
                ? 'border-wine-plum bg-powder-petal/80 dark:border-bone dark:bg-smoky-rose/50 shadow-md ring-2 ring-accent/40'
                : 'border-dust-grey/60 hover:border-dusty-rose dark:border-smoky-rose/30 hover:bg-powder-petal/30 dark:hover:bg-wine-plum/40'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-wine-plum dark:text-bone">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {route.name}
                </p>
                <p className="mt-1 text-xs text-dust-grey-dark dark:text-silver">{route.detail}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-accent flex-shrink-0" />
            </div>
            <p className="mt-3 text-xs font-bold text-wine-plum dark:text-bone">{route.duration} · {route.distance}</p>
          </button>
        ))}
      </div>

      <Button
        variant="primary"
        className="w-full justify-center shadow-md font-bold"
        onClick={() => handleSelectRoute(ROUTE_OPTIONS.find((r) => r.id === selectedId) || ROUTE_OPTIONS[0])}
      >
        Show selected option on map
      </Button>
    </GlassCard>
  );
};
