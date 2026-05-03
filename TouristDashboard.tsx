import { useState } from 'react';
import { MapPin, AlertTriangle, Activity, Users } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import { useLocation } from './LocationContext';
import { PanicButton } from './PanicButton';
import { SafetyScoreCard } from './SafetyScoreCard';
import { MapContainer, TileLayer, Marker, Circle, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationAccessPrompt } from './LocationAccessPromt.tsx'; // ✅ import prompt separately

export function TouristDashboard() {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { currentLocation, locationHistory, geoFences, nearbyTourists } = useLocation();
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);

  if (!currentUser) return null;

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
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Location Permission Prompt */}
      <LocationAccessPrompt /> {/* ✅ added here */}

      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('Welcome')}, {currentUser.name}
            </h2>
            <p className="text-gray-600">
              {t('Digital ID')}: {currentUser.id}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">{t('Active')}</span>
            </div>
            <p className="text-sm text-gray-500">
              {t('Registered')}: {new Date(currentUser.registrationTime).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <SafetyScoreCard score={currentUser.safetyScore} />

          {/* Location Map */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                {t('Real-Time Location')}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{t('Tracking')}</span>
                <button
                  onClick={() => setIsTrackingEnabled(!isTrackingEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isTrackingEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isTrackingEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Leaflet Map */}
            <MapContainer
              center={currentLocation || { lat: 20.5937, lng: 78.9629 }}
              zoom={6}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
              />

              {/* GeoFences */}
              {geoFences.map((fence) => (
                <Circle
                  key={fence.id}
                  center={[fence.center.lat, fence.center.lng]}
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
                    <strong>
                      {fence.type === 'safe'
                        ? t('Safe Zone')
                        : fence.type === 'caution'
                        ? t('Caution Zone')
                        : t('Restricted Zone')}
                    </strong>
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
              {currentLocation && isTrackingEnabled && (
                <Marker position={[currentLocation.lat, currentLocation.lng]} icon={currentIcon}>
                  <Popup>
                    <MapPin className="inline h-4 w-4 text-blue-600" /> {t('Current Location')}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              {t('Emergency Services')}
            </h3>
            <PanicButton />

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-red-800">{t('Police Emergency')}</span>
                <span className="text-red-600 font-semibold">100</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-800">{t('Tourist Helpline')}</span>
                <span className="text-blue-600 font-semibold">1363</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-800">{t('Medical Emergency')}</span>
                <span className="text-green-600 font-semibold">108</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
