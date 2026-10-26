import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';

const SafetyContext = createContext();

export const SafetyProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [sosActive, setSosActive] = useState(false);
  const [sosDetails, setSosDetails] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 28.535517, lng: 77.391029, address: 'Sector 12, Main Market Road' });
  const [locationPermission, setLocationPermission] = useState('granted');
  const [loadingReports, setLoadingReports] = useState(true);
  const isInitialMount = useRef(true);

  // Fetch initial reports & contacts, setup live sync polling and geolocation
  useEffect(() => {
    loadData(true);

    // Try browser geolocation if available
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: 'Detected Live GPS Location'
          });
          setLocationPermission('granted');
        },
        () => {
          setLocationPermission('default');
        }
      );
    }

    // Periodic Background Polling (Every 4 seconds) to sync reports and safety index live across all users
    const pollInterval = setInterval(() => {
      loadData(false);
    }, 4000);

    // Event listeners for dynamic cross-tab / instant report sync
    const handleReportAdded = () => {
      loadData(false);
    };
    window.addEventListener('wesafe_report_added', handleReportAdded);
    window.addEventListener('storage', handleReportAdded);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('wesafe_report_added', handleReportAdded);
      window.removeEventListener('storage', handleReportAdded);
    };
  }, []);

  const loadData = async (showLoading = false) => {
    if (showLoading && isInitialMount.current) {
      setLoadingReports(true);
    }
    try {
      const [reportsData, contactsData] = await Promise.all([
        apiService.getReports(),
        apiService.getContacts()
      ]);
      setReports(reportsData);
      setContacts(contactsData);
    } catch (e) {
      console.warn('Live community reports sync notice:', e.message);
    } finally {
      if (showLoading && isInitialMount.current) {
        setLoadingReports(false);
        isInitialMount.current = false;
      }
    }
  };

  const triggerSOS = () => {
    const alertData = {
      triggeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      location: currentLocation,
      notifiedContacts: contacts.map(c => ({ name: c.name, phone: c.phone, status: 'Alert Sent' }))
    };
    setSosDetails(alertData);
    setSosActive(true);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setSosDetails(null);
  };

  const addReport = async (reportData) => {
    const created = await apiService.createReport(reportData);
    setReports(prev => [created, ...prev]);
    // Immediate background reload to sync consensus and database state
    loadData(false);
    window.dispatchEvent(new CustomEvent('wesafe_report_added', { detail: created }));
    return created;
  };

  const addContact = async (contactData) => {
    const created = await apiService.addContact(contactData);
    setContacts(prev => [...prev, created]);
    return created;
  };

  const deleteContact = async (id) => {
    await apiService.deleteContact(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // Calculate Community Safety Insight score (0 to 100) dynamically based on active unresolved reports & proximity
  const calculateSafetyScore = (centerLoc = currentLocation) => {
    if (!reports.length) return 92;

    let score = 95;

    reports.forEach(r => {
      if (r.status === 'Resolved') return;

      const rLat = parseFloat(r.latitude);
      const rLng = parseFloat(r.longitude);

      let proximityMultiplier = 1.0;
      if (centerLoc && centerLoc.lat && centerLoc.lng && !isNaN(rLat) && !isNaN(rLng)) {
        const dLat = (rLat - centerLoc.lat) * 111;
        const dLng = (rLng - centerLoc.lng) * 111 * Math.cos((centerLoc.lat * Math.PI) / 180);
        const distKm = Math.sqrt(dLat * dLat + dLng * dLng);
        if (distKm <= 1.0) {
          proximityMultiplier = 2.0; // Nearby reports heavily impact local index
        } else if (distKm <= 3.0) {
          proximityMultiplier = 1.4;
        } else if (distKm > 20.0) {
          proximityMultiplier = 0.6;
        }
      }

      if (r.severity === 'Critical') {
        score -= (12 * proximityMultiplier);
      } else if (r.severity === 'High') {
        score -= (8 * proximityMultiplier);
      } else if (r.severity === 'Medium') {
        score -= (4 * proximityMultiplier);
      } else {
        score -= (2 * proximityMultiplier);
      }
    });

    return Math.max(35, Math.min(99, Math.round(score)));
  };

  return (
    <SafetyContext.Provider value={{
      reports,
      contacts,
      sosActive,
      sosDetails,
      currentLocation,
      locationPermission,
      loadingReports,
      triggerSOS,
      cancelSOS,
      addReport,
      addContact,
      deleteContact,
      reloadReports: () => loadData(false),
      safetyScore: calculateSafetyScore(),
      calculateSafetyScore
    }}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => useContext(SafetyContext);
