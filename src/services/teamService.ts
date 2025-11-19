// src/services/teamService.ts
import { api } from './api';
import type  { User, Task } from '../types';

export const teamService = {
  async getMembers(): Promise<User[]> {
    const response = await api.get('/team/members');
    return response.data.members || [];
  },

  async getMemberTasks(memberId: string): Promise<Task[]> {
    const response = await api.get(`/team/members/${memberId}/tasks`);
    return response.data.tasks || [];
  }
};