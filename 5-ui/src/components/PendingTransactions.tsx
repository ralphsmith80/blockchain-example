import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import TransactionsTable from 'components/TransactionsTable';

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: theme.spacing(2),
  },
}));

type PendingTransactionsProps = {
  blockchainService: any;
};

const PendingTransactions: React.FC<PendingTransactionsProps> = ({
  blockchainService,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const pendingTransactions = blockchainService.getPendingTransactions();

  return (
    <section>
      <Typography className={classes.item} component="header" variant="h4">
        Pending Transactions
      </Typography>
      {pendingTransactions.length ? (
        <TransactionsTable
          className={classes.item}
          transactions={pendingTransactions}
        />
      ) : (
        <Typography className={classes.item}>
          No pending transactions
        </Typography>
      )}
      <Button
        color="primary"
        onClick={(evt) => {
          blockchainService.minePendingTransactions();
          history.push('/');
        }}
        variant="outlined"
      >
        Start mining
      </Button>
    </section>
  );
};
export default PendingTransactions;
