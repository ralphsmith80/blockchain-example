import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import Blockchain from 'components/Blockchain';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/about">About</Route>
          <Route path="/users">Users</Route>
          <Route path="/">
            <Blockchain />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
