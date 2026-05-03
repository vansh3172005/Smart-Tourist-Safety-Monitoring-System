import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Users, AlertTriangle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Tourist } from './Tourist';
import './pulse.css';

// ---------------- Custom Icons ----------------
const touristIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
  iconSize: [26, 26],
  iconAnchor: [13, 26],
});

const alertIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

// ---------------- Legend Control ----------------
function LegendControl() {
  const map = useMap();

  React.useEffect(() => {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'map-legend bg-white p-3 rounded shadow text-sm');
      div.innerHTML = `
        <h4 class="font-bold mb-2">Legend</h4>
        <div><span style="background:blue;opacity:0.5;width:12px;height:12px;display:inline-block;margin-right:6px;"></span> Active Tourists</div>
        <div><span style="background:red;opacity:0.5;width:12px;height:12px;display:inline-block;margin-right:6px;"></span> Alerts</div>
        <div><span style="background:green;opacity:0.5;width:12px;height:12px;display:inline-block;margin-right:6px;"></span> Safe Zone Clusters</div>
        <div><span style="background:orange;opacity:0.5;width:12px;height:12px;display:inline-block;margin-right:6px;"></span> Weather Warnings</div>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      map.removeControl(legend);
    };
  }, [map]);

  return null;
}

// ---------------- Props ----------------
export interface Alert {
  id: string;
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  location?: { lat: number; lng: number };
}

interface AlertsMapProps {
  tourists: Tourist[];
  alerts: Alert[];
}

// ---------------- Component ----------------
export function AlertsMap({ tourists, alerts }: AlertsMapProps) {
  const { t } = useLanguage();
  const center = { lat: 20.5937, lng: 78.9629 };

  return (
    <div className="space-y-6">
      <MapContainer center={center} zoom={5} className="h-96 w-full rounded-lg shadow-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {/* Tourist Markers */}
        {tourists.map(
          (tourist) =>
            tourist.location && (
              <Marker
                key={tourist.id}
                position={[tourist.location.lat, tourist.location.lng]}
                icon={touristIcon}
              >
                <Popup>
                  <Users className="inline h-4 w-4 text-blue-600 mr-1" />{' '}
                  <strong>{tourist.name}</strong>
                  <br />
                  {t('Nationality')}: {tourist.nationality}
                  <br />
                  {t('Safety Score')}: {tourist.safetyScore}
                </Popup>
              </Marker>
            )
        )}

        {/* Alerts */}
        {alerts.map(
          (alert) =>
            alert.location && (
              <Marker
                key={alert.id}
                position={[alert.location.lat, alert.location.lng]}
                icon={alertIcon}
              >
                <Popup>
                  <AlertTriangle className="inline h-4 w-4 text-red-600 mr-1" />{' '}
                  <strong>{alert.type.toUpperCase()}</strong>
                  <br />
                  {alert.message}
                  <br />
                  {t('Severity')}: {alert.severity}
                </Popup>
              </Marker>
            )
        )}

        {/* Safe Zone Clusters */}
        {[
          { lat: 28.6139, lng: 77.209 }, // Delhi
          { lat: 19.076, lng: 72.8777 }, // Mumbai
          { lat: 12.9716, lng: 77.5946 }, // Bangalore
        ].map((zone, i) => (
          <Circle
            key={`safe-${i}`}
            center={[zone.lat, zone.lng]}
            radius={50000}
            pathOptions={{ color: 'green', fillOpacity: 0.2 }}
          >
            <Popup>{t('Safe Zone Cluster')}</Popup>
          </Circle>
        ))}

        {/* Weather Warning */}
        <Circle
          center={[22.5726, 88.3639]}
          radius={80000}
          pathOptions={{ color: 'orange', fillOpacity: 0.25 }}
        >
          <Popup>⚠️ {t('Weather Warning')} - Heavy Rain</Popup>
        </Circle>

        {/* Legend */}
        <LegendControl />
      </MapContainer>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-800">{tourists.length}</p>
          <p className="text-sm text-blue-600">{t('Active Tourists')}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-800">{alerts.length}</p>
          <p className="text-sm text-red-600">{t('Active Alerts')}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <MapPin className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-800">3</p>
          <p className="text-sm text-green-600">{t('Safe Zone Clusters')}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <MapPin className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-800">1</p>
          <p className="text-sm text-yellow-600">{t('Weather Warnings')}</p>
        </div>
      </div>
    </div>
  );
}
