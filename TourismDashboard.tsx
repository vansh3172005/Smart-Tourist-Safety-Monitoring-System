import { useState, useEffect } from 'react';
import { BarChart3, Users, MapPin, TrendingUp, Calendar, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { TouristService } from './TouristService';

export function TourismDashboard() {
  const { t } = useLanguage();

  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    averageStayDuration: 0,
    popularDestinations: [] as { name: string; visitors: number; percentage: number }[],
    visitorsByNationality: [] as { country: string; visitors: number; flag: string }[],
    safetyIncidents: 0,
    satisfactionRating: 0,
    revenueImpact: 0
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      // Fetch the real analytics data directly
      const data = await TouristService.getTourismAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in relative">
      
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(99,102,241,0.1)] border-4 border-indigo-50 p-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        
        <div className="flex items-center gap-4 mb-4 md:mb-0 mt-2">
          <div className="bg-indigo-100 p-4 rounded-2xl">
            <BarChart3 className="h-10 w-10 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">
              {t('Tourism Analytics Dashboard')}
            </h2>
            <p className="text-slate-500 font-medium">
              {t('Comprehensive insights and visitor analytics for tourism planning')}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center space-x-4">
            <select className="border-2 border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all">
              <option>{t('This Week')}</option>
              <option>{t('This Month')}</option>
              <option>{t('This Year')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-slate-50 hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-600 font-bold">+15%</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 mb-1">{analytics.totalVisitors}</p>
          <p className="text-sm text-slate-500 font-medium">{t('Total Visitors')}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-slate-50 hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-8 w-8 text-emerald-600" />
            <span className="text-sm text-blue-600 font-bold">+2 days</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 mb-1">{analytics.averageStayDuration}</p>
          <p className="text-sm text-slate-500 font-medium">{t('Avg Stay (days)')}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-slate-50 hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <Globe className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-purple-600 font-bold">12 countries</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 mb-1">78%</p>
          <p className="text-sm text-slate-500 font-medium">{t('International')}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-slate-50 hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 text-orange-600" />
            <span className="text-sm text-orange-600 font-bold">4.7/5</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 mb-1">{analytics.satisfactionRating}%</p>
          <p className="text-sm text-slate-500 font-medium">{t('Satisfaction')}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-slate-50 hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <MapPin className="h-8 w-8 text-rose-600" />
            <span className="text-sm text-green-600 font-bold">-8%</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 mb-1">{analytics.safetyIncidents}</p>
          <p className="text-sm text-slate-500 font-medium">{t('Safety Incidents')}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-slate-50 hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-teal-600" />
            <span className="text-sm text-teal-600 font-bold">+23%</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 mb-1">₹4.2M</p>
          <p className="text-sm text-slate-500 font-medium">{t('Revenue Impact')}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Popular Destinations */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-50">
          <h3 className="text-xl font-extrabold text-slate-800 mb-6">
            {t('Popular Destinations')}
          </h3>
          <div className="space-y-6">
            {analytics.popularDestinations.map((destination, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{destination.name}</p>
                  <p className="text-sm font-medium text-slate-500">{destination.visitors} {t('visitors')}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-slate-100 rounded-full h-3">
                    <div
                      className="bg-indigo-500 h-3 rounded-full"
                      style={{ width: `${destination.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-slate-600 w-12 text-right">
                    {destination.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Demographics */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-50">
          <h3 className="text-xl font-extrabold text-slate-800 mb-6">
            {t('Visitor Demographics')}
          </h3>
          <div className="space-y-6">
            {analytics.visitorsByNationality.map((country, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{country.flag}</span>
                  <span className="font-bold text-slate-800">{country.country}</span>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-indigo-600 text-lg">{country.visitors}</p>
                  <p className="text-xs font-bold text-slate-500">
                    {Math.round((country.visitors / Math.max(1, analytics.totalVisitors)) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Overview */}
      <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-50">
        <h3 className="text-xl font-extrabold text-slate-800 mb-6">
          {t('Safety & Security Overview')}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-8 bg-emerald-50 border-2 border-emerald-100 rounded-2xl hover:shadow-md transition-shadow">
            <div className="text-4xl font-extrabold text-emerald-600 mb-2">
              {Math.max(0, 100 - (analytics.safetyIncidents / Math.max(1, analytics.totalVisitors)) * 100).toFixed(1)}%
            </div>
            <p className="text-emerald-800 font-bold">{t('Safe Journey Rate')}</p>
          </div>
          <div className="text-center p-8 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:shadow-md transition-shadow">
            <div className="text-4xl font-extrabold text-blue-600 mb-2">2.3min</div>
            <p className="text-blue-800 font-bold">{t('Avg Emergency Response')}</p>
          </div>
          <div className="text-center p-8 bg-amber-50 border-2 border-amber-100 rounded-2xl hover:shadow-md transition-shadow">
            <div className="text-4xl font-extrabold text-amber-600 mb-2">24/7</div>
            <p className="text-amber-800 font-bold">{t('Active Monitoring')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}