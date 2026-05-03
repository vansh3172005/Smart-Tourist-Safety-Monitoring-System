/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function EmergencyAlert() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Listen for emergency alerts
    const handleEmergencyAlert = (alert: any) => {
      setAlerts(prev => [...prev, alert]);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== alert.id));
      }, 10000);
    };

    // Mock emergency alert for demonstration
    const mockAlert = {
      id: 'emergency-' + Date.now(),
      type: 'panic',
      message: 'Emergency alert activated by tourist राज पटेल near Sela Pass',
      location: 'Sela Pass Viewpoint',
      timestamp: new Date(),
      priority: 'high'
    };

    // Simulate an emergency alert after 5 seconds for demo
    const demoTimeout = setTimeout(() => {
      handleEmergencyAlert(mockAlert);
    }, 5000);

    return () => clearTimeout(demoTimeout);
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-sm animate-pulse"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-white animate-bounce" />
              <span className="font-semibold">{t('EMERGENCY ALERT')}</span>
            </div>
            <button
              onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
              className="text-white hover:text-red-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-sm">{alert.message}</p>
          <p className="mt-1 text-xs text-red-200">
            {alert.timestamp.toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
}