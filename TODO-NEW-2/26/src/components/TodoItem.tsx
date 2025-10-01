import React from 'react'

interface TODO {
  id: number
  title: string
  completed: boolean
}

interface Props {
  todo: TODO
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TodoItem: React.FC<Props> = ({ todo, onDelete, onToggle }) => {
  return (
    <li>
      <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.title}
      </p>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.completed ? 'Completed' : 'Not Completed'}</span>
    </li>
  )
}

export default TodoItem
