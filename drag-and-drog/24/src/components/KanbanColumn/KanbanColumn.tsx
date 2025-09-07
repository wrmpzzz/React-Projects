// components/KanbanColumn/KanbanColumn.tsx

import React from 'react';
import { TaskCard } from '../TaskCard';
import { AddTaskForm } from '../AddTaskForm';
import type { KanbanColumnProps, Task } from '../../types';

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  draggedOverColumn,
  showNewTaskForm,
  newTask,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDeleteTask,
  onOpenForm,
  onInputChange,
  onAddTask,
  onCancelForm
}) => {
  const isHighlighted = draggedOverColumn === column.id;
  const isFormOpen = showNewTaskForm === column.id;

  return (
    <div
      className={`${column.color} rounded-2xl border-2 p-6 min-h-[600px] transition-all duration-300 shadow-2xl ${
        isHighlighted
          ? 'ring-4 ring-purple-400 ring-opacity-50 scale-105 shadow-purple-500/25'
          : 'hover:shadow-3xl'
      }`}
      onDragOver={(e) => onDragOver(e, column.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, column.id)}
      role="region"
      aria-label={`${column.title} column with ${column.tasks.length} tasks`}
    >
      {/* Column Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span 
            className="text-2xl" 
            role="img" 
            aria-label={`${column.title} icon`}
          >
            {column.icon}
          </span>
          <h2 className="font-bold text-white text-xl">
            {column.title}
          </h2>
        </div>
        
        {/* Task Counter */}
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white font-semibold" aria-label={`${column.tasks.length} tasks`}>
            {column.tasks.length}
          </span>
        </div>
      </header>

      <div 
        className="space-y-4"
        role="list"
        aria-label={`Tasks in ${column.title}`}
      >
        {column.tasks.map((task: Task) => (
          <div key={task.id} role="listitem">
            <TaskCard
              task={task}
              columnId={column.id}
              onDragStart={onDragStart}
              onDelete={onDeleteTask}
            />
          </div>
        ))}

        {/* Add New Task Form or Button */}
        {isFormOpen ? (
          <AddTaskForm
            columnId={column.id}
            newTask={newTask}
            onInputChange={onInputChange}
            onSubmit={onAddTask}
            onCancel={onCancelForm}
          />
        ) : (
          <AddTaskButton 
            columnTitle={column.title}
            onClick={() => onOpenForm(column.id)}
          />
        )}
      </div>
    </div>
  );
};

// Sub-component for Add Task Button
interface AddTaskButtonProps {
  columnTitle: string;
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ columnTitle, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white bg-opacity-10 backdrop-blur-sm border-2 border-dashed border-gray-500 rounded-xl p-5 text-gray-300 hover:bg-opacity-20 hover:border-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 font-semibold group"
      type="button"
      aria-label={`Add new task to ${columnTitle}`}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="group-hover:scale-110 transition-transform duration-200"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <span>Agregar nueva tarea</span>
    </button>
  );
};