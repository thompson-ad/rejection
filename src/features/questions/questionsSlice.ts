import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import * as client from '../../api/client';

export const ACCEPTED = 'ACCEPTED';
export const REJECTED = 'REJECTED';
export const UNAWNSWERED = 'UNAWNSWERED';
export interface Question {
  id: string;
  timestamp: string;
  question: string;
  askee: string;
  status: string;
}

export interface Questions {
  questions: Question[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

interface InitialQuestion {
  question: string;
  askee: string;
}

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await client.get<Question>('/fakeApi/questions');
  return response.parsedBody;
});

export const addNewQuestion = createAsyncThunk('questions/addNewQuestion', async (initialQuestion: InitialQuestion) => {
  const response = await client.post<Question>('/fakeApi/questions', { initialQuestion });
  return response.parsedBody;
});

const initialState: Questions = {
  questions: [],
  status: 'idle',
  error: '',
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    accept: (state, action) => {
      const { id } = action.payload;
      const existingQuestion = state.questions.find((question) => question.id === id);
      if (existingQuestion) {
        existingQuestion.status = ACCEPTED;
      }
    },
    reject: (state, action) => {
      const { id } = action.payload;
      const existingQuestion = state.questions.find((question) => question.id === id);
      if (existingQuestion) {
        existingQuestion.status = REJECTED;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload) {
        state.questions = state.questions.concat(action.payload);
      }
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addNewQuestion.fulfilled, (state, action) => {
      if (action.payload) {
        state.questions.push(action.payload);
      }
    });
  },
});

export const { accept, reject } = questionsSlice.actions;

export const selectQuestions = (state: RootState): Question[] => state.questions.questions;

export default questionsSlice.reducer;
