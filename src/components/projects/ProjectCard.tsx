// src/components/projects/ProjectCard.tsx
import React from 'react';
import type { Project } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status === 'ACTIVE' ? 'Activo' : 
           project.status === 'COMPLETED' ? 'Completado' : 'En Pausa'}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description || 'Sin descripción'}
      </p>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Creado: {new Date(project.createdAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onEdit(project)}
          >
            Editar
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => onDelete(project.id)}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;