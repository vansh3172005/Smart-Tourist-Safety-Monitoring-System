/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface EmergencyAlert {
  userId: string;
  location: any;
  timestamp: Date;
  userInfo: any;
}

export class EmergencyService {
  static async triggerPanicAlert(alert: EmergencyAlert): Promise<void> {
    console.log('🚨 EMERGENCY ALERT TRIGGERED', alert);
    
    // In a real system, this would:
    // 1. Send immediate alerts to nearest police units
    // 2. Notify emergency contacts
    // 3. Generate automatic E-FIR
    // 4. Activate response teams
    // 5. Send location data to rescue services
    
    // Simulate API calls
    await this.notifyPolice(alert);
    await this.notifyEmergencyContacts(alert);
    await this.generateEFIR(alert);
    
    // Store alert in local storage for demo
    const alerts = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
    alerts.push({
      ...alert,
      id: `EMRG-${Date.now()}`,
      status: 'active',
      responseTeams: ['Team Alpha', 'Medical Unit 2']
    });
    localStorage.setItem('emergencyAlerts', JSON.stringify(alerts));
  }

  private static async notifyPolice(_alert: EmergencyAlert): Promise<void> {
    // Simulate police notification
    console.log('📞 Police units notified:', {
      nearestStation: 'Tawang Police Station',
      estimatedArrival: '12 minutes',
      units: ['Patrol Unit 101', 'Emergency Response Team']
    });
  }

  private static async notifyEmergencyContacts(alert: EmergencyAlert): Promise<void> {
    // Simulate emergency contact notification
    console.log('📱 Emergency contacts notified:', {
      contact: alert.userInfo.emergencyContact,
      message: `Emergency alert from ${alert.userInfo.name} at location ${alert.location.lat}, ${alert.location.lng}`,
      sentAt: alert.timestamp
    });
  }

  private static async generateEFIR(alert: EmergencyAlert): Promise<void> {
    // Simulate E-FIR generation
    const efir = {
      id: `FIR-${Date.now()}`,
      touristId: alert.userId,
      touristName: alert.userInfo.name,
      incidentType: 'Emergency Alert',
      location: alert.location,
      timestamp: alert.timestamp,
      status: 'Registered',
      assignedOfficer: 'SI Ramesh Kumar',
      description: 'Tourist activated emergency panic button. Immediate response required.'
    };
    
    console.log('📄 E-FIR Generated:', efir);
    
    // Store E-FIR
    const efirs = JSON.parse(localStorage.getItem('efirs') || '[]');
    efirs.push(efir);
    localStorage.setItem('efirs', JSON.stringify(efirs));
  }
}