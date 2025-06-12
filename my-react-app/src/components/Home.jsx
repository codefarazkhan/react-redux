import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const { userData, sharedData, items } = useSelector((state) => state.data)
  const count = useSelector((state) => state.counter.value)

  const goToPage1 = () => navigate('/page1')
  const goToPage2 = () => navigate('/page2')

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 className="pulse">
        React Router + Redux Demo
      </h1>
      
      <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '3rem' }}>
        This app demonstrates routing between pages and data sharing using Redux.
      </p>

      {/* Current State Overview */}
      <div className="section section-summary">
        <h2>Current Redux State</h2>
        <div className="grid-4">
          <div className="state-card state-card-counter">
            <h4 style={{ color: '#667eea' }}>Counter</h4>
            <div className="counter-display">{count}</div>
          </div>
          
          <div className="state-card state-card-items">
            <h4 style={{ color: '#48bb78' }}>Items</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', margin: '0.5rem 0' }}>
              {items.length} items
            </p>
            {items.length > 0 && (
              <div style={{ textAlign: 'left', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {items.slice(0, 2).map((item, index) => (
                  <div key={index} style={{ 
                    padding: '0.25rem 0', 
                    borderBottom: '1px solid #e2e8f0' 
                  }}>
                    • {item}
                  </div>
                ))}
                {items.length > 2 && (
                  <div style={{ color: '#666', fontStyle: 'italic', padding: '0.25rem 0' }}>
                    ...and {items.length - 2} more
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="state-card state-card-user">
            <h4 style={{ color: '#3182ce' }}>User Data</h4>
            <p style={{ fontSize: '0.9rem' }}>
              {userData.name || userData.email || userData.message 
                ? (
                  <div style={{ textAlign: 'left' }}>
                    <div><strong>Name:</strong> {userData.name || 'N/A'}</div>
                    <div><strong>Email:</strong> {userData.email || 'N/A'}</div>
                  </div>
                )
                : 'No data entered'}
            </p>
          </div>
          
          <div className="state-card state-card-message">
            <h4 style={{ color: '#ed8936' }}>Shared Message</h4>
            <p style={{ fontSize: '0.9rem', wordBreak: 'break-word' }}>
              {sharedData ? `"${sharedData}"` : 'No message'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid-2">
        <div className="feature-card feature-card-primary">
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>📝 Page 1</h3>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            <strong>Data Input Hub</strong><br/>
            Enter user information, add items to a list, set shared messages, and interact with the counter.
          </p>
          <button 
            onClick={goToPage1}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Go to Page 1 →
          </button>
        </div>

        <div className="feature-card feature-card-success">
          <h3 style={{ color: '#48bb78', marginBottom: '1rem' }}>📊 Page 2</h3>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            <strong>Data Display Center</strong><br/>
            View and manage all the data you've entered. See real-time updates and perform additional actions.
          </p>
          <button 
            onClick={goToPage2}
            className="btn btn-success"
            style={{ width: '100%' }}
          >
            Go to Page 2 →
          </button>
        </div>
      </div>

      {/* Features List */}
      <div className="section">
        <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: '#4a5568' }}>
          ✨ What You Can Do
        </h3>
        <div className="feature-list">
          <div className="feature-list-item">
            <strong>🚀 Navigate between pages</strong> using React Router
          </div>
          <div className="feature-list-item">
            <strong>🔄 Share data between pages</strong> using Redux
          </div>
          <div className="feature-list-item">
            <strong>🔢 Manage a counter</strong> that persists across pages
          </div>
          <div className="feature-list-item">
            <strong>👤 Input and display</strong> user information
          </div>
          <div className="feature-list-item">
            <strong>📋 Add and remove items</strong> from a shared list
          </div>
          <div className="feature-list-item">
            <strong>💬 Set and update</strong> shared messages
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 