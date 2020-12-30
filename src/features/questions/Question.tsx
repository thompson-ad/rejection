/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FaPoo, FaGrinStars } from 'react-icons/fa';
import { accept, reject } from './questionsSlice';
import { incrementOne, incrementTen } from '../score/scoreSlice';
import { useAppDispatch } from '../../app/store';

const QuestionItem = ({ question, askee, id }: { question: string; askee: string; id: string }): React.ReactElement => {
  const dispatch = useAppDispatch();

  const acceptQuestion = () => () => {
    dispatch(accept(id));
    dispatch(incrementOne());
  };

  const rejectQuestion = () => () => {
    dispatch(reject(id));
    dispatch(incrementTen());
  };
  return (
    <article
      css={{
        backgroundColor: 'ghostwhite',
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
        borderRadius: 15,
        padding: 10,
        '&:hover': {
          backgroundColor: 'lightgrey',
        },
      }}
    >
      <div css={{ width: '50%' }}>
        <span
          css={{ display: 'inline-block', marginBottom: 10, fontFamily: 'Rubik', fontWeight: 500, fontSize: '1.2em' }}
        >
          {askee}
        </span>
        <p css={{ marginBottom: 0, fontFamily: 'Bad Script', fontSize: '1.5em' }}>{question}</p>
      </div>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '20%',
          '& svg': {
            height: 40,
            width: 40,
          },
          '& button': {
            border: 'none',
            background: 'none',
          },
        }}
      >
        <button onClick={acceptQuestion()}>
          <FaPoo fill="saddlebrown" />
        </button>
        <button onClick={rejectQuestion()}>
          <FaGrinStars fill="forestgreen" />
        </button>
      </div>
    </article>
  );
};

export default QuestionItem;
