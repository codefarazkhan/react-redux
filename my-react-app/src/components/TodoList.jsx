import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, createTodo, updateTodo, deleteTodo, clearError } from '../store/todoSlice'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'

const TodoList = () => {
  const dispatch = useDispatch()
  const { todos, isLoading, error, hasLoaded } = useSelector((state) => state.todos)
  const [showForm, setShowForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [filter, setFilter] = useState('all') // all, completed, pending

  useEffect(() => {
    // Only fetch todos if they haven't been loaded yet and we're not already loading
    if (!hasLoaded && !isLoading) {
      dispatch(fetchTodos())
    }
  }, [dispatch, hasLoaded, isLoading])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError())
      }, 5000)
    }
  }, [error, dispatch])

  const handleCreateTodo = (todoData) => {
    dispatch(createTodo(todoData))
    setShowForm(false)
  }

  const handleUpdateTodo = (id, todoData) => {
    dispatch(updateTodo({ id, ...todoData }))
    setEditingTodo(null)
  }

  const handleDeleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodo(id))
    }
  }

  const handleToggleComplete = (todo) => {
    dispatch(updateTodo({ 
      id: todo.id, 
      completed: !todo.completed 
    }))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  const todoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length
  }

  if (isLoading) {
    return (
      <div className="todo-loading">
        <div className="loading-spinner"></div>
        <p>Loading todos...</p>
      </div>
    )
  }

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <div className="todo-title">
          <h2>My Todos</h2>
          <p>Manage your tasks efficiently</p>
        </div>
        <button 
          className="add-todo-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Todo
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
        </div>
      )}

      <div className="todo-stats">
        <div className="stat-item">
          <span className="stat-number">{todoStats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{todoStats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{todoStats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      <div className="todo-filters">
        <button 
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No todos found</h3>
          <p>
            {filter === 'all' 
              ? "You haven't created any todos yet. Click 'Add Todo' to get started!" 
              : `No ${filter} todos found.`
            }
          </p>
        </div>
      ) : (
        <div className="todo-items">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={setEditingTodo}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}

      {(showForm || editingTodo) && (
        <TodoForm
          todo={editingTodo}
          onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
          onCancel={() => {
            setShowForm(false)
            setEditingTodo(null)
          }}
        />
      )}
    </div>
  )
}

export default TodoList 