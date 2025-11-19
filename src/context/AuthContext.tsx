// src/context/AuthContext.tsx
import React,{ createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';
import { TOKEN_KEY } from '../utils/constants';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      
      if (storedToken) {
        try {
          const userProfile = await authService.getProfile();
          setUser(userProfile);
          setToken(storedToken);
        } catch (error) {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem(TOKEN_KEY, response.token);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authService.register(name, email, password);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem(TOKEN_KEY, response.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authService.logout();
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};