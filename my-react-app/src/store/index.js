import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import dataReducer from './dataSlice'
import authReducer from './authSlice'
import todoReducer from './todoSlice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'todos'] // Don't persist auth state and todos as they are user-specific
}

const rootReducer = combineReducers({
  counter: counterReducer,
  data: dataReducer,
  auth: authReducer,
  todos: todoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

export default store 