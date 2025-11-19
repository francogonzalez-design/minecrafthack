// src/pages/Projects.tsx
import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import { projectService } from '../services/projectService';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import Modal from '../components/common/Modal';
import Card from '../components/common/Card';

// Definir el tipo para los datos del formulario
interface ProjectFormData {
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getProjects();
      setProjects(response.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      alert('Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData: ProjectFormData) => {
    try {
      setFormLoading(true);
      await projectService.createProject(projectData);
      await loadProjects();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error al crear proyecto');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProject = async (projectData: ProjectFormData) => {
    if (!editingProject) return;
    
    try {
      setFormLoading(true);
      await projectService.updateProject(editingProject.id, projectData);
      await loadProjects();
      setShowModal(false);
      setEditingProject(undefined);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error al actualizar proyecto');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return;

    try {
      await projectService.deleteProject(projectId);
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error al eliminar proyecto');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleCreateNew = () => {
    setEditingProject(undefined);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Card>
          <ProjectList
            projects={projects}
            loading={loading}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onCreateProject={handleCreateNew}
          />
        </Card>

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingProject ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
        >
          <ProjectForm
            project={editingProject}
            onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
            onCancel={handleCloseModal}
            loading={formLoading}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Projects;