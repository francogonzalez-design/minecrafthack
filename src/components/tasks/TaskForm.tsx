// src/components/tasks/TaskForm.tsx
import React, { useState } from 'react';
import type { Task, Project } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import { useValidation } from '../../hooks/useValidation';

interface TaskFormProps {
  task?: Task;
  projects: Project[];
  onSubmit: (taskData: any) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, projects, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    priority: 'MEDIUM' as const,
    dueDate: '',
    assignedTo: ''
  });

  const { errors, validate, clearErrors } = useValidation({
    title: { required: true, minLength: 3, maxLength: 100 },
    description: { maxLength: 500 },
    projectId: { required: true },
    dueDate: { 
      required: true,
      custom: (value) => {
        if (value && new Date(value) < new Date()) {
          return 'La fecha no puede ser en el pasado';
        }
        return null;
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate(formData)) {
      return;
    }

    try {
      await onSubmit(formData);
      clearErrors();
    } catch (error) {
      // El error se maneja en el componente padre
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      clearErrors();
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Título de la Tarea *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Ej: Implementar sistema de login"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe los detalles de la tarea..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {formData.description.length}/500 caracteres
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proyecto *
          </label>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.projectId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Seleccionar proyecto</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          {errors.projectId && (
            <p className="mt-1 text-sm text-red-600">{errors.projectId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
            <option value="URGENT">Urgente</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha Límite *
        </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          min={minDate}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.dueDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          {task ? 'Actualizar' : 'Crear'} Tarea
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;