import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {
    name: '',
    email: '',
    message: '',
  },
  sharedData: '',
  items: [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload }
    },
    setSharedData: (state, action) => {
      state.sharedData = action.payload
    },
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload)
    },
    clearData: (state) => {
      state.userData = { name: '', email: '', message: '' }
      state.sharedData = ''
      state.items = []
    },
  },
})

export const { setUserData, setSharedData, addItem, removeItem, clearData } = dataSlice.actions

export default dataSlice.reducer 