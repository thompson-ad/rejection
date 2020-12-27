import * as React from 'react';
import { useAppDispatch } from '../../app/store';
import { questionAdded } from './questionsSlice';

const AskQuestionForm: React.FC = () => {
  const [question, setQuestion] = React.useState('');
  const [askee, setAskee] = React.useState('');

  const dispatch = useAppDispatch();

  const onQuestionChanged = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value);
  const onAskeeChanged = (e: React.ChangeEvent<HTMLInputElement>) => setAskee(e.target.value);

  const canSave = Boolean(question) && Boolean(askee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && askee) {
      dispatch(questionAdded(question, askee));
      setQuestion('');
      setAskee('');
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
