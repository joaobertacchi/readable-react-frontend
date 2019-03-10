// @flow

import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Header = (): React$Node => (
  <AppBar position="fixed" color="default">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Readable
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;