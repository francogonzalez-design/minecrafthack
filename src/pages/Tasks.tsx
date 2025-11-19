// src/pages/Tasks.tsx
import React, { useState, useEffect } from 'react';
import type { Task, Project } from '../types';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/common/Modal';
import Card from '../components/common/Card';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [formLoading, setFormLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    projectId: '',
    search: '' // Agregar la propiedad search
  });

  useEffect(() => {
    loadTasks();
    loadProjects();
  }, [filters]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks({
        ...filters,
        limit: 50
      });
      setTasks(response.tasks || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
      alert('Error al cargar tareas');
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await projectService.getProjects(1, 100);
      setProjects(response.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleCreateTask = async (taskData: any) => {
    try {
      setFormLoading(true);
      await taskService.createTask(taskData);
      await loadTasks();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error al crear tarea');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTask = async (taskData: any) => {
    if (!editingTask) return;
    
    try {
      setFormLoading(true);
      await taskService.updateTask(editingTask.id, taskData);
      await loadTasks();
      setShowModal(false);
      setEditingTask(undefined);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error al actualizar tarea');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return;

    try {
      await taskService.deleteTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error al eliminar tarea');
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: string) => {
    try {
      await taskService.updateTaskStatus(taskId, status);
      await loadTasks(); // Recargar para reflejar cambios
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Error al actualizar estado de tarea');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCreateNew = () => {
    setEditingTask(undefined);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(undefined);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Card>
          <TaskList
            tasks={tasks}
            loading={loading}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onCreateTask={handleCreateNew}
            filters={filters}
            onFilterChange={handleFilterChange}
            projects={projects}
          />
        </Card>

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingTask ? 'Editar Tarea' : 'Crear Nueva Tarea'}
        >
          <TaskForm
            task={editingTask}
            projects={projects}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCloseModal}
            loading={formLoading}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Tasks;
