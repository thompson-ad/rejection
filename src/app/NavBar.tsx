import React from 'react';

import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <section>
        <h1>Rejection App</h1>
        <div>
          <div>
            <Link to="/">Ask a Question</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
