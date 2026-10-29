import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('studentverse_token'));
  const [isLoading, setIsLoading] = useState(true);

  // Validate session on initial load
  useEffect(() => {
    async function verifySession() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/profile');
        if (res.success && res.student) {
          setStudent(res.student);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    verifySession();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success && res.token) {
      localStorage.setItem('studentverse_token', res.token);
      setToken(res.token);
      setStudent(res.student);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    if (res.success && res.token) {
      localStorage.setItem('studentverse_token', res.token);
      setToken(res.token);
      setStudent(res.student);
      return res;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('studentverse_token');
    setToken(null);
    setStudent(null);
  };

  const updateStudentProfile = async (updates) => {
    const res = await api.put('/auth/profile', updates);
    if (res.success && res.student) {
      setStudent(res.student);
      return res.student;
    }
    throw new Error(res.message || 'Failed to update profile');
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        token,
        isAuthenticated: !!token && !!student,
        isLoading,
        login,
        register,
        logout,
        updateStudentProfile,
        setStudent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
