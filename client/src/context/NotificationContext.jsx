import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const list = await apiService.getNotifications();
    setNotifications(list);
  };

  const markAsRead = (id) => {
    const updated = apiService.markNotificationRead(id);
    setNotifications(updated);
  };

  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const addNotification = ({ title, message, type = 'info' }) => {
    showToast(`${title ? title + ': ' : ''}${message}`, type);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      showToast,
      addNotification,
      toasts
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
export const useNotification = useNotifications;
