import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [authState, setAuthState] = useState({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (userData && userData.id) {
          setAuthState({
            user: userData,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Authentication failed. Please log in again.',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        username: email.split('@')[0],
        email,
        role: Math.random() > 0.5 ? 'doctor' : 'patient',
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
        specialization: 'General Psychiatry',
        availability: true
      };

      const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);

      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      setAuthState({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error('Login failed:', error);
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Invalid email or password. Please try again.' 
      }));

      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  const signup = async (username, email, password, role, name, specialization) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        username,
        email,
        role,
        name,
        createdAt: new Date().toISOString(),
        specialization: role === 'doctor' ? specialization : undefined,
        availability: role === 'doctor' ? true : undefined
      };

      const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);

      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      setAuthState({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      toast({
        title: "Signup successful",
        description: `Welcome, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error('Signup failed:', error);
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Signup failed. Please try again with different credentials.' 
      }));

      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Please try again with different credentials.",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
