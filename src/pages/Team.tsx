// src/pages/Team.tsx
import React, { useState, useEffect } from 'react';
import type { User, Task } from '../types';
import { teamService } from '../services/teamService';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const Team: React.FC = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [memberTasks, setMemberTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const membersData = await teamService.getMembers();
      setMembers(membersData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar miembros del equipo');
    } finally {
      setLoading(false);
    }
  };

  const loadMemberTasks = async (member: User) => {
    try {
      setTasksLoading(true);
      setSelectedMember(member);
      const tasks = await teamService.getMemberTasks(member.id);
      setMemberTasks(tasks);
    } catch (err: any) {
      setError('Error al cargar tareas del miembro');
    } finally {
      setTasksLoading(false);
    }
  };

  if (loading) return <Loading text="Cargando equipo..." />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Equipo</h1>

        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={loadMembers}
            onDismiss={() => setError(null)}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de miembros */}
          <Card className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Miembros del Equipo</h2>
            <div className="space-y-3">
              {members.map(member => (
                <div
                  key={member.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMember?.id === member.id
                      ? 'bg-blue-100 border border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => loadMemberTasks(member)}
                >
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Tareas del miembro seleccionado */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              {selectedMember ? `Tareas de ${selectedMember.name}` : 'Selecciona un miembro'}
            </h2>

            {tasksLoading ? (
              <Loading text="Cargando tareas..." />
            ) : selectedMember ? (
              memberTasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {selectedMember.name} no tiene tareas asignadas
                </p>
              ) : (
                <div className="space-y-3">
                  {memberTasks.map(task => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status === 'COMPLETED' ? 'Completada' : 
                           task.status === 'IN_PROGRESS' ? 'En Progreso' : 'Por Hacer'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Prioridad: {task.priority}</span>
                        <span>Vence: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <p className="text-gray-500 text-center py-8">
                Selecciona un miembro del equipo para ver sus tareas
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;