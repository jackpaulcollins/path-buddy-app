import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(apiSlice.middleware),
  devTools: true,
});
