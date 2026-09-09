import React, { useEffect, useRef, useState } from 'react';
import { Map as MapLibreMap, NavigationControl, Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ShieldCheck, AlertTriangle, Lightbulb, Eye, VideoOff, Footprints, ShieldAlert, MapPin, Building2, Sparkles } from 'lucide-react';
import { INCIDENT_CATEGORIES, SAFE_HAVENS } from '../../data/mockData';

export const SafetyMap = ({
  incidents = [],
  safeHavens = SAFE_HAVENS,
  selectedRoute = null,
  center = [77.391029, 28.535517], // [lng, lat]
  zoom = 13.5,
  height = 'h-[550px]',
  className = '',
  onSelectIncident = null
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSafeHavens, setShowSafeHavens] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const style = {
      version: 8,
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors'
        }
      },
      layers: [
        {
          id: 'osm-tiles-layer',
          type: 'raster',
          source: 'osm-tiles',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    };

    let initialCenter = [77.391029, 28.535517];
    if (Array.isArray(center) && center.length === 2) {
      const [first, second] = center;
      if (Math.abs(first) <= 90 && Math.abs(second) > 90) {
        initialCenter = [second, first];
      } else if (Math.abs(first) <= 180 && Math.abs(second) <= 90) {
        initialCenter = [first, second];
      }
    }

    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: style,
      center: initialCenter,
      zoom: zoom
    });

    map.addControl(new NavigationControl({ showCompass: true, showZoom: true }), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Markers & Route Overlay
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Filter incidents
    const filteredIncidents = incidents.filter(inc => {
      if (activeFilter === 'all') return true;
      return inc.category === activeFilter;
    });

    // Add Incident Markers
    filteredIncidents.forEach(inc => {
      const el = document.createElement('div');
      el.className = 'w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg transform hover:scale-125 transition-transform duration-200';
      el.style.backgroundColor = inc.severity === 'Critical' ? '#b91c1c' : inc.severity === 'High' ? '#a26769' : '#6d2e46';
      el.style.border = '2.5px solid #ece2d0';
      el.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ece2d0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      `;

      const popupContent = `
        <div class="p-2 font-sans max-w-[220px]">
          <div class="flex items-center gap-1 mb-1">
            <span class="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">${inc.severity || 'Medium'}</span>
            <span class="text-[11px] font-semibold text-slate-500">${inc.category}</span>
          </div>
          <h4 class="font-bold text-xs text-slate-900 mb-1">${inc.title}</h4>
          <p class="text-[11px] text-slate-600 line-clamp-2">${inc.description}</p>
          <div class="mt-2 pt-1 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
            <span>${inc.address || 'Reported Location'}</span>
            <span class="text-emerald-700 font-bold">${inc.status || 'Verified'}</span>
          </div>
        </div>
      `;

      const popup = new Popup({ offset: 25, closeButton: false }).setHTML(popupContent);
      const marker = new Marker({ element: el })
        .setLngLat([inc.longitude, inc.latitude])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener('click', () => {
        if (onSelectIncident) onSelectIncident(inc);
      });

      markersRef.current.push(marker);
    });

    // Add Safe Havens
    if (showSafeHavens && safeHavens) {
      safeHavens.forEach(haven => {
        const el = document.createElement('div');
        el.className = 'w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center cursor-pointer shadow-md border-2 border-white hover:scale-125 transition-transform';
        el.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        `;

        const popup = new Popup({ offset: 20, closeButton: false }).setHTML(`
          <div class="p-2 font-sans">
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Verified Safe Haven</span>
            <h4 class="font-bold text-xs text-slate-900 mt-1">${haven.name}</h4>
            <p class="text-[11px] text-slate-500">${haven.type}</p>
            <p class="text-[10px] text-emerald-700 font-semibold mt-1">📞 ${haven.phone}</p>
          </div>
        `);

        const marker = new Marker({ element: el })
          .setLngLat([haven.longitude, haven.latitude])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }

  }, [incidents, safeHavens, activeFilter, showSafeHavens]);

  const handleLocateMe = () => {
    if (navigator.geolocation && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          mapRef.current.flyTo({
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 15,
            essential: true
          });
        },
        (err) => console.log('Geolocation error:', err)
      );
    }
  };

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden shadow-warm-md border border-dust-grey/60 dark:border-smoky-rose/30 bg-parchment dark:bg-wine-plum/40 ${height} ${className}`}>
      {/* Map Control Bar Overlay */}
      <div className="absolute top-3 left-3 right-16 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        {/* Category Filters */}
        <div className="glass-card-subtle px-3 py-1.5 rounded-2xl flex items-center gap-2 overflow-x-auto max-w-full backdrop-blur-md shadow-sm">
          <button
            onClick={() => setActiveFilter('all')}
            className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-wine-plum text-bone shadow-sm'
                : 'text-wine-plum dark:text-bone hover:bg-powder-petal/50'
            }`}
          >
            All Hazards
          </button>
          {INCIDENT_CATEGORIES.slice(0, 4).map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`text-xs px-2.5 py-1 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeFilter === cat.id
                  ? 'bg-wine-plum text-bone shadow-sm'
                  : 'text-wine-plum dark:text-silver hover:bg-powder-petal/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Safe Haven Toggle */}
        <button
          onClick={() => setShowSafeHavens(!showSafeHavens)}
          className={`glass-card-subtle px-3 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
            showSafeHavens
              ? 'border-emerald-500/60 text-emerald-800 dark:text-emerald-300'
              : 'text-slate-500 opacity-75'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Safe Havens ({showSafeHavens ? 'ON' : 'OFF'})
        </button>

        {/* Locate Me */}
        <button
          onClick={handleLocateMe}
          className="glass-card-subtle px-3 py-1.5 rounded-2xl text-xs font-semibold text-wine-plum dark:text-bone hover:bg-powder-petal/60 flex items-center gap-1.5 transition-all shadow-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-accent" />
          GPS Center
        </button>
      </div>

      {/* Mapbox/MapLibre Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
