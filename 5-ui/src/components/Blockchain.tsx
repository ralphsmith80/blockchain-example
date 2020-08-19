import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Block from 'components/Block';
import TransactionsTable from 'components/TransactionsTable';

const useStyles = makeStyles((theme) => ({
  blockSection: {
    display: 'flex',
  },
  section: {
    marginBottom: theme.spacing(2),
  },
}));

type BlockchainProps = {
  blockchainService: any;
};

const Blockchain: React.FC<BlockchainProps> = ({ blockchainService }) => {
  const classes = useStyles();
  const blocks: [any] = blockchainService.getBlocks();
  const [selectedBlock, setSelectedBlock] = useState<any>(blocks[0]);

  return (
    <>
      <section className={`${classes.blockSection} ${classes.section}`}>
        {blocks.map((block, i) => (
          <Block
            block={block}
            key={i}
            onClick={() => setSelectedBlock(block)}
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
};
export default Blockchain;
