import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

// Async thunks for todo operations
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await api.get('/todos')
    return response.data
  }
)

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData) => {
    const response = await api.post('/todos', todoData)
    return response.data
  }
)

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, ...todoData }) => {
    const response = await api.put(`/todos/${id}`, todoData)
    return response.data
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    await api.delete(`/todos/${id}`)
    return id
  }
)

// Initial state
const initialState = {
  todos: [],
  isLoading: false,
  error: null,
  hasLoaded: false
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearTodos: (state) => {
      state.todos = []
      state.hasLoaded = false
      state.error = null
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = action.payload.todos
        state.hasLoaded = true
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Create todo
      .addCase(createTodo.pending, (state) => {
        state.error = null
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload.todo)
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.error = null
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.todo.id)
        if (index !== -1) {
          state.todos[index] = action.payload.todo
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.error = null
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const { clearError, clearTodos } = todoSlice.actions
export default todoSlice.reducer 