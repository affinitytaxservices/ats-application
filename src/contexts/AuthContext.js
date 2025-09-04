import React, { createContext, useContext, useState, useEffect } from 'react';

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
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual authentication
      const mockUser = {
        id: 1,
        email: email,
        firstName: 'John',
        lastName: 'Doe',
        role: email.includes('admin') ? 'admin' : 'client'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store in localStorage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      localStorage.setItem('userRole', mockUser.role);
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData) => {
    try {
      // Simulate API call - replace with actual registration
      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'client'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store in localStorage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(newUser));
      localStorage.setItem('userRole', newUser.role);
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
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