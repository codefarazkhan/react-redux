import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { logout } from '../store/authSlice'
import { fetchTodos } from '../store/todoSlice'
import TodoList from './TodoList'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { todos } = useSelector((state) => state.todos)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTodos())
    }
  }, [dispatch, isAuthenticated])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const todoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    todayTodos: todos.filter(todo => {
      const today = new Date().toDateString()
      const todoDate = new Date(todo.createdAt).toDateString()
      return today === todoDate
    }).length
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name || 'User'}!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <div className="user-avatar">
            <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
          </div>
          <div className="user-details">
            <h3>{user?.name || 'User'}</h3>
            <p>{user?.email || 'user@example.com'}</p>
            <span className="user-status">Active</span>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h4>Total Todos</h4>
              <p className="stat-number">{todoStats.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h4>Completed</h4>
              <p className="stat-number">{todoStats.completed}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <h4>Pending</h4>
              <p className="stat-number">{todoStats.pending}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🆕</div>
            <div className="stat-content">
              <h4>Today</h4>
              <p className="stat-number">{todoStats.todayTodos}</p>
            </div>
          </div>
        </div>

        <div className="todo-section">
          <TodoList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard 