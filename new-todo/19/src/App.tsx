import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Filter } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'completed' | 'pending';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // Cargar datos iniciales
  useEffect(() => {
    const initialTodos: Todo[] = [
      {
        id: '1',
        text: 'Aprender React y TypeScript',
        completed: true,
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        text: 'Crear una aplicación de tareas',
        completed: false,
        createdAt: new Date('2024-01-16')
      },
      {
        id: '3',
        text: 'Implementar filtros y edición',
        completed: false,
        createdAt: new Date('2024-01-17')
      }
    ];
    setTodos(initialTodos);
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingText.trim() !== '' && editingId) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
      setEditingId(null);
      setEditingText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'add' | 'edit') => {
    if (e.key === 'Enter') {
      if (action === 'add') {
        addTodo();
      } else {
        saveEdit();
      }
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'pending':
        return !todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold text-center">Mi Lista de Tareas</h1>
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <span>Total: {todos.length}</span>
            <span>Completadas: {completedCount}</span>
            <span>Pendientes: {pendingCount}</span>
          </div>
        </div>

        {/* Add Todo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'add')}
              placeholder="Agregar nueva tarea..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addTodo}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Agregar</span>
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center space-x-4">
            <Filter size={20} className="text-gray-600" />
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Todas ({todos.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'pending'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pendientes ({pendingCount})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Completadas ({completedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredTodos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg">
                {filter === 'all' && 'No hay tareas creadas'}
                {filter === 'pending' && 'No hay tareas pendientes'}
                {filter === 'completed' && 'No hay tareas completadas'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                    todo.completed ? 'bg-green-50' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {todo.completed && <Check size={16} />}
                  </button>

                  {/* Todo Text */}
                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'edit')}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <div>
                        <span
                          className={`text-lg ${
                            todo.completed
                              ? 'line-through text-gray-500'
                              : 'text-gray-800'
                          }`}
                        >
                          {todo.text}
                        </span>
                        <div className="text-xs text-gray-400 mt-1">
                          Creado: {todo.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
          💡 Haz clic en el ícono de edición para modificar una tarea
        </div>
      </div>
    </div>
  );
};

export default TodoApp;