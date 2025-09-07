// hooks/useDragAndDrop.ts

import { useState } from 'react';
import type { DraggedTask, Task } from '../types';

export const useDragAndDrop = (
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void
) => {
  const [draggedTask, setDraggedTask] = useState<DraggedTask | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
    columnId: string
  ): void => {
    setDraggedTask({ task, fromColumnId: columnId });
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    columnId: string
  ): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverColumn(columnId);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    // Only remove highlight if we're actually leaving the column
    if (!e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
      setDraggedOverColumn(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    toColumnId: string
  ): void => {
    e.preventDefault();
    setDraggedOverColumn(null);

    if (!draggedTask || draggedTask.fromColumnId === toColumnId) {
      setDraggedTask(null);
      return;
    }

    // Execute the move
    moveTask(draggedTask.task.id, draggedTask.fromColumnId, toColumnId);
    setDraggedTask(null);
  };

  const handleDragEnd = (): void => {
    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const isDragging = (): boolean => {
    return draggedTask !== null;
  };

  const isColumnHighlighted = (columnId: string): boolean => {
    return draggedOverColumn === columnId;
  };

  return {
    draggedTask,
    draggedOverColumn,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    isDragging,
    isColumnHighlighted
  };
};