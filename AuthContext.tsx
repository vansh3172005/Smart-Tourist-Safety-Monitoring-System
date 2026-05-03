/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  passportNumber: string;
  phoneNumber: string;
  emergencyContact: string;
  safetyScore: number;
  currentLocation: any;
  isActive: boolean;
  registrationTime: string;
}

interface AuthContextType {
  currentUser: User | null;
  userType: 'tourist' | 'police' | 'tourism';
  login: (user: User, type: 'tourist' | 'police' | 'tourism') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'tourist' | 'police' | 'tourism'>('tourist');

  const login = async (user: User, type: 'tourist' | 'police' | 'tourism') => {
    setCurrentUser(user);
    setUserType(type);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType('tourist');
  };

  const value = {
    currentUser,
    userType,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}