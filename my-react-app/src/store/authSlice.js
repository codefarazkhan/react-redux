import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { dispatch }) => {
    const response = await api.post('/auth/login', {
      email,
      password
    })
    
    // Store token in localStorage
    localStorage.setItem('token', response.data.token)
    
    // Clear any existing todos from previous user
    dispatch({ type: 'todos/clearTodos' })
    
    return response.data
  }
)

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, email, password }, { dispatch }) => {
    const response = await api.post('/auth/signup', {
      name,
      email,
      password
    })
    
    // Store token in localStorage
    localStorage.setItem('token', response.data.token)
    
    // Clear any existing todos from previous user
    dispatch({ type: 'todos/clearTodos' })
    
    return response.data
  }
)

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      localStorage.setItem('token', token)
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.error.message
      })
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.error.message
      })
  }
})

export const { logout, clearError, setCredentials } = authSlice.actions
export default authSlice.reducer 