// src/services/api.ts
import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY } from '../utils/constants';

// Configurar axios con la URL base desde las variables de entorno
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos timeout
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      // Redirigir al login solo si estamos en el cliente
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Función para probar la conexión con el backend
export const testBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await api.get('/auth/profile');
    return response.status === 200;
  } catch (error) {
    console.error('Error conectando con el backend:', error);
    return false;
  }
};