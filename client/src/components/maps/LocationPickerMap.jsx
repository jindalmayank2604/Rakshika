import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '../ui/Button';

const pinIcon = L.divIcon({
  className: 'pin-picker',
  html: `
    <div style="
      background: #E11D48;
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    ">
      <div style="transform: rotate(45deg); font-size: 13px; color: white;">📍</div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const MapEvents = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

export const LocationPickerMap = ({ initialLat = 28.535517, initialLng = 77.391029, onLocationChange }) => {
  const [position, setPosition] = useState([initialLat, initialLng]);

  const handleSelect = (lat, lng) => {
    setPosition([lat, lng]);
    if (onLocationChange) onLocationChange(lat, lng);
  };

  const handleUseCurrentGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        if (onLocationChange) onLocationChange(latitude, longitude);
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          Click anywhere on map or use GPS pin
        </span>
        <Button
          variant="outline"
          size="sm"
          icon={Navigation}
          onClick={handleUseCurrentGPS}
        >
          Use Live GPS
        </Button>
      </div>

      <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 relative">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents onLocationSelect={handleSelect} />
          <Marker position={position} icon={pinIcon} />
        </MapContainer>
      </div>
      <p className="text-[11px] text-slate-500 text-center">
        Selected Coordinates: {position[0].toFixed(5)}, {position[1].toFixed(5)}
      </p>
    </div>
  );
};
