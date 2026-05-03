import { Shield, Map, Users, AlertTriangle, Globe, LogOut } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: 'registration' | 'tourist' | 'police' | 'tourism') => void;
}

export function Header({ activeView, setActiveView }: HeaderProps) {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { currentUser, logout, userType } = useAuth();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'as', name: 'অসমীয়া' },
    { code: 'bn', name: 'বাংলা' }
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveView('registration')}>
            <div className="bg-primary-50 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Shield className="h-7 w-7 text-primary-600" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {t('Smart Tourist')}
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2">
            {!currentUser && (
              <button
                onClick={() => setActiveView('registration')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeView === 'registration'
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-primary-600'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>{t('Tourist Registration')}</span>
              </button>
            )}

            {currentUser && userType === 'tourist' && (
              <button
                onClick={() => setActiveView('tourist')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeView === 'tourist'
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-primary-600'
                }`}
              >
                <Map className="h-4 w-4" />
                <span>{t('My Dashboard')}</span>
              </button>
            )}

            <button
              onClick={() => setActiveView('police')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeView === 'police'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-rose-600'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>{t('Police Dashboard')}</span>
            </button>

            <button
              onClick={() => setActiveView('tourism')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeView === 'tourism'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-600'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>{t('Tourism Dashboard')}</span>
            </button>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-slate-100/80 rounded-full p-1 border border-slate-200/50">
              <div className="pl-3 pr-1">
                <Globe className="h-4 w-4 text-slate-500" />
              </div>
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none appearance-none pr-4 py-1 cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {currentUser && (
              <button
                onClick={logout}
                className="flex items-center space-x-1 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                title={t('Logout')}
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}