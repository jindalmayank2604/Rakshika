import React, { useEffect, useRef } from 'react';
import { Map as MapLibreMap, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export const SafetyMap = ({
  center = [77.391029, 28.535517], // Temporary starting center [lng, lat]
  zoom = 13,
  height = 'h-[550px]',
  className = ''
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // OpenStreetMap raster tile style specification for MapLibre GL JS
    const style = {
      version: 8,
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
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

    // Normalize starting coordinates to [lng, lat] for MapLibre GL JS
    let initialCenter = [77.391029, 28.535517];
    if (Array.isArray(center) && center.length === 2) {
      const [first, second] = center;
      if (Math.abs(first) <= 90 && Math.abs(second) > 90) {
        initialCenter = [second, first]; // Convert [lat, lng] to [lng, lat]
      } else if (Math.abs(first) <= 180 && Math.abs(second) <= 90) {
        initialCenter = [first, second];
      }
    }

    // Initialize MapLibre GL JS Map
    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: style,
      center: initialCenter,
      zoom: zoom
    });

    // Add MapLibre navigation control (zoom in/out & compass)
    map.addControl(new NavigationControl(), 'top-right');

    mapRef.current = map;

    // Cleanup map instance on unmount
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden shadow-glass border border-white/80 bg-white ${height} ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
