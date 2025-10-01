import React from 'react'
import TodoItem from './TodoItem'

interface TODO {
  id: number
  title: string
  completed: boolean
}

interface Props {
  todos: TODO[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TodoList: React.FC<Props> = ({ todos, onDelete, onToggle }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  )
}

export default TodoList
