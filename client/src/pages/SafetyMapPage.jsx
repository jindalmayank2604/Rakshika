import React, { useState } from 'react';
import { SafetyMap } from '../components/maps/SafetyMap';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useSafety } from '../context/SafetyContext';
import { INCIDENT_CATEGORIES } from '../data/mockData';
import { AlertTriangle, Plus, Filter, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SafetyMapPage = () => {
  const { reports, currentLocation } = useSafety();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Surroundings Awareness
            </span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
              Live Map
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Community Safety Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time verified reports, poorly lit corridors, and observed hazards around you.
          </p>
        </div>

        <Link to="/report">
          <Button variant="primary" icon={Plus} size="md">
            Report an Incident
          </Button>
        </Link>
      </div>

      {/* Main Map View */}
      <SafetyMap reports={reports} center={[currentLocation.lat, currentLocation.lng]} height="h-[600px]" />

      {/* Map Legend & Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {INCIDENT_CATEGORIES.map((cat) => {
          const count = reports.filter(r => r.category === cat.id).length;
          return (
            <GlassCard key={cat.id} className="p-3.5 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-xs font-bold text-slate-900">{cat.name}</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500">{count} Active Pins</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
