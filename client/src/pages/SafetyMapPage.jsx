import React, { useState } from 'react';
import { SafetyMap } from '../components/maps/SafetyMap';
import { SaferRoutePlanner } from '../components/maps/SaferRoutePlanner';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useSafety } from '../context/SafetyContext';
import { INCIDENT_CATEGORIES, SAFE_HAVENS } from '../data/mockData';
import { AlertTriangle, Plus, Navigation, Map as MapIcon, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeRoute3D, Shield3D } from '../components/ui/Illustrations3D';

export const SafetyMapPage = () => {
  const { reports, currentLocation } = useSafety();
  const [activeTab, setActiveTab] = useState('routes'); // 'map' or 'routes'
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
              Location Intelligence
            </span>
            <span className="text-[10px] bg-powder-petal/70 dark:bg-smoky-rose/30 text-wine-plum dark:text-bone font-bold px-2 py-0.5 rounded-full border border-dust-grey/50">
              Live Safe Map & AI Routing
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight flex items-center gap-2.5">
            WeSafe Location Hub
          </h2>
          <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
            Explore verified community hazards, discover verified safe havens, and calculate safer routes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/report">
            <Button variant="primary" icon={Plus} size="md">
              Report Hazard
            </Button>
          </Link>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-card border border-dust-grey/60 dark:border-smoky-rose/30 max-w-md">
        <button
          onClick={() => setActiveTab('routes')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'routes'
              ? 'bg-wine-plum text-bone shadow-md'
              : 'text-wine-plum dark:text-silver hover:bg-powder-petal/50'
          }`}
        >
          <Navigation className="w-4 h-4 text-accent" />
          Safer Route Planner
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'map'
              ? 'bg-wine-plum text-bone shadow-md'
              : 'text-wine-plum dark:text-silver hover:bg-powder-petal/50'
          }`}
        >
          <MapIcon className="w-4 h-4 text-accent" />
          Hazard Map Explorer
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'routes' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <SaferRoutePlanner onSelectRoute={(route) => setSelectedRoute(route)} />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-6">
              <SafetyMap
                incidents={reports}
                safeHavens={SAFE_HAVENS}
                selectedRoute={selectedRoute}
                center={[currentLocation?.lng || 77.391, currentLocation?.lat || 28.535]}
                height="h-[580px]"
              />
              <div className="mt-3 text-center text-xs text-dust-grey-dark dark:text-silver">
                Visualizing verified hazard reports and community safe havens along navigation corridor.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <SafetyMap
            incidents={reports}
            safeHavens={SAFE_HAVENS}
            center={[currentLocation?.lng || 77.391, currentLocation?.lat || 28.535]}
            height="h-[600px]"
          />

          {/* Map Legend & Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INCIDENT_CATEGORIES.map((cat) => {
              const count = reports.filter(r => r.category === cat.id).length;
              return (
                <GlassCard key={cat.id} className="p-3.5 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs font-bold text-wine-plum dark:text-bone">{cat.name}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-dust-grey-dark dark:text-silver">{count} Active Pins</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
