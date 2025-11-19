// src/components/common/ErrorMessage.tsx
import React from 'react';
import Button from './Button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Error', 
  message, 
  onRetry, 
  onDismiss 
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-red-400 text-lg">⚠️</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="text-sm text-red-700 mt-1">
            <p>{message}</p>
          </div>
          <div className="flex space-x-3 mt-3">
            {onRetry && (
              <Button variant="primary" size="sm" onClick={onRetry}>
                Reintentar
              </Button>
            )}
            {onDismiss && (
              <Button variant="secondary" size="sm" onClick={onDismiss}>
                Cerrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;