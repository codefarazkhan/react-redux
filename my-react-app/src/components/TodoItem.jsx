import { useState } from 'react'

const TodoItem = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444'
      case 'medium':
        return '#f59e0b'
      case 'low':
        return '#10b981'
      default:
        return '#6b7280'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    const today = new Date()
    const due = new Date(dueDate)
    return due < today && !todo.completed
  }

  const handleToggleComplete = (e) => {
    e.stopPropagation()
    onToggleComplete(todo)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(todo)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(todo.id)
  }

  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="todo-item-header">
        <div className="todo-item-left">
          <button
            className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
            onClick={handleToggleComplete}
          >
            {todo.completed && <span>✓</span>}
          </button>
          
          <div className="todo-content">
            <h4 className={`todo-title ${todo.completed ? 'completed-text' : ''}`}>
              {todo.title}
            </h4>
            
            <div className="todo-meta">
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(todo.priority) }}
              >
                {todo.priority}
              </span>
              
              {todo.dueDate && (
                <span className={`due-date ${isOverdue(todo.dueDate) ? 'overdue-text' : ''}`}>
                  📅 {formatDate(todo.dueDate)}
                </span>
              )}
              
              <span className="created-date">
                Created {formatDate(todo.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="todo-actions">
          <button
            className="action-btn edit-btn"
            onClick={handleEdit}
            title="Edit todo"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            title="Delete todo"
          >
            🗑️
          </button>
          <button
            className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            ▼
          </button>
        </div>
      </div>

      {isExpanded && todo.description && (
        <div className="todo-description">
          <p>{todo.description}</p>
        </div>
      )}

      {isExpanded && (
        <div className="todo-details">
          <div className="detail-item">
            <strong>Status:</strong> 
            <span className={`status ${todo.completed ? 'completed' : 'pending'}`}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          
          <div className="detail-item">
            <strong>Priority:</strong> 
            <span className="priority" style={{ color: getPriorityColor(todo.priority) }}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
          </div>
          
          {todo.dueDate && (
            <div className="detail-item">
              <strong>Due Date:</strong> 
              <span className={isOverdue(todo.dueDate) ? 'overdue-text' : ''}>
                {formatDate(todo.dueDate)}
                {isOverdue(todo.dueDate) && ' (Overdue)'}
              </span>
            </div>
          )}
          
          <div className="detail-item">
            <strong>Last Updated:</strong> 
            <span>{formatDate(todo.updatedAt)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoItem 