import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';


const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError('');

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />;
};

export default Register;