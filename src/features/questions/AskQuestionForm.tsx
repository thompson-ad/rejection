import * as React from 'react';
import { useAppDispatch } from '../../app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { addNewQuestion } from './questionsSlice';

const AskQuestionForm: React.FC = () => {
  const [question, setQuestion] = React.useState('');
  const [askee, setAskee] = React.useState('');
  const [addRequestStatus, setAddRequestStatus] = React.useState('idle');

  const dispatch = useAppDispatch();

  const onQuestionChanged = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value);
  const onAskeeChanged = (e: React.ChangeEvent<HTMLInputElement>) => setAskee(e.target.value);

  const canSave = [question, askee].every(Boolean) && addRequestStatus === 'idle';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(addNewQuestion({ question, askee }));
        unwrapResult(resultAction);
        setQuestion('');
        setAskee('');
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <section>
      <h2>Ask and you may receive</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="questionInput">Ask a question</label>
        <input type="text" id="questionInput" name="question" required onChange={onQuestionChanged} value={question} />
        <label htmlFor="askeeInput">To</label>
        <input type="text" id="askeeInput" name="askee" required onChange={onAskeeChanged} value={askee} />
        <button type="submit" disabled={!canSave}>
          Ask question
        </button>
      </form>
    </section>
  );
};

export default AskQuestionForm;
