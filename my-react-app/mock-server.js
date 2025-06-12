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
  
  res.json({
    message: 'Dashboard data',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    stats: {
      totalProjects: 12,
      completedTasks: 48,
      pendingTasks: 7,
      goalsAchieved: 23
    }
  })
})

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`)
  console.log('Available endpoints:')
  console.log('- POST /api/auth/signup')
  console.log('- POST /api/auth/login')
  console.log('- GET /api/dashboard (protected)')
}) 