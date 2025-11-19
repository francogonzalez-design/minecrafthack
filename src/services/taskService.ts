// src/services/taskService.ts
import { api } from './api';
import type { Task, PaginatedResponse, DashboardStats, Project } from '../types';

export const taskService = {
  async getTasks(params?: {
    page?: number;
    limit?: number;
    projectId?: string;
    status?: string;
    priority?: string;
    search?: string; // Agregar soporte para búsqueda
  }): Promise<PaginatedResponse<Task>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.projectId) queryParams.append('projectId', params.projectId);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.priority) queryParams.append('priority', params.priority);
    if (params?.search) queryParams.append('search', params.search); // Agregar búsqueda

    const response = await api.get(`/tasks?${queryParams}`);
    return response.data;
  },

  // ... resto de los métodos permanece igual
  async getTask(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(taskData: {
    title: string;
    description: string;
    projectId: string;
    priority: string;
    dueDate: string;
    assignedTo?: string;
  }): Promise<Task> {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  async updateTaskStatus(id: string, status: string): Promise<Task> {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async getDashboardStats(): Promise<DashboardStats> {
    // Como no hay endpoint específico, simularemos con datos de tareas y proyectos
    const tasksResponse = await api.get('/tasks?limit=1000');
    const projectsResponse = await api.get('/projects?limit=1000');
    
    const tasks = tasksResponse.data.tasks || [];
    const projects = projectsResponse.data.projects || [];
    
    const now = new Date();
    
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter((task: Task) => task.status === 'COMPLETED').length,
      pendingTasks: tasks.filter((task: Task) => task.status !== 'COMPLETED').length,
      overdueTasks: tasks.filter((task: Task) => 
        task.status !== 'COMPLETED' && new Date(task.dueDate) < now
      ).length,
      totalProjects: projects.length,
      activeProjects: projects.filter((project: Project) => project.status === 'ACTIVE').length,
    };
  }
};