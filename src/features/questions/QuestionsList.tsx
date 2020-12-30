/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { selectQuestions, UNAWNSWERED, fetchQuestions } from './questionsSlice';
import { RootState } from '../../app/store';
import QuestionItem from './Question';

const QuestionsList: React.FC = () => {
  const questions = useSelector(selectQuestions);
  const dispatch = useAppDispatch();

  const questionsStatus = useSelector((state: RootState) => state.questions.status);
  const error = useSelector((state: RootState) => state.questions.error);

  React.useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch]);

  const orderedQuestions = questions.slice().sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  let content;
  if (questionsStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (questionsStatus === 'succeeded') {
    content = orderedQuestions
      .filter((x) => x.status === UNAWNSWERED)
      .map((q) => {
        return <QuestionItem key={q.id} question={q.question} askee={q.askee} id={q.id} />;
      });
  } else if (questionsStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return <section css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{content}</section>;
};

export default QuestionsList;
