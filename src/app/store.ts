import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import questionsReducer from '../features/questions/questionsSlice';
import scoreReducer from '../features/score/scoreSlice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    score: scoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
