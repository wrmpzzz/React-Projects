import { useState } from 'react';
import './App.css';

const mockTodos = [
  {
    id: 1,
    title: "Todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    completed: true,
  },
  {
    id: 3,
    title: "Todo 3",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState(mockTodos);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const addTodo = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    if (!editingTitle.trim()) return;

    setTodos(todos.map((todo) =>
      todo.id === editingId ? { ...todo, title: editingTitle } : todo
    ));

    setEditingId(null);
    setEditingTitle("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            {editingId === todo.id ? (
              <form onSubmit={saveEdit} className="edit-form">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  autoFocus
                  className="edit-input"
                />
                <div className="button-group">
                  <button type="submit" className="save-btn">Save</button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <span
                  onClick={() => toggleComplete(todo.id)}
                  className="todo-text"
                >
                  {todo.title}
                </span>
                <div className="actions">
                  <button
                    onClick={() => startEditing(todo)}
                    disabled={todo.completed}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;