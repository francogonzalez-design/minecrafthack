// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import type { DashboardStats, Project, Task } from '../types';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Cargar estadísticas
        const statsData = await taskService.getDashboardStats();
        setStats(statsData);
        
        // Cargar tareas recientes (últimas 5)
        const tasksResponse = await taskService.getTasks({ limit: 5 });
        setRecentTasks(tasksResponse.tasks || []);
        
        // Cargar proyectos recientes (últimos 3)
        const projectsResponse = await projectService.getProjects(1, 3);
        setRecentProjects(projectsResponse.projects || []);
        
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getCompletionPercentage = () => {
    if (!stats || stats.totalTasks === 0) return 0;
    return Math.round((stats.completedTasks / stats.totalTasks) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bienvenido de vuelta, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="secondary" onClick={logout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Estadísticas */}
        {stats && (
          <div className="px-4 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalTasks}</div>
                <div className="text-gray-600">Total Tareas</div>
              </Card>
              
              <Card className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
                <div className="text-gray-600">Completadas</div>
              </Card>
              
              <Card className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.pendingTasks}</div>
                <div className="text-gray-600">Pendientes</div>
              </Card>
              
              <Card className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.overdueTasks}</div>
                <div className="text-gray-600">Vencidas</div>
              </Card>
            </div>

            {/* Barra de progreso */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">Progreso General</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{getCompletionPercentage()}% completado</span>
                <span>{stats.completedTasks} de {stats.totalTasks} tareas</span>
              </div>
            </Card>
          </div>
        )}

        {/* Acciones rápidas y contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
          {/* Acciones rápidas */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <Link to="/tasks">
                <Button variant="primary" className="w-full justify-center">
                  📋 Ver Todas las Tareas
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary" className="w-full justify-center">
                  📁 Gestionar Proyectos
                </Button>
              </Link>
              <Link to="/tasks">
                <Button variant="secondary" className="w-full justify-center">
                  ➕ Nueva Tarea
                </Button>
              </Link>
            </div>
          </Card>

          {/* Tareas recientes */}
          <Card className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tareas Recientes</h3>
              <Link to="/tasks" className="text-blue-600 hover:text-blue-800 text-sm">
                Ver todas →
              </Link>
            </div>
            
            {recentTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay tareas recientes</p>
            ) : (
              <div className="space-y-3">
                {recentTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500">
                        Vence: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status === 'COMPLETED' ? 'Completada' : 
                       task.status === 'IN_PROGRESS' ? 'En Progreso' : 'Por Hacer'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Proyectos recientes */}
          <Card className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Proyectos Recientes</h3>
              <Link to="/projects" className="text-blue-600 hover:text-blue-800 text-sm">
                Ver todos →
              </Link>
            </div>
            
            {recentProjects.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay proyectos creados</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentProjects.map(project => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{project.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {project.description || 'Sin descripción'}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status === 'ACTIVE' ? 'Activo' : 
                       project.status === 'COMPLETED' ? 'Completado' : 'En Pausa'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;