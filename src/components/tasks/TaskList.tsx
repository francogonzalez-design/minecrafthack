// src/components/tasks/TaskList.tsx
import React, { useState } from 'react';
import type { Task } from '../../types';
import TaskCard from './TaskCard';
import Button from '../common/Button';
import Input from '../common/Input';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, status: string) => void;
  onCreateTask: () => void;
  filters: {
    status: string;
    priority: string;
    projectId: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
  projects: any[];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onEditTask,
  onDeleteTask,
  onUpdateTaskStatus,
  onCreateTask,
  filters,
  onFilterChange,
  projects
}) => {
  const [searchInput, setSearchInput] = useState(filters.search || '');

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    // Debounce search
    setTimeout(() => {
      onFilterChange({ ...filters, search: value });
    }, 300);
  };

  const clearAllFilters = () => {
    setSearchInput('');
    onFilterChange({ status: '', priority: '', projectId: '', search: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Cargando tareas...</div>
      </div>
    );
  }

  const hasActiveFilters = filters.status || filters.priority || filters.projectId || filters.search;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tareas</h2>
        <Button onClick={onCreateTask}>
          + Nueva Tarea
        </Button>
      </div>

      {/* Filtros Avanzados */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Búsqueda */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar por título..."
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="TODO">Por Hacer</option>
              <option value="IN_PROGRESS">En Progreso</option>
              <option value="COMPLETED">Completadas</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
              <option value="URGENT">Urgente</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
            <select
              value={filters.projectId}
              onChange={(e) => onFilterChange({ ...filters, projectId: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Filtros activos */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Filtros activos:</span>
              {filters.status && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Estado: {filters.status === 'TODO' ? 'Por Hacer' : filters.status === 'IN_PROGRESS' ? 'En Progreso' : 'Completadas'}
                </span>
              )}
              {filters.priority && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Prioridad: {filters.priority}
                </span>
              )}
              {filters.projectId && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Proyecto: {projects.find(p => p.id === filters.projectId)?.name}
                </span>
              )}
              {filters.search && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Búsqueda: "{filters.search}"
                </span>
              )}
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={clearAllFilters}
            >
              Limpiar Todo
            </Button>
          </div>
        )}
      </div>

      {/* Resultados */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          {tasks.length} {tasks.length === 1 ? 'tarea encontrada' : 'tareas encontradas'}
          {hasActiveFilters && ' con los filtros aplicados'}
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <p className="text-gray-500 mb-4">
            {hasActiveFilters 
              ? 'No hay tareas que coincidan con los filtros aplicados' 
              : 'No hay tareas creadas'
            }
          </p>
          {hasActiveFilters ? (
            <Button onClick={clearAllFilters}>
              Limpiar filtros
            </Button>
          ) : (
            <Button onClick={onCreateTask}>
              Crear primera tarea
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onUpdateStatus={onUpdateTaskStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;