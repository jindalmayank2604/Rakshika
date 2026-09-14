import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize Auth State from API / session
  useEffect(() => {
    const initAuth = async () => {
      try {
        const guestFlag = localStorage.getItem('rakshika_guest');
        if (guestFlag === 'true') {
          setIsGuest(true);
          setUser(null);
          setLoading(false);
          return;
        }

        // Check if cached user or token exists
        const cachedUser = apiService.getCurrentUser();
        if (cachedUser) {
          setUser(cachedUser);
        }

        // Verify with backend /me endpoint
        const freshUser = await apiService.getMe();
        if (freshUser) {
          setUser(freshUser);
          setIsGuest(false);
        } else if (!cachedUser) {
          // No user logged in
          setUser(null);
        }
      } catch (err) {
        console.warn('Auth session check notice:', err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiService.login(email, password);
      setUser(res.user);
      setIsGuest(false);
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
      setIsGuest(false);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiService.logout();
    setUser(null);
    setIsGuest(false);
  };

  const continueAsGuest = () => {
    localStorage.setItem('rakshika_guest', 'true');
    localStorage.removeItem('rakshika_token');
    localStorage.removeItem('rakshika_user');
    setUser(null);
    setIsGuest(true);
  };

  const updateProfileData = async (updatedFields) => {
    try {
      const updatedUser = await apiService.updateProfile(updatedFields);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      // Fallback local update if offline
      const updated = { ...user, ...updatedFields };
      setUser(updated);
      localStorage.setItem('rakshika_user', JSON.stringify(updated));
      return updated;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isGuest, 
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      loading, 
      login, 
      register, 
      logout, 
      continueAsGuest, 
      updateProfileData 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

