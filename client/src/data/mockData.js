export const INCIDENT_CATEGORIES = [
  { id: 'Poor Lighting', name: 'Poor Lighting', color: '#F59E0B', bg: '#FEF3C7', icon: 'SunMedium', description: 'Defective streetlights or unlit walkways' },
  { id: 'Harassment', name: 'Harassment', color: '#EF4444', bg: '#FEE2E2', icon: 'AlertTriangle', description: 'Verbal catcalling, stalking or physical intimidation' },
  { id: 'Suspicious Activity', name: 'Suspicious Activity', color: '#8B5CF6', bg: '#EDE9FE', icon: 'Eye', description: 'Unidentified loitering or unusual gatherings' },
  { id: 'Broken CCTV', name: 'Broken CCTV', color: '#3B82F6', bg: '#DBEAFE', icon: 'VideoOff', description: 'Damaged or covered surveillance cameras' },
  { id: 'Isolated Area', name: 'Isolated Area', color: '#10B981', bg: '#D1FAE5', icon: 'Footprints', description: 'Secluded alleys, overgrown paths or dead ends' },
  { id: 'Unsafe Area', name: 'Unsafe Area', color: '#F97316', bg: '#FFEDD5', icon: 'ShieldAlert', description: 'General hazardous condition or lack of assistance' },
  { id: 'Other', name: 'Other Safety Concern', color: '#6B7280', bg: '#F3F4F6', icon: 'HelpCircle', description: 'Other community safety observations' }
];

export const INITIAL_REPORTS = [
  {
    id: 1,
    user_id: 2,
    user_name: 'Priya Sharma',
    title: 'Poor lighting near Sector 12 Bus Stop',
    category: 'Poor Lighting',
    description: 'Three continuous street lamps have been non-functional for past 2 weeks. The stretch from bus stand to metro pillar 42 is completely pitch dark after 7:30 PM.',
    image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    latitude: 28.535517,
    longitude: 77.391029,
    address: 'Sector 12 Bus Stop, Main Market Road',
    severity: 'Medium',
    status: 'Verified',
    verification_status: 'Community Verified',
    created_at: '2026-09-05T18:45:00Z',
    ai_summary: 'Reported infrastructure lighting defect posing evening commute safety risks.'
  },
  {
    id: 2,
    user_id: 2,
    user_name: 'Priya Sharma',
    title: 'Suspicious group gathering near Campus Back Gate',
    category: 'Suspicious Activity',
    description: 'Group of unidentified men loitering on parked motorbikes without number plates, passing unwelcome remarks at passing students between 6 PM - 9 PM.',
    image_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    latitude: 28.542100,
    longitude: 77.401200,
    address: 'University North Gate Perimeter, Block C',
    severity: 'High',
    status: 'Under Review',
    verification_status: 'Unverified',
    created_at: '2026-09-07T08:15:00Z',
    ai_summary: 'Identified group loitering and harassment pattern in university vicinity.'
  },
  {
    id: 3,
    user_id: 2,
    user_name: 'Ananya S.',
    title: 'Broken CCTV Camera at Pedestrian Subway',
    category: 'Broken CCTV',
    description: 'The surveillance camera dome at entrance B of the pedestrian underpass has been physically damaged and dislodged.',
    image_url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    latitude: 28.529800,
    longitude: 77.382400,
    address: 'Metro Underpass Exit 3, Central Ring',
    severity: 'Medium',
    status: 'Resolved',
    verification_status: 'Authority Verified',
    created_at: '2026-09-02T14:30:00Z',
    ai_summary: 'Damaged surveillance module creating security blindspot.'
  },
  {
    id: 4,
    user_id: 2,
    user_name: 'Ritu K.',
    title: 'Isolated Pathway with dense overgrown bushes',
    category: 'Isolated Area',
    description: 'The pedestrian shortcut connecting the residential complex to the main boulevard is overgrown with bushes and lacks sightlines.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80',
    latitude: 28.549200,
    longitude: 77.378900,
    address: 'Greenway Corridor Link, Sector 15A',
    severity: 'Low',
    status: 'Verified',
    verification_status: 'Community Verified',
    created_at: '2026-09-04T11:20:00Z',
    ai_summary: 'Secluded walkway with obstructed visibility.'
  },
  {
    id: 5,
    user_id: 2,
    user_name: 'Meenakshi V.',
    title: 'Persistent verbal harassment near tea stall corner',
    category: 'Harassment',
    description: 'Repeated catcalling reported by multiple commuters in front of the tea kiosk during evening transit hours.',
    image_url: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=600&auto=format&fit=crop&q=80',
    latitude: 28.538700,
    longitude: 77.399500,
    address: 'Commercial Junction Corner, Street 4',
    severity: 'Critical',
    status: 'Under Review',
    verification_status: 'Flagged',
    created_at: '2026-09-03T19:10:00Z',
    ai_summary: 'Commuter harassment pattern identified.'
  }
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
    tip: 'Share your live route with a trusted contact before taking an unfamiliar cab or auto after 8 PM.',
    category: 'Travel'
  },
  {
    id: 2,
    title: 'Situational Awareness',
    tip: 'Keep one earphone off while walking through quiet or poorly lit metro exits and subways.',
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
    tip: 'Keep Rakshika pinned on your phone home screen for quick single-touch emergency access.',
    category: 'Fast Action'
  }
];
