/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tourist, createDefaultTourist, generateTouristId } from './Tourist';
import CryptoJS from 'crypto-js';

const DB_KEY = 'smart_tourist_database';
const SECRET_KEY = 'SmartTourist_SecureKey_2026';

// Generate a realistic set of fake data to act as our layout demo data
export const FAKE_INITIAL_DATA: Tourist[] = [
  { id: 'TID-001', name: 'John Smith', country: 'United States', nationality: 'American', safetyScore: 100, location: { lat: 28.6139, lng: 77.2090 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(), email: 'john@example.com' },
  { id: 'TID-002', name: 'Emma Johnson', country: 'United Kingdom', nationality: 'British', safetyScore: 85, location: { lat: 27.1751, lng: 78.0421 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 5).toISOString(), email: 'emma@example.com' },
  { id: 'TID-003', name: 'Liam Neeson', country: 'Ireland', nationality: 'Irish', safetyScore: 45, location: { lat: 15.2993, lng: 74.1240 }, status: 'Alert', registeredAt: new Date(Date.now() - 86400000 * 1).toISOString(), email: 'liam@example.com' },
  { id: 'TID-004', name: 'Sophia Garcia', country: 'Spain', nationality: 'Spanish', safetyScore: 95, location: { lat: 26.9124, lng: 75.7873 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 3).toISOString(), email: 'sophia@example.com' },
  { id: 'TID-005', name: 'Lukas Müller', country: 'Germany', nationality: 'German', safetyScore: 60, location: { lat: 19.0760, lng: 72.8777 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 4).toISOString(), email: 'lukas@example.com' },
  { id: 'TID-006', name: 'Yuki Tanaka', country: 'Japan', nationality: 'Japanese', safetyScore: 100, location: { lat: 25.3176, lng: 82.9739 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 6).toISOString(), email: 'yuki@example.com' },
  { id: 'TID-007', name: 'Mia Silva', country: 'Brazil', nationality: 'Brazilian', safetyScore: 30, location: { lat: 11.0168, lng: 76.9558 }, status: 'Alert', registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(), email: 'mia@example.com' },
  { id: 'TID-008', name: 'Omar Al-Fayed', country: 'UAE', nationality: 'Emirati', safetyScore: 90, location: { lat: 12.9716, lng: 77.5946 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 7).toISOString(), email: 'omar@example.com' },
  { id: 'TID-009', name: 'Chloe Dubois', country: 'France', nationality: 'French', safetyScore: 88, location: { lat: 9.9312, lng: 76.2673 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 1).toISOString(), email: 'chloe@example.com' },
  { id: 'TID-010', name: 'Chen Wei', country: 'China', nationality: 'Chinese', safetyScore: 72, location: { lat: 22.5726, lng: 88.3639 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 3).toISOString(), email: 'chen@example.com' },
  { id: 'TID-011', name: 'Aarav Patel', country: 'India', nationality: 'Indian', safetyScore: 100, location: { lat: 28.5355, lng: 77.3910 }, status: 'Active', registeredAt: new Date(Date.now() - 86400000 * 10).toISOString(), email: 'aarav@example.com' },
  { id: 'TID-012', name: 'Isabella Rossi', country: 'Italy', nationality: 'Italian', safetyScore: 55, location: { lat: 13.0827, lng: 80.2707 }, status: 'Alert', registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(), email: 'isabella@example.com' },
];

export class TouristService {
  /**
   * Internal method to get the current database state from localStorage, securely decrypted
   */
  private static getDB(): Tourist[] {
    const rawData = localStorage.getItem(DB_KEY);
    if (!rawData) {
      // Real DB starts empty, encrypt it
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify([]), SECRET_KEY).toString();
      localStorage.setItem(DB_KEY, encrypted);
      return [];
    }
    
    try {
      const bytes = CryptoJS.AES.decrypt(rawData, SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      console.error('Database decryption failed or corrupted data. Resetting DB.');
      return [];
    }
  }

  /**
   * Internal method to securely save to the database
   */
  private static saveDB(tourists: Tourist[]) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(tourists), SECRET_KEY).toString();
    localStorage.setItem(DB_KEY, encrypted);
  }

  /**
   * Registers a new tourist and saves to the real localStorage DB
   */
  static async registerTourist(
    data: Partial<Tourist>
  ): Promise<Tourist> {
    const tourists = this.getDB();
    const newId = generateTouristId(tourists.length + 1);
    
    const newTourist: Tourist = {
      id: newId,
      name: data.name || '',
      country: data.country || 'Unknown',
      nationality: data.nationality || 'Unknown',
      passportNumber: data.passportNumber,
      phoneNumber: data.phoneNumber,
      emergencyContact: data.emergencyContact,
      bloodGroup: data.bloodGroup,
      visitDuration: data.visitDuration,
      accommodationAddress: data.accommodationAddress,
      plannedItinerary: data.plannedItinerary,
      safetyScore: 100,
      location: { lat: 0, lng: 0 },
      status: 'Active',
      registeredAt: new Date().toISOString(),
      email: data.email || ''
    };
    
    tourists.push(newTourist);
    this.saveDB(tourists);
    return newTourist;
  }

  /**
   * Returns all registered tourists from DB
   */
  static async getAllTourists(): Promise<Tourist[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getDB()), 300);
    });
  }

  /**
   * Returns tourists currently marked as Active
   */
  static async getActiveTourists(): Promise<Tourist[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.getDB().filter(t => t.status === 'Active'));
      }, 300);
    });
  }

  /**
   * Updates a tourist's location in the DB
   */
  static async updateLocation(id: string, location: { lat: number; lng: number }): Promise<Tourist | null> {
    const tourists = this.getDB();
    const touristIndex = tourists.findIndex(t => t.id === id);
    
    if (touristIndex === -1) return null;
    
    tourists[touristIndex].location = location;
    this.saveDB(tourists);
    
    return tourists[touristIndex];
  }

  /**
   * Dynamically generates alerts based on real DB data
   */
  static async getActiveAlerts(): Promise<any[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const tourists = this.getDB();
        const atRiskTourists = tourists.filter(t => t.safetyScore <= 70 || t.status === 'Alert');
        
        const alerts = atRiskTourists.map((t, index) => ({
          id: `ALERT-${100 + index}`,
          type: t.safetyScore < 50 ? 'sos_panic' : 'location_anomaly',
          touristId: t.id,
          severity: t.safetyScore < 50 ? 'critical' : 'high',
          timestamp: new Date()
        }));

        resolve(alerts);
      }, 300);
    });
  }

  /**
   * Dynamically generates analytics based on DB data (or fake data for public demo)
   */
  static async getTourismAnalytics(useFakeData: boolean = false): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        const tourists = useFakeData ? FAKE_INITIAL_DATA : this.getDB();
        
        resolve({
          totalVisitors: tourists.length,
          averageStayDuration: 6.2,
          popularDestinations: [
            { name: 'Tawang Monastery', visitors: 1247 + tourists.length, percentage: 85 },
            { name: 'Sela Pass', visitors: 983, percentage: 67 },
            { name: 'Bomdila', visitors: 756, percentage: 51 },
            { name: 'Ziro Valley', visitors: 642, percentage: 43 },
            { name: 'Namdapha National Park', visitors: 389, percentage: 26 }
          ],
          visitorsByNationality: [
            { country: 'India', visitors: 1689, flag: '🇮🇳' },
            { country: 'United States', visitors: 342, flag: '🇺🇸' },
            { country: 'Germany', visitors: 298, flag: '🇩🇪' },
            { country: 'United Kingdom', visitors: 234, flag: '🇬🇧' },
            { country: 'Japan', visitors: 156, flag: '🇯🇵' },
            { country: 'Australia', visitors: 128, flag: '🇦🇺' }
          ],
          safetyIncidents: tourists.filter(t => t.safetyScore < 70).length,
          satisfactionRating: 92,
          revenueImpact: 4.2e6
        });
      }, 400);
    });
  }
}
