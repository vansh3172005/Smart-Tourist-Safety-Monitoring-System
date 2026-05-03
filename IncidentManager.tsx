/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { useState } from 'react';
import { AlertTriangle, FileText, Clock, User, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface IncidentManagerProps {
  alerts: any[];
}

// eslint-disable-next-line no-empty-pattern
export function IncidentManager({ }: IncidentManagerProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'resolved' | 'reports'>('active');

  const mockIncidents = [
    {
      id: 'INC-001',
      type: 'panic_button',
      touristName: 'राज पटेल',
      touristId: 'TID-003',
      location: 'Near Sela Pass',
      coordinates: { lat: 27.5186, lng: 91.9056 },
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'active',
      priority: 'high',
      description: 'Tourist activated panic button. Last known location: Sela Pass viewpoint.',
      responseTeam: 'Team Alpha',
      estimatedResponseTime: '15 minutes'
    },
    {
      id: 'INC-002',
      type: 'location_anomaly',
      touristName: 'Emma Johnson',
      touristId: 'TID-002',
      location: 'Tawang-Bomdila Highway',
      coordinates: { lat: 27.4856, lng: 91.8756 },
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: 'investigating',
      priority: 'medium',
      description: 'Tourist deviated significantly from planned route without check-in.',
      responseTeam: 'Team Beta',
      estimatedResponseTime: '25 minutes'
    },
    {
      id: 'INC-003',
      type: 'weather_alert',
      touristName: 'John Smith',
      touristId: 'TID-001',
      location: 'Bum La Pass',
      coordinates: { lat: 27.5456, lng: 91.9156 },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'resolved',
      priority: 'low',
      description: 'Tourist safely evacuated from high-altitude area due to sudden weather change.',
      responseTeam: 'Team Gamma',
      resolvedAt: new Date(Date.now() - 60 * 60 * 1000)
    }
  ];

  const activeIncidents = mockIncidents.filter(inc => inc.status === 'active' || inc.status === 'investigating');
  const resolvedIncidents = mockIncidents.filter(inc => inc.status === 'resolved');

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('Active Incidents')} ({activeIncidents.length})
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'resolved'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('Resolved')} ({resolvedIncidents.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('Generate Reports')}
          </button>
        </nav>
      </div>

      {/* Incidents List */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeIncidents.map((incident) => (
            <div key={incident.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-800">{incident.id}</h3>
                  <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getPriorityBadge(incident.priority)}`}>
                    {incident.priority.toUpperCase()} {t('PRIORITY')}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(incident.status)}`}>
                  {incident.status.toUpperCase()}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    <strong>{incident.touristName}</strong> ({incident.touristId})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{incident.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">{incident.timestamp.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">{t('Response Team')}: {incident.responseTeam}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{incident.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {t('ETA')}: {incident.estimatedResponseTime}
                </span>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                    {t('Track Response')}
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                    {t('Contact Tourist')}
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                    {t('Escalate')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'resolved' && (
        <div className="space-y-4">
          {resolvedIncidents.map((incident) => (
            <div key={incident.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">{incident.id}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(incident.status)}`}>
                  {t('RESOLVED')}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    <strong>{incident.touristName}</strong> ({incident.touristId})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    {t('Resolved')}: {incident.resolvedAt?.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-gray-700">{incident.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              {t('Generate Incident Reports')}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Report Type')}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>{t('Daily Summary')}</option>
                    <option>{t('Weekly Analysis')}</option>
                    <option>{t('Monthly Report')}</option>
                    <option>{t('Incident Detail Report')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Date Range')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  {t('Generate Report')}
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">{t('Quick Stats')}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">2</p>
                    <p className="text-sm text-red-600">{t('Active Incidents')}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">15</p>
                    <p className="text-sm text-green-600">{t('Resolved Today')}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">3.2min</p>
                    <p className="text-sm text-blue-600">{t('Avg Response')}</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">98.5%</p>
                    <p className="text-sm text-yellow-600">{t('Success Rate')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}