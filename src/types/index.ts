// src/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string;
  projectId: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  project?: Project;
  assignedUser?: User;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  projects?: T[];
  tasks?: T[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  totalProjects: number;
  activeProjects: number;
}
export interface CreateProjectData {
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
}

export interface CreateTaskData {
  title: string;
  description: string;
  projectId: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string;
  assignedTo?: string;
}
export interface TaskFilters {
  status?: string;
  priority?: string;
  projectId?: string;
  search?: string;
}