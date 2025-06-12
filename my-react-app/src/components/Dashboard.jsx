import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Welcome to your personal dashboard</p>
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
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h4>Total Projects</h4>
              <p className="stat-number">12</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h4>Completed Tasks</h4>
              <p className="stat-number">48</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <h4>Pending Tasks</h4>
              <p className="stat-number">7</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h4>Goals Achieved</h4>
              <p className="stat-number">23</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <div className="action-card">
            <h4>Quick Actions</h4>
            <div className="action-buttons">
              <button className="action-button primary">
                Create New Project
              </button>
              <button className="action-button secondary">
                View Reports
              </button>
              <button className="action-button tertiary">
                Manage Team
              </button>
            </div>
          </div>

          <div className="recent-activity">
            <h4>Recent Activity</h4>
            <ul className="activity-list">
              <li className="activity-item">
                <span className="activity-time">2 hours ago</span>
                <span className="activity-description">
                  Completed project review
                </span>
              </li>
              <li className="activity-item">
                <span className="activity-time">4 hours ago</span>
                <span className="activity-description">
                  Updated team settings
                </span>
              </li>
              <li className="activity-item">
                <span className="activity-time">1 day ago</span>
                <span className="activity-description">
                  Created new milestone
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 