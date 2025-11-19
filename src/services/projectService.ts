// src/services/projectService.ts
import { api } from './api';
import type { Project, PaginatedResponse } from '../types';

export interface CreateProjectData {
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
}

export const projectService = {
  async getProjects(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedResponse<Project>> {
    const response = await api.get(`/projects?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
  },

  async getProject(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  async createProject(projectData: CreateProjectData): Promise<Project> {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  async updateProject(id: string, projectData: Partial<CreateProjectData>): Promise<Project> {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }
};