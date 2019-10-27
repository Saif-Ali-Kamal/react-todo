import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Todo from './Todo';
import Group from './Group';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Group} />
          <Route path="/:id" component={Todo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
