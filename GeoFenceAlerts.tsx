import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function GeoFenceAlerts() {
  const { t } = useLanguage();
  
  const alerts = [
    {
      id: '1',
      type: 'info',
      zone: 'Tawang Town Center',
      message: 'You are in a safe zone with regular police patrol',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      priority: 'low'
    },
    {
      id: '2',
      type: 'warning',
      zone: 'Sela Pass Approach',
      message: 'Weather conditions may change rapidly in this area',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: 'medium'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
        {t('Geo-Fence Notifications')}
      </h3>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'warning'
                ? 'bg-yellow-50 border-yellow-400'
                : alert.type === 'danger'
                ? 'bg-red-50 border-red-400'
                : 'bg-blue-50 border-blue-400'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle
                className={`h-5 w-5 mt-0.5 ${
                  alert.type === 'warning'
                    ? 'text-yellow-600'
                    : alert.type === 'danger'
                    ? 'text-red-600'
                    : 'text-blue-600'
                }`}
              />
              <div className="flex-1">
                <h4
                  className={`font-medium ${
                    alert.type === 'warning'
                      ? 'text-yellow-800'
                      : alert.type === 'danger'
                      ? 'text-red-800'
                      : 'text-blue-800'
                  }`}
                >
                  {alert.zone}
                </h4>
                <p
                  className={`text-sm mt-1 ${
                    alert.type === 'warning'
                      ? 'text-yellow-700'
                      : alert.type === 'danger'
                      ? 'text-red-700'
                      : 'text-blue-700'
                  }`}
                >
                  {alert.message}
                </p>
                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{alert.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{t('No geo-fence alerts at this time')}</p>
          <p className="text-sm text-gray-400 mt-1">
            {t('You will be notified when entering different safety zones')}
          </p>
        </div>
      )}
    </div>
  );
}