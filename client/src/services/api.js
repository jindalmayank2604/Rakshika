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
  getCloudContainerId() {
    return localStorage.getItem('wesafe_cloud_container_id') || 'ff808181a09d98f701a0a1b903e3082e';
  },

  async fetchCloudReports() {
    const containerId = this.getCloudContainerId();
    try {
      const res = await fetch(`https://api.restful-api.dev/objects/${containerId}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.data && Array.isArray(json.data.reports)) {
          return json.data.reports;
        }
      }
    } catch (e) {
      console.warn('Cloud reports fetch notice:', e.message);
    }
    return [];
  },

  async getReports(filters = {}) {
    const local = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
    const cloudReports = await this.fetchCloudReports();

    try {
      const params = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_BASE}/reports?${params}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          return this._dedupeReports([...json.data, ...cloudReports, ...local]);
        }
      }
    } catch (e) {
      console.warn('Reports API unavailable:', e.message);
    }

    return this._dedupeReports([...cloudReports, ...local]);
  },

  _dedupeReports(allReports) {
    const seen = new Set();
    return allReports.filter(r => {
      if (!r) return false;
      const key = r.id ? String(r.id) : `${r.title}-${r.latitude}-${r.longitude}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  },

  async syncReportToCloud(report) {
    try {
      let currentCloud = await this.fetchCloudReports();
      const updated = [report, ...currentCloud.filter(r => String(r.id) !== String(report.id))];

      let containerId = this.getCloudContainerId();

      // Try PUT to current container
      if (containerId) {
        const putRes = await fetch(`https://api.restful-api.dev/objects/${containerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'wesafe_global_reports', data: { reports: updated } })
        });
        if (putRes.ok) return;
      }

      // If PUT failed or container missing, auto-heal by POSTing a new container
      const postRes = await fetch('https://api.restful-api.dev/objects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'wesafe_global_reports', data: { reports: updated } })
      });
      if (postRes.ok) {
        const created = await postRes.json();
        if (created.id) {
          localStorage.setItem('wesafe_cloud_container_id', created.id);
        }
      }
    } catch (e) {
      console.warn('Cloud report sync notice:', e.message);
    }
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
      if (res.ok && data.success) {
        this.syncReportToCloud(data.data);
        return data.data;
      }
      throw new Error(data.message || 'Failed to submit report. Please check authentication.');
    } catch (err) {
      // If network failure / backend unreachable (e.g. testing frontend preview or backend offline)
      if (err.name === 'TypeError' || (err.message && (err.message.includes('fetch') || err.message.includes('Server unavailable')))) {
        console.warn('Backend server unreachable. Logging report in local storage & public cloud fallback:', err.message);
        
        const lat = parseFloat(reportData.latitude) || 28.5355;
        const lng = parseFloat(reportData.longitude) || 77.3910;
        const cat = reportData.category || 'Poor Lighting';

        const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
        
        // Haversine distance check for 1km proximity match
        const hasNearbyConsensus = existing.some(r => {
          if (r.category !== cat || r.status === 'Resolved') return false;
          const dLat = (r.latitude - lat) * (Math.PI / 180);
          const dLng = (r.longitude - lng) * (Math.PI / 180);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat * (Math.PI / 180)) * Math.cos(r.latitude * (Math.PI / 180)) *
                    Math.sin(dLng / 2) * Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return (6371 * c) <= 1.0; // within 1km
        });

        const status = 'Unresolved';
        const verStatus = 'Publicly Live';
        const effectiveSeverity = hasNearbyConsensus ? 'High' : (reportData.severity || 'Medium');
        const summary = hasNearbyConsensus
          ? `${reportData.ai_summary || 'Community hazard logged.'} • [Priority Boosted: 2+ community reports within 1km]`
          : (reportData.ai_summary || 'Community hazard logged.');

        // If 2+ reports within 1km, upgrade matching nearby reports to High severity
        const updatedExisting = existing.map(r => {
          if (r.category === cat && r.status !== 'Resolved') {
            const dLat = (r.latitude - lat) * (Math.PI / 180);
            const dLng = (r.longitude - lng) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat * (Math.PI / 180)) * Math.cos(r.latitude * (Math.PI / 180)) *
                      Math.sin(dLng / 2) * Math.sin(dLng / 2);
            if ((6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) <= 1.0) {
              return { ...r, severity: 'High' };
            }
          }
          return r;
        });

        const currentUser = this.getCurrentUser() || { name: 'Community Member' };

        const localReport = {
          id: Date.now(),
          user_id: currentUser.id || 1,
          user_name: currentUser.name || 'Community Member',
          title: reportData.title || 'Community Safety Hazard',
          category: cat,
          description: reportData.description || '',
          image_url: reportData.image_url || null,
          latitude: lat,
          longitude: lng,
          address: reportData.address || 'Captured Location',
          severity: effectiveSeverity,
          status: status,
          verification_status: verStatus,
          ai_summary: summary,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_offline_fallback: true
        };

        const updatedLocal = [localReport, ...updatedExisting];
        localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updatedLocal));
        
        // Sync report to public cloud store for cross-device visibility
        this.syncReportToCloud(localReport);

        // Dispatch event for instant UI refresh
        window.dispatchEvent(new CustomEvent('wesafe_report_added', { detail: localReport }));

        return localReport;
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

