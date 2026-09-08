import { INITIAL_REPORTS, INITIAL_CONTACTS, INITIAL_NOTIFICATIONS } from '../data/mockData';

const API_BASE = 'http://localhost:5000/api';

// Helper to get stored auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('rakshika_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Storage keys
const STORAGE_KEYS = {
  REPORTS: 'rakshika_local_reports',
  CONTACTS: 'rakshika_local_contacts',
  NOTIFICATIONS: 'rakshika_local_notifications',
  USER: 'rakshika_user',
  TOKEN: 'rakshika_token'
};

// Initialize localStorage fallback if empty
const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  }
};
initLocalStorage();

export const apiService = {
  // --- AUTH ---
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
        return data;
      }
    } catch (e) {
      console.warn('API offline, using local authentication:', e.message);
    }

    // Local fallback
    const role = email.includes('admin') ? 'admin' : 'user';
    const user = {
      id: role === 'admin' ? 1 : 2,
      name: role === 'admin' ? 'Rakshika Admin' : (email.split('@')[0] || 'Priya Sharma'),
      email,
      phone: '+91 98123 45678',
      role,
      profile_image: null
    };
    const token = 'mock_jwt_token_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { success: true, token, user };
  },

  async register(name, email, phone, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
        return data;
      }
    } catch (e) {
      console.warn('API offline, using local registration fallback');
    }

    const user = { id: Date.now(), name, email, phone, role: 'user', profile_image: null };
    const token = 'mock_jwt_token_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { success: true, token, user };
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // --- REPORTS ---
  async getReports(filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_BASE}/reports?${params}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {
      console.warn('Reports API offline, using local storage fallback');
    }

    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
    if (filters.category && filters.category !== 'All') {
      list = list.filter(r => r.category === filters.category);
    }
    if (filters.severity && filters.severity !== 'All') {
      list = list.filter(r => r.severity === filters.severity);
    }
    if (filters.status && filters.status !== 'All') {
      list = list.filter(r => r.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async createReport(reportData) {
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reportData)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {
      console.warn('Create Report API offline, saving to local store');
    }

    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
    const newReport = {
      id: Date.now(),
      user_id: 2,
      user_name: 'Priya Sharma',
      status: 'Submitted',
      verification_status: 'Unverified',
      created_at: new Date().toISOString(),
      ...reportData
    };
    list.unshift(newReport);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(list));
    return newReport;
  },

  async updateReportStatus(reportId, status, verification_status, notes = '') {
    try {
      const res = await fetch(`${API_BASE}/admin/reports/${reportId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, verification_status, notes })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Admin status update API fallback');
    }

    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
    const report = list.find(r => r.id === reportId);
    if (report) {
      if (status) report.status = status;
      if (verification_status) report.verification_status = verification_status;
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(list));
    }
    return { success: true, reportId, status };
  },

  // --- EMERGENCY CONTACTS ---
  async getContacts() {
    try {
      const res = await fetch(`${API_BASE}/emergency-contacts`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {
      console.warn('Contacts API fallback active');
    }
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACTS) || '[]');
  },

  async addContact(contact) {
    try {
      const res = await fetch(`${API_BASE}/emergency-contacts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(contact)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {
      console.warn('Add contact API fallback');
    }

    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACTS) || '[]');
    if (contact.is_primary) {
      list.forEach(c => c.is_primary = false);
    }
    const newContact = { id: Date.now(), user_id: 2, ...contact };
    list.push(newContact);
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(list));
    return newContact;
  },

  async deleteContact(id) {
    try {
      const res = await fetch(`${API_BASE}/emergency-contacts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return true;
    } catch (e) {
      console.warn('Delete contact API fallback');
    }

    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACTS) || '[]');
    list = list.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(list));
    return true;
  },

  // --- AI ASSISTANT ---
  async askAI(message, history = []) {
    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message, conversationHistory: history })
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply;
      }
    } catch (e) {
      console.warn('AI API fallback active');
    }

    // Local heuristic AI response
    const lower = message.toLowerCase();
    if (lower.includes('followed') || lower.includes('following') || lower.includes('behind')) {
      return `### Steps If You Feel Followed:
1. **Move toward lights and active stores:** Enter an open supermarket, cafe, or metro station immediately.
2. **Change direction / Cross street:** Check if they mirror your movement without looking back panicky.
3. **Trigger SOS Preview or Call Contact:** Keep Rakshika open in your hand ready to trigger 3s hold.
4. **Dial 112 / 1091:** For immediate danger, alert the emergency police helpline immediately.`;
    }
    if (lower.includes('late night') || lower.includes('cab') || lower.includes('journey')) {
      return `### Late-Night Commute Checklist:
- **Share Live Trip:** Send your location link to your emergency contact.
- **Inspect Vehicle:** Verify registration plate & child locks before stepping inside.
- **Seat Choice:** Sit in the rear diagonally across from driver for visibility and door access.`;
    }
    return `I'm **Rakshika AI**, your 24/7 safety assistant. I can help assess neighborhood reports, prepare late-night trip safety checklists, and give actionable guidance if you feel unsafe.

*(Note: For immediate physical threats, please use the SOS button or dial 112 directly.)*`;
  },

  async classifyIncident(text, category) {
    try {
      const res = await fetch(`${API_BASE}/ai/classify`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text, category })
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {
      console.warn('AI Classify API fallback');
    }

    return {
      category: category || 'Unsafe Area',
      severity: 'Medium',
      summary: 'Reported community safety concern requiring awareness.',
      confidence: 0.91
    };
  },

  // --- NOTIFICATIONS ---
  async getNotifications() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  },

  markNotificationRead(id) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    const item = list.find(n => n.id === id);
    if (item) item.is_read = true;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    return list;
  }
};
