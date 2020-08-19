import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

type TransactionsProps = {
  transactions?: any;
};

const TransactionsTable: React.FC<TransactionsProps> = ({ transactions }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Valid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction: any, index: number) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell>
                {transaction.fromAddress === null
                  ? 'Chain'
                  : transaction.fromAddress}
              </TableCell>
              <TableCell>{transaction.toAddress}</TableCell>
              <TableCell align="right">
                {transaction.fromAddress === null ? (
                  <>
                    <Typography>{transaction.amount}</Typography>
                    <Typography color="textSecondary" variant="subtitle2">
                      Block reward
                    </Typography>
                  </>
                ) : (
                  transactions.amount
                )}
              </TableCell>
              <TableCell>
                <Typography>{transaction.timestamp}</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  {new Date(transaction.timestamp).toUTCString()}
                </Typography>
              </TableCell>
              <TableCell>
                {transaction?.isValid?.() ? '\u2714' : '\u2717'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TransactionsTable.defaultProps = {
  transactions: [],
};
export default TransactionsTable;
