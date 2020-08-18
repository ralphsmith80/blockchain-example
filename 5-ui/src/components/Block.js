import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
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
    margin: theme.spacing(2),
  },
  content: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export default function Block({ block }) {
  const classes = useStyles();

  return (
    <Card className={classes.block} variant="outlined">
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
}
