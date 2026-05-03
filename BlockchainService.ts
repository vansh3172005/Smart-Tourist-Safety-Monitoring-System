/* eslint-disable @typescript-eslint/no-explicit-any */
interface TouristData {
  name: string;
  passportNumber: string;
  nationality: string;
  phoneNumber: string;
  emergencyContact: string;
  plannedItinerary: string;
  accommodationAddress: string;
  visitDuration: string;
}

export class BlockchainService {
  static async generateDigitalId(touristData: TouristData): Promise<string> {
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a mock blockchain-style digital ID
    const timestamp = Date.now();
    const hash = this.generateHash(touristData, timestamp);
    
    // Store in local storage for persistence (in real app, this would be on blockchain)
    const digitalId = `TDI-${hash.substring(0, 8).toUpperCase()}`;
    
    const blockchainRecord = {
      digitalId,
      hash,
      timestamp,
      touristData: {
        ...touristData,
        // Hash sensitive data
        passportNumber: this.hashSensitiveData(touristData.passportNumber),
        phoneNumber: this.hashSensitiveData(touristData.phoneNumber)
      },
      blockHeight: Math.floor(Math.random() * 1000000),
      verified: true
    };
    
    localStorage.setItem(`blockchain_${digitalId}`, JSON.stringify(blockchainRecord));
    
    return digitalId;
  }

  static async verifyDigitalId(digitalId: string): Promise<boolean> {
    const record = localStorage.getItem(`blockchain_${digitalId}`);
    return !!record;
  }

  static async getDigitalIdRecord(digitalId: string): Promise<any> {
    const record = localStorage.getItem(`blockchain_${digitalId}`);
    return record ? JSON.parse(record) : null;
  }

  private static generateHash(data: TouristData, timestamp: number): string {
    // Simple hash generation for demo (in real app, use proper cryptographic hash)
    const dataString = JSON.stringify(data) + timestamp;
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  private static hashSensitiveData(data: string): string {
    // Return partially masked data for demo
    if (data.length <= 4) return '***';
    return data.substring(0, 2) + '*'.repeat(data.length - 4) + data.substring(data.length - 2);
  }
}