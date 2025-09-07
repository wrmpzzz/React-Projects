// components/AddTaskForm/AddTaskForm.tsx

import React from 'react';
import type { AddTaskFormProps, Priority } from '../../types';

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  columnId,
  newTask,
  onInputChange,
  onSubmit,
  onCancel
}) => {
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (newTask.title.trim() === '') return;
    onSubmit(columnId);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onCancel();
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-600"
      onKeyDown={handleKeyDown}
    >
      <div className="space-y-3">
        {/* Title Input */}
        <div>
          <label htmlFor={`task-title-${columnId}`} className="sr-only">
            Título de la tarea
          </label>
          <input
            id={`task-title-${columnId}`}
            type="text"
            placeholder="Título de la tarea"
            value={newTask.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange('title', e.target.value)
            }
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
            autoFocus
            maxLength={100}
            required
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label htmlFor={`task-description-${columnId}`} className="sr-only">
            Descripción de la tarea
          </label>
          <textarea
            id={`task-description-${columnId}`}
            placeholder="Descripción (opcional)"
            value={newTask.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onInputChange('description', e.target.value)
            }
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none placeholder-gray-400"
            rows={3}
            maxLength={500}
          />
        </div>

        {/* Priority Select */}
        <div>
          <label htmlFor={`task-priority-${columnId}`} className="sr-only">
            Prioridad de la tarea
          </label>
          <select
            id={`task-priority-${columnId}`}
            value={newTask.priority}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onInputChange('priority', e.target.value as Priority)
            }
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="low">🟢 Baja Prioridad</option>
            <option value="medium">🟡 Media Prioridad</option>
            <option value="high">🔴 Alta Prioridad</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-4">
        <button
          type="submit"
          disabled={!newTask.title.trim()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✨ Agregar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold"
        >
          ❌ Cancelar
        </button>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="mt-2 text-xs text-gray-400">
        <span>Presiona </span>
        <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Ctrl+Enter</kbd>
        <span> para agregar o </span>
        <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Esc</kbd>
        <span> para cancelar</span>
      </div>
    </form>
  );
};