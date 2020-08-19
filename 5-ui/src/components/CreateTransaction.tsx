import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';

const { Transaction } = require('jediCoin');

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: `${theme.spacing(2)}px 0`,
    },
  },
}));

type CreateTransactionProps = {
  blockchainService: any;
};

const CreateTransaction: React.FC<CreateTransactionProps> = ({
  blockchainService,
}) => {
  const classes = useStyles();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const walletKey = blockchainService.walletKeys[0];
  const fromAddress = walletKey.publicKey;

  return (
    <section>
      <Typography component="header" variant="h4">
        Create Transaction
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          disabled
          fullWidth
          id="fromAddress"
          label="From address"
          value={fromAddress}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="toAddress"
          label="To address"
          onChange={(evt) => {
            // blockchain.miningReward = evt.target.value;
            setToAddress(evt.target.value);
          }}
          value={toAddress}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="amount"
          label="Amount"
          onChange={(evt) => {
            // blockchain.miningReward = evt.target.value;
            setAmount(evt.target.value);
          }}
          type="number"
          value={amount}
          variant="outlined"
        />
        <Button
          color="primary"
          onClick={(evt) => {
            evt.preventDefault();

            const tx = new Transaction(fromAddress, toAddress, amount);

            tx.signTransaction(walletKey.keyObj);
            blockchainService.addTransaction(tx);
            // INFO: reset UI
            setToAddress('');
            setAmount('');
          }}
          type="submit"
          variant="outlined"
        >
          Sign & create transaction
        </Button>
      </form>
    </section>
  );
};
export default CreateTransaction;
