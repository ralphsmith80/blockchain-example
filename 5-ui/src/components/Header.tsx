import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Link, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  Toolbar: {
    justifyContent: 'space-between',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.Toolbar}>
        <Link
          color="inherit"
          component={RouterLink}
          to="/"
          underline="none"
          variant="h6"
        >
          Jedi Coin
        </Link>
        <nav>
          <Button
            color="inherit"
            component={RouterLink}
            to="/settings"
            variant="outlined"
          >
            Settings
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
