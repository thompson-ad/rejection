import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './app/NavBar';

import AskQuestionForm from './features/questions/AskQuestionForm';
import QuestionsList from './features/questions/QuestionsList';

import './styles/global.css';
import './styles/reset.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={QuestionsList} />
          <Route exact path="/ask-a-question" component={AskQuestionForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
