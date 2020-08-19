import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  block: {
    marginLeft: theme.spacing(2),
    '&:first-child': {
      marginLeft: 0,
    },
  },
  content: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

type BlockProps = {
  block: any;
  onClick(): void;
};

const Block: React.FC<BlockProps> = ({ block, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={classes.block} variant="outlined" {...rest}>
      <CardHeader
        title={`Block ${block.previousHash === '0' ? '(Genesis block)' : ''}`}
      />
      <CardContent>
        <List>
          <ListItem>
            <ListItemText
              primary="Hash"
              secondary={block.hash}
              secondaryTypographyProps={{ className: classes.content }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Hash of previous block"
              secondary={block.previousHash}
              secondaryTypographyProps={{ className: classes.content }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Nonce" secondary={block.nonce} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Timestamp" secondary={block.timestamp} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
export default Block;
