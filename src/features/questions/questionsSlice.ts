import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { RootState } from '../../app/store';

export interface Question {
  id: string;
  timestamp: string;
  question: string;
  askee: string;
  status: string;
}

export const ACCEPTED = 'ACCEPTED';
export const REJECTED = 'REJECTED';
export const UNAWNSWERED = 'UNAWNSWERED';

const initialState: Question[] = [
  {
    id: '1',
    question: 'Hello?',
    askee: 'Aaron',
    timestamp: sub(new Date(), { minutes: 10 }).toISOString(),
    status: UNAWNSWERED,
  },
  {
    id: '2',
    question: 'Hello, are you there?',
    askee: 'Aaron',
    timestamp: sub(new Date(), { minutes: 10 }).toISOString(),
    status: UNAWNSWERED,
  },
];

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    questionAdded: {
      reducer: (state, action: PayloadAction<Question>) => {
        state.push(action.payload);
      },
      prepare: (question: string, askee: string): { payload: Question } => {
        return {
          payload: {
            id: nanoid(),
            question,
            askee,
            timestamp: new Date().toISOString(),
            status: UNAWNSWERED,
          },
        };
      },
    },
    accept: (state, action) => {
      const { id } = action.payload;
      const existingQuestion = state.find((question) => question.id === id);
      if (existingQuestion) {
        existingQuestion.status = ACCEPTED;
      }
    },
    reject: (state, action) => {
      const { id } = action.payload;
      const existingQuestion = state.find((question) => question.id === id);
      if (existingQuestion) {
        existingQuestion.status = REJECTED;
      }
    },
  },
});

export const { accept, reject, questionAdded } = questionsSlice.actions;

export const selectQuestions = (state: RootState): Question[] => state.questions;

export default questionsSlice.reducer;
