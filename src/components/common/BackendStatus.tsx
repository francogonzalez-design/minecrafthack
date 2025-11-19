// src/components/common/BackendStatus.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const BackendStatus: React.FC = () => {
  const { backendConnected } = useAuth();

  if (backendConnected) {
    return null; // No mostrar nada si está conectado
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-red-400">⚠️</span>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Backend no disponible
          </h3>
          <div className="text-sm text-red-700 mt-1">
            <p>
              No se puede conectar con el servidor. Algunas funciones pueden no estar disponibles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendStatus;