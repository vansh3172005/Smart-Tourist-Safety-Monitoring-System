import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Users, MapPin, AlertTriangle, Clock, TrendingUp, ShieldAlert, Lock, Unlock } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { TouristService, FAKE_INITIAL_DATA } from './TouristService';
import { TouristsList } from './TouristsList';
import { AlertsMap } from './AlertsMap';
import { Tourist } from './Tourist'; 

interface DashboardStats {
  totalTourists: number;
  safeZoneTourists: number;
  riskZoneTourists: number;
  popularZones: { name: string; tourists: number }[];
}

export function PoliceDashboard() {
  const { t } = useLanguage();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const [stats, setStats] = useState<DashboardStats>({
    totalTourists: 0,
    safeZoneTourists: 0,
    riskZoneTourists: 0,
    popularZones: []
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'tourists'>('overview');
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [isAuthenticated]); // Reload data when auth state changes

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const hashedInput = CryptoJS.SHA256(passcode).toString();
    
    // Securely verify admin access using SHA-256 hash
    if (hashedInput === '2e259b570a57fdc02ec9d08a928969561940282697d5efe2ece0d6729e789e22') {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setError('');
      setPasscode('');
    } else {
      setError(t('Invalid admin passcode. Access denied.'));
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const loadDashboardData = async () => {
    try {
      // If admin is authenticated, load REAL data. Otherwise, load FAKE data for public layout demo.
      let touristData: Tourist[] = [];
      if (isAuthenticated) {
        touristData = await TouristService.getAllTourists();
      } else {
        touristData = FAKE_INITIAL_DATA;
      }

      setTourists(touristData);

      const safeZoneCount = touristData.filter((t) => t.safetyScore > 70).length;
      const riskZoneCount = touristData.filter((t) => t.safetyScore <= 70).length;

      const popularZones = [
        { name: 'Delhi', tourists: 250 },
        { name: 'Agra', tourists: 180 },
        { name: 'Jaipur', tourists: 150 },
        { name: 'Mumbai', tourists: 220 },
        { name: 'Goa', tourists: 300 },
        { name: 'Bangalore', tourists: 120 },
        { name: 'Kolkata', tourists: 130 },
        { name: 'Chennai', tourists: 100 },
        { name: 'Varanasi', tourists: 90 },
        { name: 'Kerala (Backwaters)', tourists: 200 }
      ];

      setStats({
        totalTourists: touristData.length,
        safeZoneTourists: safeZoneCount,
        riskZoneTourists: riskZoneCount,
        popularZones
      });

      setLastUpdated(new Date());
    } catch (error) {
      console.error('❌ Failed to load dashboard data:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in relative">
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => { setShowLoginModal(false); setError(''); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <div className="bg-amber-100 inline-block p-4 rounded-full mb-4">
                <Lock className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{t('Admin Access')}</h2>
              <p className="text-sm text-slate-500 mt-2">{t('Enter passcode to view real database records.')}</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={t('Enter Passcode')}
                className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-amber-500/30 focus:border-amber-500 block p-4 text-center tracking-[0.5em]"
              />
              {error && <p className="text-rose-500 text-sm font-bold text-center">{error}</p>}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all"
              >
                {t('Login to Real Data')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="glass rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center border-4 border-amber-100 shadow-[0_10px_40px_rgba(245,158,11,0.1)] relative overflow-hidden">
        
        {/* Banner showing if we are in public demo or admin mode */}
        {!isAuthenticated ? (
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-sm">
            {t('PUBLIC DEMO (FAKE DATA)')}
          </div>
        ) : (
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-sm">
            {t('ADMIN MODE (REAL DATA)')}
          </div>
        )}

        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="bg-amber-100 p-4 rounded-2xl">
            <ShieldAlert className="h-10 w-10 text-amber-600 animate-pulse-slow" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">{t('Police Command Center')} 🚨</h2>
            <p className="text-slate-500 font-medium">{t('Real-time tourist safety monitoring')}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center space-x-2 text-sm font-bold text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
            <Clock className="h-5 w-5" />
            <span>
              {t('Last Updated')}: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
          
          {!isAuthenticated ? (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors shadow-md"
            >
              <Lock className="h-4 w-4" /> {t('Admin Login')}
            </button>
          ) : (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-2 rounded-xl transition-colors"
            >
              <Unlock className="h-4 w-4" /> {t('Logout')}
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={t('Total Tourists')}
          value={stats.totalTourists}
          icon={<Users className="h-10 w-10 text-blue-600" />}
          trend={`+12% ${t('from last week')}`}
          trendColor="text-green-600"
          bgColor="bg-blue-50"
          borderColor="border-blue-100"
        />
        <StatCard
          title={t('In Safe Zones')}
          value={stats.safeZoneTourists}
          icon={<MapPin className="h-10 w-10 text-emerald-600" />}
          trend={`${Math.round((stats.safeZoneTourists / Math.max(stats.totalTourists, 1)) * 100)}% ${t('safe')}`}
          trendColor="text-emerald-600"
          bgColor="bg-emerald-50"
          borderColor="border-emerald-100"
        />
        <StatCard
          title={t('In Risk Zones')}
          value={stats.riskZoneTourists}
          icon={<AlertTriangle className="h-10 w-10 text-rose-600" />}
          trend={t('Monitoring required')}
          trendColor="text-rose-600"
          bgColor="bg-rose-50"
          borderColor="border-rose-100"
        />
      </div>

      {/* Tabs and Content Wrapper */}
      <div className="glass rounded-3xl overflow-hidden border-2 border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="border-b-2 border-slate-100 bg-white/50">
          <nav className="flex space-x-2 px-6 pt-4">
            {(['overview', 'tourists'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-bold text-base rounded-t-2xl transition-all ${
                  activeTab === tab 
                    ? 'bg-amber-100 text-amber-700 border-b-4 border-amber-500' 
                    : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-b-4 border-transparent'
                }`}
              >
                {tab === 'overview' ? t('Overview Map 🗺️') : t('Tourist Directory 📋')}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 bg-white/60">
          {activeTab === 'overview' ? (
            <AlertsMap tourists={tourists} alerts={[]} /> 
          ) : (
            <TouristsList tourists={tourists} />
          )}
        </div>
      </div>

      {/* Popular Tourist Zones */}
      <div className="glass rounded-3xl p-8 border-2 border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
          {t('Popular Tourist Zones')} 📍
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.popularZones.map((zone, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow hover:border-indigo-200">
              <p className="font-bold text-slate-800">{zone.name}</p>
              <p className="text-indigo-600 font-extrabold text-xl">{zone.tourists}</p>
              <p className="text-xs text-slate-400 font-medium">{t('tourists')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- Helper Component ----------------
interface StatCardProps {
  title: string;
  value: number;
  icon: JSX.Element;
  trend: string;
  trendColor: string;
  bgColor: string;
  borderColor: string;
}

function StatCard({ title, value, icon, trend, trendColor, bgColor, borderColor }: StatCardProps) {
  return (
    <div className={`glass rounded-3xl p-8 border-4 ${borderColor} shadow-lg transform hover:-translate-y-2 transition-transform duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-lg font-bold text-slate-500 mb-1">{title}</p>
          <p className="text-5xl font-extrabold text-slate-800">{value}</p>
        </div>
        <div className={`${bgColor} p-4 rounded-2xl shadow-inner`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 bg-white/60 p-2 rounded-xl inline-block">
        <span className={`text-sm font-bold flex items-center gap-1 ${trendColor}`}>
          <TrendingUp className="h-4 w-4" />
          {trend}
        </span>
      </div>
    </div>
  );
}

export type { Tourist };
