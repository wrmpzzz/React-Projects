// components/KanbanBoard/KanbanBoard.tsx

import React from 'react';
import { useKanbanBoard, useDragAndDrop, useTaskForm } from '../../hooks';
import { KanbanColumn } from '../KanbanColumn';
import type { Column } from '../../types';

export const KanbanBoard: React.FC = () => {
  // Custom hooks
  const { columns, moveTask, addTask, deleteTask, getTotalTasks } = useKanbanBoard();
  const { 
    draggedOverColumn, 
    handleDragStart, 
    handleDragOver, 
    handleDragLeave, 
    handleDrop 
  } = useDragAndDrop(moveTask);
  const { 
    showNewTaskForm, 
    newTask, 
    handleInputChange, 
    resetForm, 
    openForm 
  } = useTaskForm();

  // Handle adding a new task
  const handleAddTask = (columnId: string): void => {
    if (newTask.title.trim() === '') return;
    
    addTask(columnId, {
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority
    });
    resetForm();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            ⚡ Kanban Board
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Arrastra las tarjetas entre columnas para organizarlas
          </p>
          
          <div className="inline-flex items-center space-x-4 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-full px-6 py-2 border border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-blue-400">📊</span>
              <span className="text-gray-300 text-sm">
                Total de tareas: <span className="text-white font-semibold">{getTotalTasks()}</span>
              </span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">📈</span>
              <span className="text-gray-300 text-sm">
                Columnas: <span className="text-white font-semibold">{columns.length}</span>
              </span>
            </div>
          </div>
        </header>

        <section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="application"
          aria-label="Kanban board with drag and drop functionality"
        >
          {columns.map((column: Column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              draggedOverColumn={draggedOverColumn}
              showNewTaskForm={showNewTaskForm}
              newTask={newTask}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDeleteTask={deleteTask}
              onOpenForm={openForm}
              onInputChange={handleInputChange}
              onAddTask={handleAddTask}
              onCancelForm={resetForm}
            />
          ))}
        </section>

        {/* Footer with instructions */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🖱️</span>
              <span>Arrastra las tarjetas para moverlas</span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">➕</span>
              <span>Haz clic en "Agregar" para crear tareas</span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🗑️</span>
              <span>Hover sobre las tarjetas para eliminarlas</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};