/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    'Smart Tourist Safety System': 'Smart Tourist Safety System',
    'Tourist Registration': 'Tourist Registration',
    'My Dashboard': 'My Dashboard',
    'Police Dashboard': 'Police Dashboard',
    'Tourism Dashboard': 'Tourism Dashboard',
    'Logout': 'Logout',
    'Welcome': 'Welcome',
    'Digital ID': 'Digital ID',
    'Active': 'Active',
    'Registered': 'Registered',
    'Real-Time Location': 'Real-Time Location',
    'Tracking': 'Tracking',
    'Emergency Services': 'Emergency Services',
    'Police Emergency': 'Police Emergency',
    'Tourist Helpline': 'Tourist Helpline',
    'Medical Emergency': 'Medical Emergency',
    'Current Status': 'Current Status',
    'Safety Zone': 'Safety Zone',
    'Safe': 'Safe',
    'Last Check-in': 'Last Check-in',
    'No data': 'No data',
    'Emergency Contact Name': 'Emergency Contact Name',
    'Emergency Contact Number': 'Emergency Contact Number',
    'Quick Actions': 'Quick Actions',
    'Contact Tourism Office': 'Contact Tourism Office',
    'Update Itinerary': 'Update Itinerary',
    'Safety Tips': 'Safety Tips',
    'Registration Successful!': 'Registration Successful!',
    'Your Digital Tourist ID:': 'Your Digital Tourist ID:',
    'Keep this ID safe. You can now access your tourist dashboard for safety monitoring and emergency features.':
      'Keep this ID safe. You can now access your tourist dashboard for safety monitoring and emergency features.',
    'Register to get your blockchain-based digital tourist ID for enhanced safety monitoring':
      'Register to get your blockchain-based digital tourist ID for enhanced safety monitoring',
    'Full Name': 'Full Name',
    'Enter your full name': 'Enter your full name',
    'Passport Number': 'Passport Number',
    'Enter passport number': 'Enter passport number',
    'Nationality': 'Nationality',
    'Enter nationality': 'Enter nationality',
    'Phone Number': 'Phone Number',
    'Enter phone number': 'Enter phone number',
    'Visit Duration': 'Visit Duration',
    'e.g., 7 days': 'e.g., 7 days',
    'Accommodation Address': 'Accommodation Address',
    'Enter accommodation address': 'Enter accommodation address',
    'Planned Itinerary': 'Planned Itinerary',
    'Describe your planned activities and places to visit': 'Describe your planned activities and places to visit',
    'Generate Digital Tourist ID': 'Generate Digital Tourist ID',
    'Generating Digital ID...': 'Generating Digital ID...',
    'Security Features:': 'Security Features:',
    'Blockchain-based tamper-proof digital identity': 'Blockchain-based tamper-proof digital identity',
    'End-to-end encryption for all personal data': 'End-to-end encryption for all personal data',
    'Real-time location tracking with geo-fencing alerts': 'Real-time location tracking with geo-fencing alerts',
    'AI-powered anomaly detection for enhanced safety': 'AI-powered anomaly detection for enhanced safety',
    'Emergency panic button with instant response': 'Emergency panic button with instant response',
    'Police Command Center': 'Police Command Center',
    'Real-time tourist safety monitoring and incident response': 'Real-time tourist safety monitoring and incident response',
    'Last Updated': 'Last Updated',
    'Total Tourists': 'Total Tourists',
    'from last week': 'from last week',
    'Active Alerts': 'Active Alerts',
    'Requires attention': 'Requires attention',
    'All clear': 'All clear',
    'In Safe Zones': 'In Safe Zones',
    'safe': 'safe',
    'In Risk Zones': 'In Risk Zones',
    'Monitoring required': 'Monitoring required',
    'Live Map Overview': 'Live Map Overview',
    'Tourist Directory': 'Tourist Directory',
    'Incident Management': 'Incident Management',
    'Tourism Analytics Dashboard': 'Tourism Analytics Dashboard',
    'Comprehensive insights and visitor analytics for tourism planning':
      'Comprehensive insights and visitor analytics for tourism planning',
    'This Week': 'This Week',
    'This Month': 'This Month',
    'This Year': 'This Year',
    'Total Visitors': 'Total Visitors',
    'Avg Stay (days)': 'Avg Stay (days)',
    'International': 'International',
    'Satisfaction': 'Satisfaction',
    'Safety Incidents': 'Safety Incidents',
    'Revenue Impact': 'Revenue Impact',
    'Popular Destinations': 'Popular Destinations',
    'visitors': 'visitors',
    'Visitor Demographics': 'Visitor Demographics',
    'Safety & Security Overview': 'Safety & Security Overview',
    'Safe Journey Rate': 'Safe Journey Rate',
    'Avg Emergency Response': 'Avg Emergency Response',
    'Active Monitoring': 'Active Monitoring',
    'EMERGENCY ALERT': 'EMERGENCY ALERT',
    'I NEED HELP!': 'I NEED HELP!',
    'Hold for 3 seconds to activate': 'Hold for 3 seconds to activate',
    'Activating...': 'Activating...',
    'Emergency services notified': 'Emergency services notified',
    'Help is on the way': 'Help is on the way',
    'Your digital ID has been generated using blockchain technology and is now active for your visit.':
      'Your digital ID has been generated using blockchain technology and is now active for your visit.',
  },
  hi: {
    'Smart Tourist Safety System': 'स्मार्ट पर्यटक सुरक्षा प्रणाली',
    'Tourist Registration': 'पर्यटक पंजीकरण',
    'My Dashboard': 'मेरा डैशबोर्ड',
    'Police Dashboard': 'पुलिस डैशबोर्ड',
    'Tourism Dashboard': 'पर्यटन डैशबोर्ड',
    'Logout': 'लॉग आउट',
    'Welcome': 'स्वागत',
    'Digital ID': 'डिजिटल आईडी',
    'Active': 'सक्रिय',
    'Registered': 'पंजीकृत',
    'EMERGENCY ALERT': 'आपातकालीन चेतावनी',
    'I NEED HELP!': 'मुझे मदद चाहिए!',
    'Hold for 3 seconds to activate': 'सक्रिय करने के लिए 3 सेकंड दबाएं',
    'Activating...': 'सक्रिय हो रहा है...',
    'Emergency services notified': 'आपातकालीन सेवाओं को सूचित किया गया',
    'Help is on the way': 'मदद रास्ते में है',
  },
  as: {
    'Smart Tourist Safety System': 'স্মাৰ্ট পৰ্যটক নিৰাপত্তা ব্যৱস্থা',
    'Tourist Registration': 'পৰ্যটক পঞ্জীয়ন',
    'My Dashboard': 'মোৰ ডেছবৰ্ড',
    'Police Dashboard': 'আৰক্ষী ডেছবৰ্ড',
    'Tourism Dashboard': 'পৰ্যটন ডেছবৰ্ড',
    'Welcome': 'স্বাগতম',
    'EMERGENCY ALERT': 'জৰুৰীকালীন সতৰ্কতা',
    'I NEED HELP!': 'মোৰ সহায় লাগে!',
  },
  bn: {
    'Smart Tourist Safety System': 'স্মার্ট পর্যটক নিরাপত্তা ব্যবস্থা',
    'Tourist Registration': 'পর্যটক নিবন্ধন',
    'My Dashboard': 'আমার ড্যাশবোর্ড',
    'Police Dashboard': 'পুলিশ ড্যাশবোর্ড',
    'Tourism Dashboard': 'পর্যটন ড্যাশবোর্ড',
    'Welcome': 'স্বাগতম',
    'EMERGENCY ALERT': 'জরুরি সতর্কতা',
    'I NEED HELP!': 'আমার সাহায্য দরকার!',
  },
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (language: string) => setCurrentLanguage(language);

  const t = (key: string) => translations[currentLanguage]?.[key] || key;

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
