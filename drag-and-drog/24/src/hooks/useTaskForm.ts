// hooks/useTaskForm.ts

import { useState } from 'react';
import type { NewTaskForm, Priority } from '../types';

const defaultFormState: NewTaskForm = {
  title: '',
  description: '',
  priority: 'medium'
};

export const useTaskForm = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<NewTaskForm>(defaultFormState);

  const handleInputChange = (
    field: keyof NewTaskForm,
    value: string | Priority
  ): void => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = (): void => {
    setShowNewTaskForm(null);
    setNewTask(defaultFormState);
  };

  const openForm = (columnId: string): void => {
    setShowNewTaskForm(columnId);
  };

  const closeForm = (): void => {
    setShowNewTaskForm(null);
  };

  const isFormOpen = (columnId?: string): boolean => {
    if (columnId) {
      return showNewTaskForm === columnId;
    }
    return showNewTaskForm !== null;
  };

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!newTask.title.trim()) {
      errors.push('El título es requerido');
    }

    if (newTask.title.length > 100) {
      errors.push('El título no puede exceder 100 caracteres');
    }

    if (newTask.description.length > 500) {
      errors.push('La descripción no puede exceder 500 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const setFieldValue = (field: keyof NewTaskForm, value: string | Priority): void => {
    handleInputChange(field, value);
  };

  return {
    showNewTaskForm,
    newTask,
    handleInputChange,
    resetForm,
    openForm,
    closeForm,
    isFormOpen,
    validateForm,
    setFieldValue
  };
};