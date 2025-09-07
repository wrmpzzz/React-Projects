// types/kanban.types.ts

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  icon: string;
  tasks: Task[];
}

export interface DraggedTask {
  task: Task;
  fromColumnId: string;
}

export interface NewTaskForm {
  title: string;
  description: string;
  priority: Priority;
}

// Props interfaces for components
export interface TaskCardProps {
  task: Task;
  columnId: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task, columnId: string) => void;
  onDelete: (taskId: string, columnId: string) => void;
}

export interface AddTaskFormProps {
  columnId: string;
  newTask: NewTaskForm;
  onInputChange: (field: keyof NewTaskForm, value: string | Priority) => void;
  onSubmit: (columnId: string) => void;
  onCancel: () => void;
}

export interface KanbanColumnProps {
  column: Column;
  draggedOverColumn: string | null;
  showNewTaskForm: string | null;
  newTask: NewTaskForm;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task, columnId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
  onOpenForm: (columnId: string) => void;
  onInputChange: (field: keyof NewTaskForm, value: string | Priority) => void;
  onAddTask: (columnId: string) => void;
  onCancelForm: () => void;
}