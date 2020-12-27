import React from 'react';

import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <section>
        <h1>Rejection App</h1>
        <div>
          <Link to="/">Your Questions</Link>
          <Link to="/ask-a-question">Ask a Question</Link>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
