// Tourist.ts

export interface Tourist {
  id: string; // Unique tourist ID (e.g., TID-001)
  name: string; // Full name
  email?: string; // Optional email
  country: string; // Country of residence
  nationality: string; // Nationality
  passportNumber?: string;
  phoneNumber?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  visitDuration?: string | number;
  accommodationAddress?: string;
  plannedItinerary?: string;
  safetyScore: number; // Current safety score (0-100)
  location: { lat: number; lng: number }; // Current location coordinates
  status: 'Active' | 'Inactive' | 'Alert'; // Current status
  registeredAt: string; // ISO date string for registration
}

/**
 * Generates a new unique tourist ID.
 * Format: TID-001, TID-002, etc.
 * @param index The index or sequence number of the tourist
 */
export function generateTouristId(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `TID-${padded}`;
}

/**
 * Creates a default Tourist object for initialization.
 * @param name Tourist's name
 * @param country Country of residence
 * @param nationality Nationality
 * @param index Index for ID generation
 */
export function createDefaultTourist(
  name: string,
  country: string,
  nationality: string,
  index: number
): Tourist {
  return {
    id: generateTouristId(index),
    name,
    email: '',
    country,
    nationality,
    safetyScore: 100, // Default full safety
    location: { lat: 0, lng: 0 }, // Default placeholder
    status: 'Active',
    registeredAt: new Date().toISOString()
  };
}
