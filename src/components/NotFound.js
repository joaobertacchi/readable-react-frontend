// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

type StyleProps = {
  classes: Object,
};

type OwnProps = {
  location: Object,
};

type Props = StyleProps & OwnProps;

const styles = (): Object => ({
  main: {
    marginTop: 80,
    marginBottom: 60,
    height: '100%',
    minWidth: '800px',
  },
});

const NotFound = ({ location, classes }: Props): React$Node => (
  <div className={classes.main}>
    <h3>404 - page <code>{location.pathname}</code> was not found! Go back to <Link to={'/'}>Home</Link></h3>
  </div>
);

export default withStyles(styles)(NotFound);