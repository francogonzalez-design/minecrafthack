import React from 'react';
import type { Task } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onUpdateStatus }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO': return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'bg-blue-100 text-blue-800';
      case 'MEDIUM': return 'bg-green-100 text-green-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'URGENT': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED';

  return (
    <Card className={`hover:shadow-lg transition-shadow ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status === 'TODO' ? 'Por Hacer' : 
             task.status === 'IN_PROGRESS' ? 'En Progreso' : 'Completada'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.description || 'Sin descripción'}
      </p>
      
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
          Vence: {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && ' ⚠️'}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1"
        >
          <option value="TODO">Por Hacer</option>
          <option value="IN_PROGRESS">En Progreso</option>
          <option value="COMPLETED">Completada</option>
        </select>
        
        <div className="flex space-x-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onEdit(task)}
          >
            Editar
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => onDelete(task.id)}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;