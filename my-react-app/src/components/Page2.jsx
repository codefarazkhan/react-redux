import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeItem, clearData, setSharedData } from '../store/dataSlice'
import { increment, decrement, reset } from '../store/counterSlice'

function Page2() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData, sharedData, items } = useSelector((state) => state.data)
  const count = useSelector((state) => state.counter.value)

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index))
  }

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      dispatch(clearData())
      dispatch(reset())
    }
  }

  const handleUpdateSharedData = () => {
    const newMessage = prompt('Enter new shared message:', sharedData)
    if (newMessage !== null) {
      dispatch(setSharedData(newMessage))
    }
  }

  const goToPage1 = () => {
    navigate('/page1')
  }

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>📊 Page 2 - Data Display</h1>
      
      {/* Counter Section */}
      <div className="section section-counter">
        <h3>🔢 Counter Management</h3>
        <div className="counter-display">{count}</div>
        <div className="nav-container">
          <button onClick={() => dispatch(increment())} className="btn btn-primary">
            ➕ +1
          </button>
          <button onClick={() => dispatch(decrement())} className="btn btn-warning">
            ➖ -1
          </button>
          <button onClick={() => dispatch(reset())} className="btn btn-danger">
            🔄 Reset
          </button>
        </div>
      </div>

      {/* User Data Display */}
      <div className="section section-user-data">
        <h3>👤 User Information</h3>
        {userData.name || userData.email || userData.message ? (
          <div className="grid-2" style={{ gap: '1rem', textAlign: 'left' }}>
            <div className="card">
              <h4 style={{ color: '#4a5568', marginBottom: '1rem' }}>Personal Details</h4>
              <p><strong>Name:</strong> {userData.name || 'Not provided'}</p>
              <p><strong>Email:</strong> {userData.email || 'Not provided'}</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#4a5568', marginBottom: '1rem' }}>Message</h4>
              <p style={{ 
                backgroundColor: '#f7fafc', 
                padding: '1rem', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontStyle: userData.message ? 'normal' : 'italic',
                color: userData.message ? '#2d3748' : '#718096'
              }}>
                {userData.message || 'No message provided'}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            backgroundColor: '#f7fafc', 
            borderRadius: '12px',
            border: '2px dashed #cbd5e0'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#718096', marginBottom: '1rem' }}>
              📭 No user data available
            </p>
            <p style={{ color: '#a0aec0' }}>Go to Page 1 to enter some data</p>
          </div>
        )}
      </div>

      {/* Shared Message Display */}
      <div className="section section-shared-data">
        <h3>💬 Shared Message</h3>
        {sharedData ? (
          <div>
            <div style={{ 
              backgroundColor: '#ebf8ff', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              border: '1px solid #bee3f8',
              marginBottom: '1rem'
            }}>
              <p style={{ 
                fontSize: '1.1rem',
                color: '#2b6cb0',
                fontWeight: '500',
                margin: 0
              }}>
                "{sharedData}"
              </p>
            </div>
            <button 
              onClick={handleUpdateSharedData}
              className="btn btn-warning"
            >
              ✏️ Update Message
            </button>
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            backgroundColor: '#f7fafc', 
            borderRadius: '12px',
            border: '2px dashed #cbd5e0'
          }}>
            <p style={{ color: '#718096' }}>💭 No shared message available</p>
          </div>
        )}
      </div>

      {/* Items List Display */}
      <div className="section section-items">
        <h3>📋 Items List ({items.length} items)</h3>
        {items.length > 0 ? (
          <div>
            <ul className="item-list">
              {items.map((item, index) => (
                <li key={index} className="item-list-item">
                  <span style={{ fontWeight: '500' }}>
                    {index + 1}. {item}
                  </span>
                  <button 
                    onClick={() => handleRemoveItem(index)}
                    className="btn btn-danger"
                    style={{ 
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      minWidth: 'auto'
                    }}
                  >
                    🗑️ Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            backgroundColor: '#f7fafc', 
            borderRadius: '12px',
            border: '2px dashed #cbd5e0'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#718096', marginBottom: '1rem' }}>
              📝 No items available
            </p>
            <p style={{ color: '#a0aec0' }}>Go to Page 1 to add some items</p>
          </div>
        )}
      </div>

      {/* Data Summary */}
      <div className="section section-summary">
        <h3>📈 Data Summary</h3>
        <div className="grid-4">
          <div className="state-card state-card-counter">
            <h4 style={{ color: '#667eea' }}>Counter Value</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {count}
            </div>
          </div>
          <div className="state-card state-card-items">
            <h4 style={{ color: '#48bb78' }}>Items Count</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#48bb78' }}>
              {items.length}
            </div>
          </div>
          <div className="state-card state-card-user">
            <h4 style={{ color: '#3182ce' }}>Has User Data</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3182ce' }}>
              {(userData.name || userData.email || userData.message) ? '✅ Yes' : '❌ No'}
            </div>
          </div>
          <div className="state-card state-card-message">
            <h4 style={{ color: '#ed8936' }}>Has Message</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ed8936' }}>
              {sharedData ? '✅ Yes' : '❌ No'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="section" style={{ textAlign: 'center' }}>
        <h3>⚡ Quick Actions</h3>
        <div className="nav-container">
          <button 
            onClick={handleClearAllData}
            className="btn btn-danger"
          >
            🧹 Clear All Data
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-container" style={{ marginTop: '3rem' }}>
        <button 
          onClick={goToHome}
          className="btn btn-secondary"
        >
          🏠 Go to Home
        </button>
        <button 
          onClick={goToPage1}
          className="btn btn-primary"
        >
          ← 📝 Back to Page 1
        </button>
      </div>
    </div>
  )
}

export default Page2 