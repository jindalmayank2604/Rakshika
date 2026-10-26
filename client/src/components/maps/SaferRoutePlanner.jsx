import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Route, ShieldCheck, AlertTriangle, Sparkles, Loader2, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { useSafety } from '../../context/SafetyContext';
import { SAFE_HAVENS } from '../../data/mockData';
import { computeDijkstraSafetyRoutes } from '../../services/dijkstraRouting';

export const SaferRoutePlanner = ({ onSelectRoute }) => {
  const { reports, currentLocation } = useSafety();
  const [destination, setDestination] = useState('');
  const [selectedId, setSelectedId] = useState('dijkstra-safe');
  const [isCalculating, setIsCalculating] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [showFormula, setShowFormula] = useState(false);

  // Default start location (user's live location or default community center)
  const startCoords = [
    currentLocation?.lng || 77.391029,
    currentLocation?.lat || 28.535517
  ];

  // Compute routes using Modified Dijkstra algorithm
  const calculateRoutes = async (destText = destination) => {
    setIsCalculating(true);
    let destCoords = null;

    if (destText && destText.trim()) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            destText.trim()
          )}&limit=1`
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            destCoords = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
          }
        }
      } catch (err) {
        console.warn('Geocoding notice:', err);
      }
    }

    // Default nearby target coordinate if no text entered yet
    if (!destCoords) {
      destCoords = [startCoords[0] + 0.018, startCoords[1] + 0.015];
    }

    try {
      // Execute Modified Dijkstra algorithm incorporating Safety Index weight
      const { safestRoute, shortestRoute } = await computeDijkstraSafetyRoutes(
        startCoords,
        destCoords,
        reports,
        SAFE_HAVENS
      );

      const computed = [safestRoute, shortestRoute];
      setRoutes(computed);

      const active = computed.find(r => r.id === selectedId) || computed[0];
      setSelectedId(active.id);

      onSelectRoute?.({
        ...active,
        destination: destText.trim() || 'Selected Destination Corridor',
        destinationCoords: destCoords
      });
    } catch (error) {
      console.error('Dijkstra calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Recalculate routes whenever community reports or start location changes
  useEffect(() => {
    calculateRoutes();
  }, [reports.length]);

  const handleSelectRoute = (route) => {
    setSelectedId(route.id);
    onSelectRoute?.({
      ...route,
      destination: destination.trim() || 'Selected Destination Corridor',
      destinationCoords: route.coordinates ? route.coordinates[route.coordinates.length - 1] : null
    });
  };

  return (
    <GlassCard className="p-5 sm:p-6 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-powder-petal p-2.5 text-wine-plum dark:bg-smoky-rose/40 dark:text-bone shadow-sm">
            <Route className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-wine-plum dark:text-bone text-base">
                Dijkstra Safety Route Engine
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                Live Algorithm
              </span>
            </div>
            <p className="mt-1 text-xs text-dust-grey-dark dark:text-silver">
              Modified Dijkstra pathfinding incorporating community hazard reports and lighting safety indices.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowFormula(!showFormula)}
          className="text-dust-grey-dark dark:text-silver hover:text-wine-plum p-1.5 rounded-xl hover:bg-powder-petal/50 transition-colors"
          title="Inspect Algorithm Weight Formula"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Formula Explainer Modal / Callout */}
      {showFormula && (
        <div className="p-3.5 rounded-xl bg-powder-petal/80 dark:bg-wine-plum/80 border border-dust-grey/60 text-xs text-wine-plum dark:text-bone space-y-1.5 transition-all">
          <p className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" /> Modified Dijkstra Weight Formula:
          </p>
          <p className="font-mono text-[11px] bg-white/70 dark:bg-black/30 p-2 rounded-lg border border-dust-grey/40">
            Cost(u, v) = Distance(u, v) × [1 + α × ((100 - SafetyIndex(u, v)) / 100)]
          </p>
          <p className="text-[11px] text-dust-grey-dark dark:text-silver">
            Where <span className="font-bold">SafetyIndex</span> decreases with proximity to unresolved community reports and increases near verified safe havens. High-risk zones incur heavy path penalties, guiding the algorithm to safe detours.
          </p>
        </div>
      )}

      {/* Destination Input Field */}
      <div>
        <label className="block text-xs font-bold text-wine-plum dark:text-bone mb-1.5" htmlFor="route-destination">
          Destination or Landmark
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-accent" />
            <input
              id="route-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') calculateRoutes(e.target.value);
              }}
              placeholder="e.g. Sector 17 Plaza, Metro Station, University..."
              className="glass-input w-full rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => calculateRoutes(destination)}
            loading={isCalculating}
            className="px-4 text-xs font-bold"
          >
            Calculate
          </Button>
        </div>
      </div>

      {/* Computed Route Options */}
      <div className="space-y-3">
        {isCalculating && routes.length === 0 ? (
          <div className="py-8 text-center text-xs text-dust-grey-dark dark:text-silver flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-accent" />
            <span>Calculating Dijkstra optimal paths and evaluating segment safety...</span>
          </div>
        ) : (
          routes.map((route) => {
            const isSelected = selectedId === route.id;
            const isSafe = route.id === 'dijkstra-safe';

            return (
              <button
                key={route.id}
                type="button"
                onClick={() => handleSelectRoute(route)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? isSafe
                      ? 'border-emerald-600 bg-emerald-50/80 dark:border-emerald-500 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/30'
                      : 'border-rose-600 bg-rose-50/80 dark:border-rose-500 dark:bg-rose-950/40 shadow-md ring-2 ring-rose-500/30'
                    : 'border-dust-grey/60 hover:border-dusty-rose dark:border-smoky-rose/30 hover:bg-powder-petal/30 dark:hover:bg-wine-plum/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 text-sm font-bold ${isSafe ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
                        {isSafe ? (
                          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                        )}
                        {route.name}
                      </span>
                      {route.isRecommended && (
                        <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-dust-grey-dark dark:text-silver leading-relaxed">
                      {route.detail}
                    </p>
                  </div>

                  {/* Safety Score Pill */}
                  <div className="text-right flex-shrink-0">
                    <div className={`px-2.5 py-1 rounded-xl font-black text-xs inline-block border ${
                      route.safetyScore >= 85
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                        : route.safetyScore >= 70
                        ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      Safety: {route.safetyScore}%
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-dust-grey/40 dark:border-smoky-rose/20 flex items-center justify-between text-xs font-bold text-wine-plum dark:text-bone">
                  <div className="flex items-center gap-3">
                    <span>⏱️ {route.duration}</span>
                    <span>•</span>
                    <span>📍 {route.distance}</span>
                    <span>•</span>
                    <span className="text-[11px] font-normal text-dust-grey-dark dark:text-silver">
                      {isSafe ? 'Bypasses hazard zones' : `${route.hazardsNear || 1} near hazards`}
                    </span>
                  </div>
                  <ArrowRight className={`h-4 w-4 transition-transform ${isSelected ? 'translate-x-1 text-accent' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })
        )}
      </div>

      <Button
        variant="primary"
        className="w-full justify-center shadow-md font-bold py-3"
        onClick={() => {
          const active = routes.find((r) => r.id === selectedId) || routes[0];
          if (active) handleSelectRoute(active);
        }}
      >
        Show Selected Dijkstra Route on Map
      </Button>
    </GlassCard>
  );
};
