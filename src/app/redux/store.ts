import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slice/themeSlice';
import utilityReducer from './slice/utilitySlice';
import authReducer from './slice/authSlice';
import libraryReducer from './slice/librarySlice';
import historyReducer from './slice/historySlice';
import readingProgressReducer from './slice/readingProgressSlice'
import filterReducer from './slice/filterSlice';
import carouselReducer from './slice/carouselSlice';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    utility: utilityReducer,
    auth: authReducer,
    library: libraryReducer,
    history: historyReducer,
    readingProgress: readingProgressReducer,
    filters: filterReducer,
    carousel: carouselReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
