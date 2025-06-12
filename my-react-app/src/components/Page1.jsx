import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserData, setSharedData, addItem } from '../store/dataSlice'
import { increment, decrement } from '../store/counterSlice'

function Page1() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData, sharedData, items } = useSelector((state) => state.data)
  const count = useSelector((state) => state.counter.value)
  
  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    message: userData.message || '',
  })
  const [newItem, setNewItem] = useState('')
  const [sharedMessage, setSharedMessage] = useState(sharedData || '')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveUserData = () => {
    dispatch(setUserData(formData))
    alert('User data saved to Redux store!')
  }

  const handleSaveSharedData = () => {
    dispatch(setSharedData(sharedMessage))
    alert('Shared data saved to Redux store!')
  }

  const handleAddItem = () => {
    if (newItem.trim()) {
      dispatch(addItem(newItem.trim()))
      setNewItem('')
    }
  }

  const goToPage2 = () => {
    navigate('/page2')
  }

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📝 Page 1 - Data Input</h1>
      
      {/* Counter Section */}
      <div className="section section-counter">
        <h3>🔢 Counter Control</h3>
        <div className="counter-display">{count}</div>
        <div className="nav-container">
          <button onClick={() => dispatch(increment())} className="btn btn-primary">
            ➕ Increment
          </button>
          <button onClick={() => dispatch(decrement())} className="btn btn-danger">
            ➖ Decrement
          </button>
        </div>
      </div>

      {/* User Data Form */}
      <div className="section section-user-data">
        <h3>👤 User Information</h3>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="Enter your message"
            rows="4"
          />
        </div>
        <button onClick={handleSaveUserData} className="btn btn-primary">
          💾 Save User Data
        </button>
      </div>

      {/* Shared Message */}
      <div className="section section-shared-data">
        <h3>💬 Shared Message</h3>
        <div className="form-group">
          <input
            type="text"
            value={sharedMessage}
            onChange={(e) => setSharedMessage(e.target.value)}
            placeholder="Enter a message to share between pages"
            className="form-input"
          />
        </div>
        <button onClick={handleSaveSharedData} className="btn btn-success">
          📤 Save Shared Message
        </button>
      </div>

      {/* Items List */}
      <div className="section section-items">
        <h3>📋 Items List Management</h3>
        <div className="form-group">
          <label className="form-label">Add New Item</label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter new item"
              className="form-input"
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <button onClick={handleAddItem} className="btn btn-info" style={{ whiteSpace: 'nowrap' }}>
              ➕ Add Item
            </button>
          </div>
        </div>
        
        {items.length > 0 && (
          <div>
            <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>
              Current Items ({items.length}):
            </h4>
            <ul className="item-list">
              {items.map((item, index) => (
                <li key={index} className="item-list-item">
                  <span style={{ fontWeight: '500' }}>
                    {index + 1}. {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="nav-container" style={{ marginTop: '3rem' }}>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-secondary"
        >
          🏠 Go to Home
        </button>
        <button 
          onClick={goToPage2}
          className="btn btn-success"
        >
          📊 Go to Page 2 →
        </button>
      </div>
    </div>
  )
}

export default Page1 