import { useState, useEffect } from 'react';
import { Header } from './Header';
import TouristRegistration from './TouristRegistration';
import { TouristDashboard } from './TouristDashboard';
import { PoliceDashboard } from './PoliceDashboard';
import { TourismDashboard } from './TourismDashboard';
import { EmergencyAlert } from './EmergencyAlert';
import { LocationProvider } from './LocationContext';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider, useAuth } from './AuthContext';

function AppContent() {
  const { currentUser, userType } = useAuth();
  const [activeView, setActiveView] = useState<'registration' | 'tourist' | 'police' | 'tourism'>('registration');

  useEffect(() => {
    if (currentUser) {
      setActiveView(userType);
    }
  }, [currentUser, userType]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Full background image */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/images/realtimesystem.jpg')" }}
      ></div>

      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-20"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-1 container mx-auto px-4 py-6 w-full">
          {activeView === 'registration' && <TouristRegistration />}
          {activeView === 'tourist' && currentUser && <TouristDashboard />}
          {activeView === 'police' && <PoliceDashboard />}
          {activeView === 'tourism' && <TourismDashboard />}
        </main>

        <EmergencyAlert />
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LocationProvider>
          <AppContent />
        </LocationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
