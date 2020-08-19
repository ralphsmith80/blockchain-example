import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { BlockchainService } from 'services/blockchain.service';
import Block from 'components/Block';
import TransactionsTable from 'components/TransactionsTable';

const blockchainService = new BlockchainService();

const useStyles = makeStyles((theme) => ({
  blockSection: {
    display: 'flex',
  },
  section: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Blockchain() {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState<any>();

  useEffect(() => {
    const blocks = blockchainService.getBlocks();
    setBlocks(blocks);
    setSelectedBlock(blocks[0]);
  }, []);

  return (
    <>
      <section className={`${classes.blockSection} ${classes.section}`}>
        {blocks.map((block, i) => (
          <Block
            block={block}
            key={i}
            onClick={() => {
              console.log('click');
              setSelectedBlock(block);
            }}
          />
        ))}
      </section>
      <section className={classes.section}>
        <Typography component="header" variant="h4">
          Transactions inside block
        </Typography>
        {Array.isArray(selectedBlock?.transactions) ? (
          <TransactionsTable transactions={selectedBlock?.transactions} />
        ) : (
          <Typography>This block has no transactions</Typography>
        )}
      </section>
    </>
  );
}
