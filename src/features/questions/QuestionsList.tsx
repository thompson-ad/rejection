import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { selectQuestions, accept, reject, Question, UNAWNSWERED } from './questionsSlice';
import { selectScore, incrementOne, incrementTen } from '../score/scoreSlice';

const QuestionsList: React.FC = () => {
  const questions = useSelector(selectQuestions);
  const score = useSelector(selectScore);
  const dispatch = useAppDispatch();

  const orderedQuestions = questions.slice().sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const acceptQuestion = (question: Question) => () => {
    dispatch(accept(question));
    dispatch(incrementOne());
  };

  const rejectQuestion = (question: Question) => () => {
    dispatch(reject(question));
    dispatch(incrementTen());
  };

  return (
    <section>
      <h1>Score: {score}</h1>
      {orderedQuestions
        .filter((x) => x.status === UNAWNSWERED)
        .map((q) => {
          return (
            <article key={q.id}>
              <p>{q.question}</p>
              <button onClick={acceptQuestion(q)}>Accept</button>
              <button onClick={rejectQuestion(q)}>Reject</button>
            </article>
          );
        })}
    </section>
  );
};

export default QuestionsList;
