/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface GeoFence {
  id: string;
  center: { lat: number; lng: number };
  radius: number; // in meters
  type: 'safe' | 'caution' | 'restricted';
}

export interface Location {
  lat: number;
  lng: number;
  timestamp: number;
}

export interface NearbyTourist {
  id: string;
  name: string;
  lat: number;
  lng: number;
  count: number;
}

export interface LocationContextType {
  currentLocation: Location | null;
  locationHistory: Location[];
  geoFences: GeoFence[];
  nearbyTourists: NearbyTourist[];
  requestPermission: () => void; // ✅ new function to trigger permission
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationHistory, setLocationHistory] = useState<Location[]>([]);
  const [watchId, setWatchId] = useState<number | null>(null);

  const requestPermission = () => {
    if ('geolocation' in navigator) {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          const newLocation: Location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            timestamp: Date.now(),
          };

          setCurrentLocation(newLocation);
          setLocationHistory((prev) => [...prev, newLocation]);
        },
        (error) => {
          console.error('❌ Error getting location:', error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      setWatchId(id);
    } else {
      alert('⚠️ Geolocation is not supported in this browser.');
    }
  };

  // cleanup watcher on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // Mock geofences and nearby tourists
  const [geoFences] = useState<GeoFence[]>([
    { id: '1', center: { lat: 28.614, lng: 77.210 }, radius: 200, type: 'safe' },
    { id: '2', center: { lat: 28.615, lng: 77.212 }, radius: 150, type: 'caution' },
    { id: '3', center: { lat: 28.616, lng: 77.213 }, radius: 100, type: 'restricted' },
  ]);

  const [nearbyTourists] = useState<NearbyTourist[]>([
    { id: 't1', name: 'Alice', lat: 28.615, lng: 77.211, count: 3 },
    { id: 't2', name: 'Bob', lat: 28.617, lng: 77.214, count: 2 },
  ]);

  return (
    <LocationContext.Provider
      value={{ currentLocation, locationHistory, geoFences, nearbyTourists, requestPermission }}
    >
      {children}
    </LocationContext.Provider>
  );
}
