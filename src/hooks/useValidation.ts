// src/hooks/useValidation.ts
import { useState } from 'react';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export const useValidation = (rules: Record<string, ValidationRules>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: Record<string, any>): boolean => {
    const newErrors: Record<string, string> = {};

    Object.keys(rules).forEach(field => {
      const value = data[field];
      const fieldRules = rules[field];

      if (fieldRules.required && (!value || value.toString().trim() === '')) {
        newErrors[field] = 'Este campo es requerido';
        return;
      }

      if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
        newErrors[field] = `Mínimo ${fieldRules.minLength} caracteres`;
        return;
      }

      if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
        newErrors[field] = `Máximo ${fieldRules.maxLength} caracteres`;
        return;
      }

      if (value && fieldRules.pattern && !fieldRules.pattern.test(value)) {
        newErrors[field] = 'Formato inválido';
        return;
      }

      if (value && fieldRules.custom) {
        const customError = fieldRules.custom(value);
        if (customError) {
          newErrors[field] = customError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => setErrors({});

  return { errors, validate, clearErrors };
};