import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');

      // If we have a token, try to fetch the current user from backend
      if (token) {
        try {
          const res = await authAPI.getCurrentUser();
          if (res?.success && res.user) {
            setUser(res.user);
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }
        } catch (error) {
          // Fall back to localStorage if available
          if (userData) {
            try {
              const parsedUser = JSON.parse(userData);
              setUser(parsedUser);
              setIsAuthenticated(true);
            } catch (e) {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('user_data');
            }
          } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
          }
        }
      } else if (userData) {
        // No token but have user data (likely mock mode)
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('user_data');
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login(email, password);
      if (res?.success && res.user) {
        setUser(res.user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {
      // proceed with local cleanup even if API fails
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('userRole');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData);
      if (res?.success && res.user) {
        // Ensure token and user are persisted if provided
        if (res.token) {
          localStorage.setItem('auth_token', res.token);
        }
        localStorage.setItem('user_data', JSON.stringify(res.user));
        localStorage.setItem('userRole', res.user.role);

        setUser(res.user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;