import { useState, useCallback } from 'react';

export const useApi = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en la petición');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};