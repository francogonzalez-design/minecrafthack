// src/components/projects/ProjectForm.tsx
import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';

// Definir el tipo para los datos del formulario
interface ProjectFormData {
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
}

interface ProjectFormProps {
  project?: Project;
  onSubmit: (projectData: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || '',
        status: project.status
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre del Proyecto"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Ej: Desarrollo de App Móvil"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe los objetivos del proyecto..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="ACTIVE">Activo</option>
          <option value="ON_HOLD">En Pausa</option>
          <option value="COMPLETED">Completado</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          {project ? 'Actualizar' : 'Crear'} Proyecto
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;