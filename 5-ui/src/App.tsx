import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/Header';
import Blockchain from 'components/Blockchain';
import Settings from 'components/Settings';
import CreateTransaction from 'components/CreateTransaction';
import PendingTransactions from 'components/PendingTransactions';
import { BlockchainService } from 'services/blockchain.service';

const blockchainService = new BlockchainService();

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
          <Switch>
            <Route path="/settings">
              <Settings blockchain={blockchainService.blockchainInstance} />
            </Route>
            <Route path="/create-transaction">
              <CreateTransaction blockchainService={blockchainService} />
            </Route>
            <Route path="/pending-transactions">
              <PendingTransactions blockchainService={blockchainService} />
            </Route>
            <Route path="/">
              <Blockchain blockchainService={blockchainService} />
            </Route>
          </Switch>
        </article>
      </>
    </Router>
  );
}

export default App;
