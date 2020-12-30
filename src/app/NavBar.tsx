/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useSelector } from 'react-redux';
import { selectScore } from '../features/score/scoreSlice';
import { Link } from '../styles/lib';

const Navbar: React.FC = () => {
  const score = useSelector(selectScore);
  return (
    <nav
      css={{
        margin: '10px auto',
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>Rejection</h1>
      <Link to="/">Your Questions</Link>
      <Link to="/ask-a-question">Ask a Question</Link>
      <h1>Score: {score}</h1>
    </nav>
  );
};

export default Navbar;
