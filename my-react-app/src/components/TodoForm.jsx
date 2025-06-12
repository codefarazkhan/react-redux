import { useState, useEffect } from 'react'

const TodoForm = ({ todo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'medium',
        dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : ''
      })
    }
  }, [todo])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long'
    }
    
    if (formData.dueDate) {
      const today = new Date().toISOString().split('T')[0]
      if (formData.dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || null
    }

    if (todo) {
      onSubmit(todo.id, submitData)
    } else {
      onSubmit(submitData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    })
    setErrors({})
    onCancel()
  }

  return (
    <div className="todo-form-overlay">
      <div className="todo-form-container">
        <div className="todo-form-header">
          <h3>{todo ? 'Edit Todo' : 'Add New Todo'}</h3>
          <button 
            className="close-btn"
            onClick={handleCancel}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter todo title..."
              className={errors.title ? 'error' : ''}
              maxLength={100}
            />
            {errors.title && (
              <span className="error-text">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter todo description..."
              rows={4}
              maxLength={500}
            />
            <small className="char-count">
              {formData.description.length}/500 characters
            </small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={errors.dueDate ? 'error' : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.dueDate && (
                <span className="error-text">{errors.dueDate}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
            >
              {todo ? 'Update Todo' : 'Create Todo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoForm 