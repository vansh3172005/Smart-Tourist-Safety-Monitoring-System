import { useState, useRef } from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import { useLocation } from './LocationContext';
import { EmergencyService } from './EmergencyService';

export function PanicButton() {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { currentLocation } = useLocation();
  const [isPressed, setIsPressed] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseDown = () => {
    setIsPressed(true);
    setIsActivating(true);
    
    timeoutRef.current = setTimeout(async () => {
      setIsActivating(false);
      setIsActivated(true);
      
      // Trigger emergency response
      if (currentUser && currentLocation) {
        await EmergencyService.triggerPanicAlert({
          userId: currentUser.id,
          location: currentLocation,
          timestamp: new Date(),
          userInfo: currentUser
        });
      }
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsActivated(false);
        setIsPressed(false);
      }, 5000);
    }, 3000);
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isActivated) {
      setIsPressed(false);
      setIsActivating(false);
    }
  };

  if (isActivated) {
    return (
      <div className="text-center p-6 bg-green-50 border-2 border-green-300 rounded-lg">
        <Phone className="h-12 w-12 text-green-600 mx-auto mb-3 animate-pulse" />
        <p className="text-green-800 font-semibold mb-2">
          {t('Emergency services notified')}
        </p>
        <p className="text-green-700 text-sm">
          {t('Help is on the way')}
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className={`relative w-32 h-32 mx-auto rounded-full border-4 transition-all duration-200 ${
          isPressed
            ? 'bg-red-600 border-red-700 scale-95'
            : 'bg-red-500 border-red-600 hover:bg-red-600 hover:scale-105'
        } active:scale-90 shadow-lg hover:shadow-xl`}
      >
        <div className="flex flex-col items-center justify-center h-full text-white">
          <AlertTriangle className="h-8 w-8 mb-2" />
          <span className="font-bold text-sm">
            {isActivating ? t('Activating...') : t('EMERGENCY')}
          </span>
        </div>
        
        {isActivating && (
          <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-ping"></div>
        )}
      </button>
      
      <p className="text-sm text-gray-600 mt-4">
        {t('Hold for 3 seconds to activate')}
      </p>
      
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 text-sm font-semibold">
          {t('EMERGENCY ALERT')}
        </p>
        <p className="text-red-700 text-sm">
          {t('I NEED HELP!')}
        </p>
      </div>
    </div>
  );
}