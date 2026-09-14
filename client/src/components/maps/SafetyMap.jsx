import React, { useEffect, useRef, useState } from 'react';
import { Map as MapLibreMap, NavigationControl, Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ShieldCheck, AlertTriangle, MapPin, Search, Crosshair, X, Loader2, Box, Navigation, Play, Square } from 'lucide-react';
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
  const searchContainerRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);
  const searchMarkerRef = useRef(null);
  const watchIdRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [showSafeHavens, setShowSafeHavens] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [is3D, setIs3D] = useState(false);

  // Persistent route state so location watchPosition updates don't erase the path!
  const [activeRouteData, setActiveRouteData] = useState(null);
  // Turn-by-Turn Live Navigation State
  const [isNavigating, setIsNavigating] = useState(false);

  // Sync prop changes to activeRouteData
  useEffect(() => {
    if (selectedRoute) {
      setActiveRouteData(selectedRoute);
    }
  }, [selectedRoute]);

  // Click Outside & Escape Key handler for Search Dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize MapLibre with OpenStreetMap tiles (No API key watermarks)
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
      zoom: zoom,
      pitch: is3D ? 55 : 0,
      bearing: is3D ? -20 : 0
    });

    map.addControl(new NavigationControl({ showCompass: true, showZoom: true }), 'top-right');
    mapRef.current = map;

    // Real-Time Location Tracking via watchPosition
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };

      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = [pos.coords.longitude, pos.coords.latitude];
          setUserLocation(coords);

          // Update user marker position without recreating map instance
          if (!userMarkerRef.current && mapRef.current) {
            const userEl = document.createElement('div');
            userEl.style.width = '24px';
            userEl.style.height = '24px';
            userEl.style.position = 'relative';
            userEl.className = 'flex items-center justify-center rounded-full pointer-events-none';
            userEl.innerHTML = `
              <div class="absolute inset-0 rounded-full bg-rose-500/40 animate-ping pointer-events-none"></div>
              <div class="relative w-4 h-4 rounded-full bg-accent border-2 border-white shadow-lg flex items-center justify-center z-10">
                <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            `;
            userMarkerRef.current = new Marker({ element: userEl, anchor: 'center' })
              .setLngLat(coords)
              .addTo(mapRef.current);
          } else if (userMarkerRef.current) {
            userMarkerRef.current.setLngLat(coords);
          }
        },
        (err) => {
          console.warn('Geolocation watch notice:', err.message);
        },
        options
      );
    }

    return () => {
      if (watchIdRef.current !== null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      if (searchMarkerRef.current) {
        searchMarkerRef.current.remove();
        searchMarkerRef.current = null;
      }
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 3D View Toggle Control
  const toggle3DView = () => {
    if (!mapRef.current) return;
    const nextState = !is3D;
    setIs3D(nextState);

    mapRef.current.easeTo({
      pitch: nextState ? 55 : 0,
      bearing: nextState ? -20 : 0,
      duration: 1000
    });
  };

  // OSRM Real Road Routing logic — persisted via activeRouteData
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const drawRoute = async () => {
      if (!activeRouteData) {
        if (map.getSource('safer-route')) {
          if (map.getLayer('safer-route-glow')) map.removeLayer('safer-route-glow');
          if (map.getLayer('safer-route-line')) map.removeLayer('safer-route-line');
          map.removeSource('safer-route');
        }
        return;
      }

      const start = userLocation || center || [77.391029, 28.535517];
      let end = [start[0] + 0.018, start[1] + 0.015];
      if (activeRouteData.destinationCoords) {
        end = activeRouteData.destinationCoords;
      }

      let routeCoords = [];
      let calculatedDist = null;
      let calculatedDur = null;

      // Fetch Real Road Network Geometry via OSRM Public API
      try {
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;
        const res = await fetch(osrmUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.routes && data.routes.length > 0) {
            routeCoords = data.routes[0].geometry.coordinates;
            const distKm = (data.routes[0].distance / 1000).toFixed(1) + ' km';
            const durMin = Math.max(1, Math.round(data.routes[0].duration / 60)) + ' min';
            calculatedDist = distKm;
            calculatedDur = durMin;
          }
        }
      } catch (err) {
        console.warn('OSRM road route note:', err.message);
      }

      // Fallback waypoints if OSRM fails
      if (!routeCoords || routeCoords.length === 0) {
        routeCoords = [
          start,
          [start[0] + (end[0] - start[0]) * 0.35, start[1] + (end[1] - start[1]) * 0.2],
          [start[0] + (end[0] - start[0]) * 0.7, start[1] + (end[1] - start[1]) * 0.85],
          end
        ];
      }

      // Update activeRouteData metrics if calculated
      if (calculatedDist && calculatedDur && (activeRouteData.distance !== calculatedDist || activeRouteData.duration !== calculatedDur)) {
        setActiveRouteData(prev => prev ? ({ ...prev, distance: calculatedDist, duration: calculatedDur }) : null);
      }

      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoords
        }
      };

      if (map.getSource('safer-route')) {
        map.getSource('safer-route').setData(geojson);
      } else {
        map.addSource('safer-route', {
          type: 'geojson',
          data: geojson
        });

        // Glowing outer corridor
        map.addLayer({
          id: 'safer-route-glow',
          type: 'line',
          source: 'safer-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': activeRouteData.id === 'community' ? '#2b7a78' : '#a26769',
            'line-width': 10,
            'line-opacity': 0.45
          }
        });

        // Solid inner safe path
        map.addLayer({
          id: 'safer-route-line',
          type: 'line',
          source: 'safer-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': activeRouteData.id === 'community' ? '#0284c7' : '#e11d48',
            'line-width': 5,
            'line-opacity': 0.95
          }
        });
      }

      // Fit bounds smoothly to show entire route
      if (!isNavigating) {
        const minLng = Math.min(start[0], end[0]);
        const maxLng = Math.max(start[0], end[0]);
        const minLat = Math.min(start[1], end[1]);
        const maxLat = Math.max(start[1], end[1]);

        map.fitBounds(
          [
            [minLng - 0.005, minLat - 0.005],
            [maxLng + 0.005, maxLat + 0.005]
          ],
          { padding: 70, maxZoom: 15.5, essential: true }
        );
      }
    };

    if (map.isStyleLoaded()) {
      drawRoute();
    } else {
      map.once('styledata', drawRoute);
    }
  }, [activeRouteData]);

  // Update Hazard Markers & Safe Havens
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const filteredIncidents = incidents.filter(inc => {
      if (activeFilter === 'all') return true;
      return inc.category === activeFilter;
    });

    filteredIncidents.forEach(inc => {
      const lat = parseFloat(inc.latitude);
      const lng = parseFloat(inc.longitude);
      if (isNaN(lat) || isNaN(lng)) return;

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
          <div class="mt-2 pt-1 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between gap-1">
            <span class="truncate max-w-[130px]">${inc.address || 'Reported Location'}</span>
            <span class="${inc.status === 'Verified' ? 'text-purple-700 dark:text-purple-300 font-extrabold bg-purple-100 dark:bg-purple-950 px-1.5 py-0.5 rounded border border-purple-300' : 'text-emerald-700 font-bold'}">${inc.status === 'Verified' ? '✓ Verified (2+ Users)' : (inc.status || 'Submitted')}</span>
          </div>
        </div>
      `;

      const popup = new Popup({ offset: 25, closeButton: false }).setHTML(popupContent);
      const marker = new Marker({ element: el, anchor: 'bottom' })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener('click', () => {
        if (onSelectIncident) onSelectIncident(inc);
      });

      markersRef.current.push(marker);
    });

    if (showSafeHavens && safeHavens) {
      safeHavens.forEach(haven => {
        const lat = parseFloat(haven.latitude);
        const lng = parseFloat(haven.longitude);
        if (isNaN(lat) || isNaN(lng)) return;

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

        const marker = new Marker({ element: el, anchor: 'bottom' })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }
  }, [incidents, safeHavens, activeFilter, showSafeHavens]);

  const handleLocateMe = () => {
    if (mapRef.current) {
      if (userLocation) {
        mapRef.current.flyTo({
          center: userLocation,
          zoom: 16,
          essential: true
        });
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = [pos.coords.longitude, pos.coords.latitude];
            setUserLocation(coords);
            mapRef.current.flyTo({
              center: coords,
              zoom: 16,
              essential: true
            });
          },
          (err) => console.warn('Locate error:', err.message),
          { enableHighAccuracy: true, timeout: 5000 }
        );
      }
    }
  };

  // Turn-by-Turn Navigation Start Handler
  const handleStartNavigation = () => {
    if (!mapRef.current || !activeRouteData) return;

    setIsNavigating(true);
    setIs3D(true);

    const start = userLocation || center || [77.391029, 28.535517];
    mapRef.current.flyTo({
      center: start,
      zoom: 16.8,
      pitch: 60,
      bearing: -15,
      essential: true,
      duration: 1500
    });
  };

  // Turn-by-Turn Navigation Stop Handler
  const handleStopNavigation = () => {
    setIsNavigating(false);
    if (mapRef.current) {
      mapRef.current.easeTo({
        pitch: is3D ? 55 : 0,
        bearing: 0,
        zoom: 14.5,
        duration: 1000
      });
    }
  };

  // Debounced Place Search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const mapplsKey = import.meta.env.VITE_MAPPLS_API_KEY;
        if (mapplsKey && mapplsKey !== 'YOUR_NEW_KEY') {
          try {
            const res = await fetch(`https://apis.mappls.com/advancedmaps/v1/${mapplsKey}/geo_code?addr=${encodeURIComponent(searchQuery)}`);
            if (res.ok) {
              const data = await res.json();
              const results = data.copResults || data.results || data.places || [];
              if (results.length > 0) {
                setSearchResults(results.map(r => ({
                  name: r.formattedAddress || r.placeName || r.address || searchQuery,
                  lat: parseFloat(r.latitude || r.lat),
                  lng: parseFloat(r.longitude || r.lng)
                })).filter(r => !isNaN(r.lat) && !isNaN(r.lng)));
                setShowSearchResults(true);
                setIsSearching(false);
                return;
              }
            }
          } catch (mErr) {
            console.warn('Mappls search note:', mErr.message);
          }
        }

        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.map(item => ({
            name: item.display_name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon)
          })));
          setShowSearchResults(true);
        }
      } catch (err) {
        console.warn('Geocoding search note:', err.message);
      } finally {
        setIsSearching(false);
      }
    }, 450);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSelectSearchResult = async (result) => {
    if (!mapRef.current) return;

    setShowSearchResults(false);
    setSearchQuery(result.name.split(',')[0]);

    if (searchMarkerRef.current) {
      searchMarkerRef.current.remove();
    }

    const searchEl = document.createElement('div');
    searchEl.style.width = '32px';
    searchEl.style.height = '32px';
    searchEl.style.position = 'relative';
    searchEl.style.pointerEvents = 'auto';
    searchEl.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `;

    const popup = new Popup({ offset: 20 }).setHTML(`
      <div class="p-2 font-sans text-xs">
        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">Destination</span>
        <h4 class="font-bold text-xs text-slate-900 mt-1">${result.name.split(',')[0]}</h4>
        <p class="text-[11px] text-slate-600 mt-0.5 line-clamp-2">${result.name}</p>
      </div>
    `);

    searchMarkerRef.current = new Marker({ element: searchEl, anchor: 'bottom' })
      .setLngLat([result.lng, result.lat])
      .setPopup(popup)
      .addTo(mapRef.current);

    const routeData = {
      id: 'searched-route',
      name: result.name.split(',')[0],
      detail: result.name,
      duration: '18 min',
      distance: '1.4 km',
      destinationCoords: [result.lng, result.lat]
    };

    setActiveRouteData(routeData);
  };

  const handleClearRoute = () => {
    setActiveRouteData(null);
    setIsNavigating(false);
    if (searchMarkerRef.current) {
      searchMarkerRef.current.remove();
      searchMarkerRef.current = null;
    }
  };

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden shadow-warm-md border border-dust-grey/60 dark:border-smoky-rose/30 bg-parchment dark:bg-wine-plum/40 ${height} ${className}`}>
      {/* Top Controls Bar */}
      <div className="absolute top-3 left-3 right-14 z-20 flex flex-col gap-2 pointer-events-auto max-w-[calc(100%-4rem)]">
        {/* Row 1: Search Input */}
        <div ref={searchContainerRef} className="relative w-full sm:w-auto">
          <div className="px-3.5 py-1.5 rounded-2xl flex items-center gap-2 backdrop-blur-md shadow-md border border-dust-grey/80 dark:border-smoky-rose/50 bg-white/95 dark:bg-[#3a1322]/95 text-wine-plum dark:text-bone max-w-sm">
            {isSearching ? (
              <Loader2 className="w-4 h-4 text-accent animate-spin" />
            ) : (
              <Search className="w-4 h-4 text-wine-plum dark:text-bone flex-shrink-0" />
            )}
            <input
              type="text"
              placeholder="Search places or landmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
              className="bg-transparent border-none outline-none text-xs font-bold text-wine-plum dark:text-bone placeholder:text-wine-plum/60 dark:placeholder:text-bone/60 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                className="text-wine-plum/70 dark:text-bone/70 hover:text-wine-plum dark:hover:text-white flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-64 sm:w-80 glass-modal border border-dust-grey/80 dark:border-smoky-rose/50 rounded-2xl shadow-2xl p-2 z-50 max-h-56 overflow-y-auto">
              {searchResults.map((res, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectSearchResult(res)}
                  className="p-2.5 rounded-xl text-xs font-semibold hover:bg-powder-petal/80 dark:hover:bg-smoky-rose/40 cursor-pointer text-wine-plum dark:text-bone flex items-start gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{res.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Row 2: Scrollable Filter & Action Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {/* Category Filters */}
          <div className="px-2 py-1 rounded-2xl flex items-center gap-1.5 backdrop-blur-md shadow-md border border-dust-grey/80 dark:border-smoky-rose/50 bg-white/95 dark:bg-[#3a1322]/95 flex-shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum shadow-sm'
                  : 'text-wine-plum dark:text-bone hover:bg-powder-petal/60 dark:hover:bg-smoky-rose/40'
              }`}
            >
              All Hazards
            </button>
            {INCIDENT_CATEGORIES.slice(0, 3).map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`text-xs px-2.5 py-1 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  activeFilter === cat.id
                    ? 'bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum shadow-sm'
                    : 'text-wine-plum dark:text-bone/90 hover:bg-powder-petal/60 dark:hover:bg-smoky-rose/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Safe Haven Toggle */}
          <button
            onClick={() => setShowSafeHavens(!showSafeHavens)}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md border flex-shrink-0 ${
              showSafeHavens
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-white/95 dark:bg-[#3a1322]/95 text-wine-plum dark:text-bone border-dust-grey/80 dark:border-smoky-rose/50'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${showSafeHavens ? 'text-white' : 'text-emerald-600'}`} />
            Safe Havens ({showSafeHavens ? 'ON' : 'OFF'})
          </button>

          {/* 3D View Toggle */}
          <button
            onClick={toggle3DView}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md border flex-shrink-0 ${
              is3D
                ? 'bg-wine-plum text-bone border-wine-plum dark:bg-bone dark:text-wine-plum'
                : 'bg-white/95 dark:bg-[#3a1322]/95 text-wine-plum dark:text-bone border-dust-grey/80 dark:border-smoky-rose/50'
            }`}
            title="Toggle 3D Cinematic View"
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D ({is3D ? 'ON' : 'OFF'})</span>
          </button>

          {/* Locate Me */}
          <button
            onClick={handleLocateMe}
            className="px-3 py-1.5 rounded-2xl text-xs font-bold bg-white/95 dark:bg-[#3a1322]/95 text-wine-plum dark:text-bone hover:bg-powder-petal/60 flex items-center gap-1.5 transition-all shadow-md border border-dust-grey/80 dark:border-smoky-rose/50 flex-shrink-0"
            title="Fly to live GPS location"
          >
            <Crosshair className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Locate</span>
          </button>
        </div>
      </div>

      {/* Turn-by-Turn Guidance HUD Card (Active when Navigating) */}
      {isNavigating && activeRouteData && (
        <div className="absolute top-16 left-3 right-3 sm:right-14 z-30 animate-fade-in pointer-events-auto max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-4rem)]">
          <div className="bg-wine-plum/95 dark:bg-[#3a1322]/95 text-bone p-3 rounded-2xl shadow-2xl border border-smoky-rose/50 backdrop-blur-md flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md animate-pulse flex-shrink-0">
                <Navigation className="w-4 h-4" />
              </div>
              <div className="min-w-0 truncate">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex-shrink-0">
                    Live Safer Nav
                  </span>
                  <span className="text-xs font-extrabold text-bone truncate">{activeRouteData.name || 'Destination'}</span>
                </div>
                <p className="text-[11px] font-semibold text-silver mt-0.5 truncate">
                  {activeRouteData.duration || '18 min'} ({activeRouteData.distance || '1.4 km'}) • Safe Corridor
                </p>
              </div>
            </div>

            <button
              onClick={handleStopNavigation}
              className="px-2.5 py-1.5 rounded-xl bg-emergency text-white text-xs font-bold flex items-center gap-1 hover:bg-rose-700 transition-colors shadow-md flex-shrink-0"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Bar: Active Route Action & Start Navigation Trigger */}
      {activeRouteData && !isNavigating && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/95 dark:bg-[#3a1322]/95 border border-dust-grey/80 dark:border-smoky-rose/50 shadow-2xl backdrop-blur-md animate-fade-in">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-wine-plum dark:text-bone truncate">
                {activeRouteData.name || 'Selected Safe Route'}
              </p>
              <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                Verified Safe Path • {activeRouteData.duration || '18 min'} ({activeRouteData.distance || '1.4 km'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleStartNavigation}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Navigation</span>
            </button>
            <button
              onClick={handleClearRoute}
              className="p-2 rounded-xl text-dust-grey-dark hover:text-wine-plum dark:hover:text-bone transition-colors"
              title="Clear Route"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MapLibre Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};



