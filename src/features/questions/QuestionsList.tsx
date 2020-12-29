import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { selectQuestions, accept, reject, Question, UNAWNSWERED, fetchQuestions } from './questionsSlice';
import { selectScore, incrementOne, incrementTen } from '../score/scoreSlice';
import { RootState } from '../../app/store';

const QuestionsList: React.FC = () => {
  const questions = useSelector(selectQuestions);
  const score = useSelector(selectScore);
  const dispatch = useAppDispatch();

  const questionsStatus = useSelector((state: RootState) => state.questions.status);
  const error = useSelector((state: RootState) => state.questions.error);

  React.useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch]);

  const orderedQuestions = questions.slice().sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const acceptQuestion = (question: Question) => () => {
    dispatch(accept(question));
    dispatch(incrementOne());
  };

  const rejectQuestion = (question: Question) => () => {
    dispatch(reject(question));
    dispatch(incrementTen());
  };

  let content;
  if (questionsStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (questionsStatus === 'succeeded') {
    content = orderedQuestions
      .filter((x) => x.status === UNAWNSWERED)
      .map((q) => {
        return (
          <article key={q.id}>
            <p>{q.question}</p>
            <button onClick={acceptQuestion(q)}>Accept</button>
            <button onClick={rejectQuestion(q)}>Reject</button>
          </article>
        );
      });
  } else if (questionsStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h1>Score: {score}</h1>
      {content}
    </section>
  );
};

export default QuestionsList;
