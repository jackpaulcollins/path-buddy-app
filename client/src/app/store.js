import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import apiSlice from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import notificationReducer from '../features/notifications/notificationsSlice';
import pathStatsReducer from '../features/paths/pathStatsSlice';

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  notifications: notificationReducer,
  pathStats: pathStatsReducer,
});

const persistConfig = {
  key: 'root',
  storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;
