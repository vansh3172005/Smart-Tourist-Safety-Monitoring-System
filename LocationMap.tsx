 
import { MapPin, Navigation, Shield, Users } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { MapContainer, TileLayer, Marker, Circle, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Types
interface GeoFence {
  id: string;
  center: { lat: number; lng: number }; // ✅ fixed
  radius: number;
  type: 'safe' | 'caution' | 'danger';
}

interface LocationMapProps {
  currentLocation: { lat: number; lng: number } | null;
  locationHistory: { lat: number; lng: number }[];
  geoFences: GeoFence[];
  isTracking: boolean;
  nearbyTourists: { id: string; lat: number; lng: number; name: string; count: number }[];
}

export function LocationMap({
  currentLocation,
  locationHistory,
  geoFences,
  isTracking,
  nearbyTourists
}: LocationMapProps) {
  const { t } = useLanguage();

  // Custom icons
  const currentIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  });

  const touristIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26],
  });

  return (
    <div className="relative bg-gray-100 rounded-lg h-[450px] overflow-hidden">
      <MapContainer
        center={currentLocation || { lat: 20.5937, lng: 78.9629 }} // default India
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Base Map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        />

        {/* GeoFences */}
        {geoFences.map((fence) => (
          <Circle
            key={fence.id}
            center={[fence.center.lat, fence.center.lng]} // ✅ fixed
            radius={fence.radius}
            pathOptions={{
              color:
                fence.type === 'safe'
                  ? 'green'
                  : fence.type === 'caution'
                  ? 'orange'
                  : 'red',
              fillOpacity: 0.3,
            }}
          >
            <Popup>
              <div className="flex items-center space-x-2">
                <Shield
                  className={`h-4 w-4 ${
                    fence.type === 'safe'
                      ? 'text-green-600'
                      : fence.type === 'caution'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                />
                <span>
                  {fence.type === 'safe'
                    ? t('Safe Zone')
                    : fence.type === 'caution'
                    ? t('Caution Zone')
                    : t('Danger Zone')}
                </span>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Location Trail */}
        {locationHistory.length > 1 && (
          <Polyline
            positions={locationHistory.map((loc) => [loc.lat, loc.lng])}
            color="blue"
          />
        )}

        {/* Current Location */}
        {currentLocation && isTracking && (
          <Marker
            position={[currentLocation.lat, currentLocation.lng]}
            icon={currentIcon}
          >
            <Popup>
              <MapPin className="inline h-4 w-4 text-blue-600" />{' '}
              {t('Current Location')}
            </Popup>
          </Marker>
        )}

        {/* Nearby Tourists */}
        {nearbyTourists.map((tourist) => (
          <Marker
            key={tourist.id}
            position={[tourist.lat, tourist.lng]}
            icon={touristIcon}
          >
            <Popup>
              <Users className="inline h-4 w-4 text-purple-600" />{' '}
              <strong>{tourist.name}</strong>
              <br />
              {tourist.count} {t('people')}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2 z-[1000]">
        <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
          <Navigation className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Status Indicator */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div
          className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${
            isTracking
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}
          ></div>
          <span>
            {isTracking ? t('Live Tracking') : t('Tracking Paused')}
          </span>
        </div>
      </div>
    </div>
  );
}
