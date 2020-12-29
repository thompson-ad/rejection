import { nanoid } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { Question } from '../features/questions/questionsSlice';

const getStorage = (key: string) => {
  const valueInSessionStorage = window.sessionStorage.getItem(key);
  if (valueInSessionStorage) {
    return JSON.parse(valueInSessionStorage);
  }
};

const setStorage = (key: string, data: any) => {
  window.sessionStorage.setItem(key, JSON.stringify(data));
};

const createQuestion = (data: any): Question => {
  const parsedData = JSON.parse(data);
  const { question, askee } = parsedData.initialQuestion;
  return {
    id: nanoid(),
    question,
    askee,
    status: 'UNAWNSWERED',
    timestamp: new Date().toISOString(),
  };
};

export const handlers = [
  rest.post('/fakeApi/questions', (req, res, ctx) => {
    const newQuestion = createQuestion(req.body);
    const currentQuestions = getStorage('Questions');
    let newQuestions;
    if (currentQuestions) {
      newQuestions = currentQuestions.concat([newQuestion]);
    } else {
      newQuestions = [newQuestion];
    }
    setStorage('Questions', newQuestions);
    return res(ctx.status(200), ctx.json(newQuestion));
  }),

  rest.get('/fakeApi/questions', (req, res, ctx) => {
    const questions = getStorage('Questions');
    if (questions) {
      return res(ctx.status(200), ctx.json(questions));
    } else {
      return res(ctx.status(200), ctx.json({}));
    }
  }),
];
