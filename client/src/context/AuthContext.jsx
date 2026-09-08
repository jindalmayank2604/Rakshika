import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = apiService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Default demo user initialized for rich seamless review
      const demoUser = {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98123 45678',
        role: 'user',
        profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
      };
      localStorage.setItem('rakshika_user', JSON.stringify(demoUser));
      localStorage.setItem('rakshika_token', 'demo_active_token');
      setUser(demoUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiService.login(email, password);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, phone, password) => {
    setLoading(true);
    try {
      const res = await apiService.register(name, email, phone, password);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  const updateProfileData = (updatedFields) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem('rakshika_user', JSON.stringify(updated));
  };

  const switchRole = (role) => {
    const updated = {
      ...user,
      role,
      name: role === 'admin' ? 'Rakshika Admin' : 'Priya Sharma',
      email: role === 'admin' ? 'admin@rakshika.org' : 'priya@example.com'
    };
    setUser(updated);
    localStorage.setItem('rakshika_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfileData, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
