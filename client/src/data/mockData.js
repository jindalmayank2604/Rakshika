export const INCIDENT_CATEGORIES = [
  { id: 'Poor Lighting', name: 'Poor Lighting', color: '#b47f82', bg: '#f5ebe0', icon: 'SunMedium', description: 'Defective streetlights or unlit walkways' },
  { id: 'Harassment', name: 'Harassment', color: '#b91c1c', bg: '#fee2e2', icon: 'AlertTriangle', description: 'Verbal catcalling, stalking or physical intimidation' },
  { id: 'Suspicious Activity', name: 'Suspicious Activity', color: '#8c5254', bg: '#e3d5ca', icon: 'Eye', description: 'Unidentified loitering or unusual gatherings' },
  { id: 'Broken CCTV', name: 'Broken CCTV', color: '#6d2e46', bg: '#f4e5ea', icon: 'VideoOff', description: 'Damaged or covered surveillance cameras' },
  { id: 'Isolated Area', name: 'Isolated Area', color: '#2b7a78', bg: '#e6fffa', icon: 'Footprints', description: 'Secluded alleys, overgrown paths or dead ends' },
  { id: 'Unsafe Area', name: 'Unsafe Area', color: '#a26769', bg: '#ece0e1', icon: 'ShieldAlert', description: 'General hazardous condition or lack of assistance' },
  { id: 'Other', name: 'Other Safety Concern', color: '#734143', bg: '#edede9', icon: 'HelpCircle', description: 'Other community safety observations' }
];

export const INITIAL_REPORTS = [];

export const SAFE_HAVENS = [
  { id: 1, name: '24/7 MedPlus Pharmacy Safe Point', type: 'Pharmacy / First Aid', latitude: 28.5365, longitude: 77.3920, phone: '+91 11 2345 6789' },
  { id: 2, name: 'City Police Community Assistance Post #5', type: 'Police Booth', latitude: 28.5410, longitude: 77.3980, phone: '112' },
  { id: 3, name: 'Metro Station Passenger Care Hub', type: 'Transit Safe Zone', latitude: 28.5310, longitude: 77.3840, phone: '+91 11 2233 4455' }
];

export const INITIAL_CONTACTS = [
  { id: 1, user_id: 2, name: 'Ananya Sharma', phone: '+91 98234 56789', relationship: 'Sister', is_primary: true },
  { id: 2, user_id: 2, name: 'Vikram Sharma', phone: '+91 98345 67890', relationship: 'Father', is_primary: false },
  { id: 3, user_id: 2, name: 'Dr. Meera Sen', phone: '+91 98456 78901', relationship: 'Friend / Mentor', is_primary: false }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Report Verified',
    message: 'Your report "Poor lighting near Sector 12 Bus Stop" has been community verified.',
    type: 'report_verified',
    time: '2 hours ago',
    is_read: false
  },
  {
    id: 2,
    title: 'Safety Advisory',
    message: 'Caution advised: 2 recent reports filed within 1 km of your current sector.',
    type: 'safety_alert',
    time: '5 hours ago',
    is_read: false
  },
  {
    id: 3,
    title: 'Emergency Contact Active',
    message: 'Ananya Sharma is set as your active primary SOS recipient.',
    type: 'contact_alert',
    time: '1 day ago',
    is_read: true
  }
];

export const SAFETY_TIPS = [
  {
    id: 1,
    title: 'Live Journey Sharing',
    tip: 'Share your live route with a trusted contact before taking an unfamiliar cab or transit after 8 PM.',
    category: 'Travel'
  },
  {
    id: 2,
    title: 'Situational Awareness',
    tip: 'Keep one earphone off while walking through quiet or poorly lit transit exits and subways.',
    category: 'Awareness'
  },
  {
    id: 3,
    title: 'Safe Havens',
    tip: 'Identify 24-hour pharmacies, petrol stations, and open convenience stores along your regular commute.',
    category: 'Preparedness'
  },
  {
    id: 4,
    title: 'Instant SOS Ready',
    tip: 'Keep WeSafe pinned on your phone home screen for instant single-touch emergency broadcast.',
    category: 'Fast Action'
  }
];
