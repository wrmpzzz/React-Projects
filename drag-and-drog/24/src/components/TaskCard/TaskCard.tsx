import React from 'react';
import { getPriorityColor, getPriorityIcon } from '../../utils';
import type { TaskCardProps } from '../../types';

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  columnId,
  onDragStart,
  onDelete
}) => {
  const handleDeleteClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onDelete(task.id, columnId);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task, columnId)}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move group border border-gray-700 hover:border-gray-600 hover:bg-opacity-70"
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      {/* Task Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2 flex-1">
          <span 
            className="text-lg" 
            role="img" 
            aria-label={`${task.priority} priority`}
          >
            {getPriorityIcon(task.priority)}
          </span>
          <h3 className="font-semibold text-white text-lg leading-tight">
            {task.title}
          </h3>
        </div>

        {/* Task Actions */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Drag Handle */}
          <div 
            className="text-gray-400 hover:text-white cursor-grab active:cursor-grabbing transition-colors"
            role="button"
            aria-label="Drag to move task"
            tabIndex={0}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          </div>

          {/* Delete Button */}
          <button
            onClick={handleDeleteClick}
            className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1 rounded hover:bg-red-500 hover:bg-opacity-20"
            aria-label={`Delete task: ${task.title}`}
            type="button"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Task Description */}
      {task.description && (
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          {task.description}
        </p>
      )}

      {/* Priority Badge */}
      <div className="flex justify-end">
        <span 
          className={`${getPriorityColor(task.priority)} px-3 py-1 rounded-full text-xs font-semibold text-white`}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>
    </div>
  );
};