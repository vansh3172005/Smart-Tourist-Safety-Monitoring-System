/* eslint-disable no-empty-pattern */
import { useState } from 'react';
import { Search, MapPin, Phone, User, Clock, ShieldAlert, FileText, Droplet, HeartPulse } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Tourist } from './Tourist';

interface TouristsListProps {
  tourists: Tourist[];
}

export function TouristsList({ tourists }: TouristsListProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Convert DB status to the filter format
    let tStatus = 'safe';
    if (tourist.status === 'Alert' || tourist.safetyScore < 50) tStatus = 'alert';
    else if (tourist.safetyScore < 75) tStatus = 'caution';

    const matchesFilter = filterStatus === 'all' || tStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string, score: number) => {
    if (status === 'Alert' || score < 50) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (score < 75) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStatusText = (status: string, score: number) => {
    if (status === 'Alert' || score < 50) return t('High Risk');
    if (score < 75) return t('Monitoring');
    return t('Safe');
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-5 w-5 text-indigo-400" />
          <input
            type="text"
            placeholder={t('Search tourists by name or ID...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all font-medium text-slate-700"
          />
        </div>

        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all font-medium text-slate-700 bg-white"
          >
            <option value="all">{t('All Status')}</option>
            <option value="safe">{t('Safe')}</option>
            <option value="caution">{t('Monitoring')}</option>
            <option value="alert">{t('High Risk')}</option>
          </select>
        </div>
      </div>

      {/* Tourists Grid */}
      <div className="grid gap-6">
        {filteredTourists.map((tourist) => (
          <div key={tourist.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-xl border-2 border-slate-100 p-6 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b-2 border-slate-50 pb-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm">
                  <User className="h-7 w-7 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800">{tourist.name}</h3>
                  <p className="text-sm font-bold text-slate-500">{tourist.id} • <span className="text-indigo-500">{tourist.nationality}</span></p>
                </div>
              </div>

              <div className="text-left md:text-right flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1">
                <div className={`inline-flex items-center px-4 py-1.5 rounded-xl border-2 text-sm font-bold shadow-sm ${getStatusBadge(tourist.status, tourist.safetyScore)}`}>
                  {getStatusText(tourist.status, tourist.safetyScore)}
                </div>
                <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg mt-1 md:mt-0">
                  <span className="text-xs font-bold text-slate-500 uppercase">{t('Score')}</span>
                  <span className="text-sm font-extrabold text-slate-800">{tourist.safetyScore}/100</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
              <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-xl border border-blue-100/50">
                <Phone className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-xs font-bold text-blue-400 uppercase">{t('Phone')}</p>
                  <span className="text-sm font-semibold text-slate-700">{tourist.phoneNumber || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-rose-50 p-3 rounded-xl border border-rose-100/50">
                <HeartPulse className="h-5 w-5 text-rose-500" />
                <div>
                  <p className="text-xs font-bold text-rose-400 uppercase">{t('Emergency Contact')}</p>
                  <span className="text-sm font-semibold text-slate-700">{tourist.emergencyContact || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-emerald-50 p-3 rounded-xl border border-emerald-100/50">
                <MapPin className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-xs font-bold text-emerald-400 uppercase">{t('Last Known Area')}</p>
                  <span className="text-sm font-semibold text-slate-700">{tourist.location ? `${tourist.location.lat.toFixed(2)}, ${tourist.location.lng.toFixed(2)}` : 'Unknown'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-amber-50 p-3 rounded-xl border border-amber-100/50">
                <FileText className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-xs font-bold text-amber-400 uppercase">{t('Passport')}</p>
                  <span className="text-sm font-semibold text-slate-700">{tourist.passportNumber || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-red-50 p-3 rounded-xl border border-red-100/50">
                <Droplet className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-xs font-bold text-red-400 uppercase">{t('Blood Group')}</p>
                  <span className="text-sm font-extrabold text-slate-700">{tourist.bloodGroup || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-xl border border-purple-100/50">
                <Clock className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs font-bold text-purple-400 uppercase">{t('Duration / Registered')}</p>
                  <span className="text-sm font-semibold text-slate-700">
                    {tourist.visitDuration ? `${tourist.visitDuration} days` : new Date(tourist.registeredAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {tourist.accommodationAddress && (
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">{t('Accommodation Address')}</p>
                  <p className="text-sm font-medium text-slate-700">{tourist.accommodationAddress}</p>
                </div>
              </div>
            )}

            {(tourist.status === 'Alert' || tourist.safetyScore < 50) && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl animate-pulse-slow">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="h-5 w-5 text-red-600" />
                  <p className="text-sm text-red-800 font-bold">
                    {t('Immediate attention required - Safety Score Critical')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-shadow">
                    {t('Generate E-FIR')}
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-shadow">
                    {t('Contact Emergency')}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTourists.length === 0 && (
        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-300">
          <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800 mb-2">{t('No tourists found')}</h3>
          <p className="text-lg text-slate-500 font-medium">{t('Try adjusting your search or filter criteria')}</p>
        </div>
      )}
    </div>
  );
}