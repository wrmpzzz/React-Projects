// hooks/useKanbanBoard.ts

import { useState } from 'react';
import { mockColumns } from '../data/MockData';
import type { Column, Task } from '../types';

export const useKanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(mockColumns);

  const moveTask = (taskId: string, fromColumnId: string, toColumnId: string): void => {
    if (fromColumnId === toColumnId) return;

    setColumns(prevColumns => {
      const taskToMove = prevColumns
        .find(col => col.id === fromColumnId)
        ?.tasks.find(task => task.id === taskId);

      if (!taskToMove) return prevColumns;

      return prevColumns.map(column => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId)
          };
        } else if (column.id === toColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, taskToMove]
          };
        }
        return column;
      });
    });
  };

  const addTask = (columnId: string, newTask: Omit<Task, 'id'>): void => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask
    };

    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, task] }
          : column
      )
    );
  };

  const deleteTask = (taskId: string, columnId: string): void => {
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId
          ? { ...column, tasks: column.tasks.filter(task => task.id !== taskId) }
          : column
      )
    );
  };

  const getColumnById = (columnId: string): Column | undefined => {
    return columns.find(column => column.id === columnId);
  };

  const getTaskById = (taskId: string): { task: Task; columnId: string } | undefined => {
    for (const column of columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        return { task, columnId: column.id };
      }
    }
    return undefined;
  };

  const getTotalTasks = (): number => {
    return columns.reduce((total, column) => total + column.tasks.length, 0);
  };

  return {
    columns,
    moveTask,
    addTask,
    deleteTask,
    getColumnById,
    getTaskById,
    getTotalTasks
  };
};