// @flow

import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </React.Fragment>
    );
  }
}

export default App;
