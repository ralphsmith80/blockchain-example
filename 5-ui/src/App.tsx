import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/Header';
import Blockchain from 'components/Blockchain';

const useStyles = makeStyles((theme) => ({
  article: {
    margin: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <>
        <Header />
        <article className={classes.article}>
          <Route path="/">
            <Blockchain />
          </Route>
          <Switch>
            <Route path="/about">About</Route>
            <Route path="/users">Users</Route>
          </Switch>
        </article>
      </>
    </Router>
  );
}

export default App;
