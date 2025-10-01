import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'

interface TODO {
  id: number
  title: string
  completed: boolean
}

const mockTODO: TODO[] = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Build a TODO App', completed: false },
  { id: 3, title: 'Profit', completed: true }
]

function App() {
  const [todos, setTodos] = useState<TODO[]>(mockTODO)
  const [newTodo, setNewTodo] = useState("")

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      const todo: TODO = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false
      }
      setTodos([...todos, todo])
      setNewTodo("")
    }
  }

  return (
    <main>
      <h1>TODO App</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Add a TODO"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </main>
  )
}

export default App
