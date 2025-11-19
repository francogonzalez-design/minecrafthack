// src/services/authService.ts
import { api } from './api';
import type { User, LoginResponse } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
  }
};