import { configureStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

const rootReducer = combineReducers({
  counter: counterReducer,
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
  //     },
  //   }),
})

// export const persistor = persistStore(store) 