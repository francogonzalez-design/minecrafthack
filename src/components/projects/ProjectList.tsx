// src/components/projects/ProjectList.tsx
import React from 'react';
import type { Project } from '../../types';
import ProjectCard from './ProjectCard';
import Button from '../common/Button';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onCreateProject: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loading,
  onEditProject,
  onDeleteProject,
  onCreateProject
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Cargando proyectos...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Proyectos</h2>
        <Button onClick={onCreateProject}>
          + Nuevo Proyecto
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No hay proyectos creados</p>
          <Button onClick={onCreateProject}>
            Crear primer proyecto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;