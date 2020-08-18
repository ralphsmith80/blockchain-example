import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BlockchainService } from 'services/blockchain.service';
import Block from 'components/Block';

const blockchainService = new BlockchainService();

const useStyles = makeStyles((theme) => ({
  article: {
    margin: theme.spacing(2),
  },
  blockSection: {
    display: 'flex',
  },
}));

export default function Blockchain() {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    setBlocks(blockchainService.getBlocks());
  }, []);

  return (
    <article className={classes.article}>
      {/* <pre>{blocks && JSON.stringify(blocks, '', 2)}</pre> */}
      <section className={classes.blockSection}>
        {blocks.map((block, i) => (
          <Block block={block} key={i} />
        ))}
      </section>
    </article>
  );
}
