const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
  TOKEN: 'rakshika_token',
  GUEST: 'rakshika_guest'
};

export const apiService = {
  // --- AUTH ---
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Login failed. Please verify your credentials.');
    }

    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    }
    if (data.user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    }
    localStorage.removeItem(STORAGE_KEYS.GUEST);
    return data;
  },

  async register(name, email, phone, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Registration failed. Please try again.');
    }

    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    }
    if (data.user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    }
    localStorage.removeItem(STORAGE_KEYS.GUEST);
    return data;
  },

  async getMe() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
          return data.user;
        }
      }
    } catch (err) {
      console.warn('Could not fetch current session user:', err.message);
    }
    return null;
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  async logout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
    } catch (e) {
      console.warn('Logout request note:', e.message);
    }
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.GUEST);
  },

  async updateProfile(profileData) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to update profile.');
    }
    if (data.user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    }
    return data.user;
  },

  // --- REPORTS / INCIDENTS ---
  async getReports(filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_BASE}/reports?${params}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      console.warn('Reports API unavailable:', e.message);
    }
    return [];
  },

  async getIncidents(filters = {}) {
    return this.getReports(filters);
  },

  async createReport(reportData) {
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(reportData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit report. Authentication or validation issue.');
      }
      return data.data;
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Server unavailable. Please verify backend service connection.');
      }
      throw err;
    }
  },

  async createIncident(incidentData) {
    return this.createReport(incidentData);
  },

  async updateReportStatus(reportId, status, verification_status, notes = '') {
    const res = await fetch(`${API_BASE}/admin/reports/${reportId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ status, verification_status, notes })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to update report status.');
    }
    return data;
  },

  // --- EMERGENCY CONTACTS ---
  async getContacts() {
    try {
      const res = await fetch(`${API_BASE}/emergency-contacts`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        return data.data || [];
      }
    } catch (e) {
      console.warn('Contacts API unavailable:', e.message);
    }
    return [];
  },

  async addContact(contact) {
    const res = await fetch(`${API_BASE}/emergency-contacts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(contact)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to add emergency contact.');
    }
    return data.data;
  },

  async deleteContact(id) {
    const res = await fetch(`${API_BASE}/emergency-contacts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to delete contact.');
    }
    return true;
  },

  // --- AI ASSISTANT ---
  async askAI(message, history = []) {
    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ message, conversationHistory: history })
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply;
      }
    } catch (e) {
      console.warn('AI API note:', e.message);
    }

    const lower = message.toLowerCase();
    if (lower.includes('followed') || lower.includes('following') || lower.includes('behind')) {
      return `### Steps If You Feel Followed:
1. **Move toward lights and active stores:** Enter an open supermarket, cafe, or metro station immediately.
2. **Change direction / Cross street:** Check if they mirror your movement without looking back in panic.
3. **Trigger SOS Panic Preview:** Keep WeSafe open in your hand ready to trigger 3s hold.
4. **Dial 112 / 1091:** For immediate danger, alert the emergency police helpline immediately.`;
    }
    return `I'm **WeSafe AI**, your 24/7 safety assistant. I can help assess neighborhood reports, prepare late-night trip safety checklists, and give actionable guidance if you feel unsafe.

*(Note: For immediate physical threats, please trigger SOS Panic or dial 112 directly.)*`;
  },

  async classifyIncident(text, category) {
    try {
      const res = await fetch(`${API_BASE}/ai/classify`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ text, category })
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {
      console.warn('AI Classify API note:', e.message);
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

