import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Fetch initial reports & contacts
  useEffect(() => {
    loadData();

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

    // Event listeners for dynamic cross-tab / instant report sync
    const handleReportAdded = () => {
      loadData();
    };
    window.addEventListener('wesafe_report_added', handleReportAdded);
    window.addEventListener('storage', handleReportAdded);

    return () => {
      window.removeEventListener('wesafe_report_added', handleReportAdded);
      window.removeEventListener('storage', handleReportAdded);
    };
  }, []);

  const loadData = async () => {
    setLoadingReports(true);
    try {
      const [reportsData, contactsData] = await Promise.all([
        apiService.getReports(),
        apiService.getContacts()
      ]);
      setReports(reportsData);
      setContacts(contactsData);
    } catch (e) {
      console.warn('Data load warning:', e);
    } finally {
      setLoadingReports(false);
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

  // Calculate Community Safety Insight score (0 to 100)
  const calculateSafetyScore = () => {
    if (!reports.length) return 85;
    const unresolvedHigh = reports.filter(r => r.status !== 'Resolved' && (r.severity === 'High' || r.severity === 'Critical')).length;
    const unresolvedMedium = reports.filter(r => r.status !== 'Resolved' && r.severity === 'Medium').length;
    const score = Math.max(45, Math.min(95, 95 - (unresolvedHigh * 8) - (unresolvedMedium * 3)));
    return score;
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
      reloadReports: loadData,
      safetyScore: calculateSafetyScore()
    }}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => useContext(SafetyContext);
