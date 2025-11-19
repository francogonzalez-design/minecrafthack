import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    await onSubmit(formData.name, formData.email, formData.password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear Cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          O{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            iniciar sesión en tu cuenta
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <Input
              label="Nombre Completo"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@ejemplo.com"
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <Input
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Crear Cuenta
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;