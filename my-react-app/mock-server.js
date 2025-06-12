import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = 3001
const JWT_SECRET = 'your-secret-key-replace-in-production'

// Middleware
app.use(cors())
app.use(express.json())

// Mock database
const users = []
const todos = []
let todoIdCounter = 1

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })
}

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword
    }

    users.push(user)

    // Generate token
    const token = generateToken(user.id)

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = users.find(user => user.email === email)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user.id)

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Protected route middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

// Protected dashboard data endpoint
app.get('/api/dashboard', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId)
  const userTodos = todos.filter(todo => todo.userId === req.user.userId)
  
  res.json({
    message: 'Dashboard data',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    stats: {
      totalTodos: userTodos.length,
      completedTodos: userTodos.filter(todo => todo.completed).length,
      pendingTodos: userTodos.filter(todo => !todo.completed).length,
      todosToday: userTodos.filter(todo => {
        const today = new Date().toDateString()
        const todoDate = new Date(todo.createdAt).toDateString()
        return today === todoDate
      }).length
    }
  })
})

// Todo CRUD endpoints

// Get all todos for authenticated user
app.get('/api/todos', authenticateToken, (req, res) => {
  const userTodos = todos.filter(todo => todo.userId === req.user.userId)
  res.json({
    message: 'Todos retrieved successfully',
    todos: userTodos
  })
})

// Create a new todo
app.post('/api/todos', authenticateToken, (req, res) => {
  try {
    const { title, description, priority = 'medium', dueDate } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const todo = {
      id: todoIdCounter++,
      userId: req.user.userId,
      title,
      description: description || '',
      completed: false,
      priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    todos.push(todo)

    res.status(201).json({
      message: 'Todo created successfully',
      todo
    })
  } catch (error) {
    console.error('Create todo error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update a todo
app.put('/api/todos/:id', authenticateToken, (req, res) => {
  try {
    const todoId = parseInt(req.params.id)
    const { title, description, completed, priority, dueDate } = req.body

    const todoIndex = todos.findIndex(todo => 
      todo.id === todoId && todo.userId === req.user.userId
    )

    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    // Update todo
    todos[todoIndex] = {
      ...todos[todoIndex],
      title: title !== undefined ? title : todos[todoIndex].title,
      description: description !== undefined ? description : todos[todoIndex].description,
      completed: completed !== undefined ? completed : todos[todoIndex].completed,
      priority: priority !== undefined ? priority : todos[todoIndex].priority,
      dueDate: dueDate !== undefined ? dueDate : todos[todoIndex].dueDate,
      updatedAt: new Date().toISOString()
    }

    res.json({
      message: 'Todo updated successfully',
      todo: todos[todoIndex]
    })
  } catch (error) {
    console.error('Update todo error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete a todo
app.delete('/api/todos/:id', authenticateToken, (req, res) => {
  try {
    const todoId = parseInt(req.params.id)
    
    const todoIndex = todos.findIndex(todo => 
      todo.id === todoId && todo.userId === req.user.userId
    )

    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    todos.splice(todoIndex, 1)

    res.json({
      message: 'Todo deleted successfully'
    })
  } catch (error) {
    console.error('Delete todo error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`)
  console.log('Available endpoints:')
  console.log('- POST /api/auth/signup')
  console.log('- POST /api/auth/login')
  console.log('- GET /api/dashboard (protected)')
  console.log('- GET /api/todos (protected)')
  console.log('- POST /api/todos (protected)')
  console.log('- PUT /api/todos/:id (protected)')
  console.log('- DELETE /api/todos/:id (protected)')
}) 