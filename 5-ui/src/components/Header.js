import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Link, Toolbar } from '@material-ui/core';

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
          <ul>
            <li>
              <Link component={RouterLink} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link component={RouterLink} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link component={RouterLink} to="/users">
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
