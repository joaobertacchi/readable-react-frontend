// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = (theme: Object): Object => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fab: {
    margin: theme.spacing.unit*3,
  },
});

type OwnProps = {
  classes: Object,
  onOpen: Function,
};

type Props = OwnProps;

class CommentListHeader extends React.Component<Props> {
  render(): React$Node {
    const { classes, onOpen } = this.props;

    return (
      <div className={classes.root}>
        <div />
        <Typography align="center" variant="headline" color="default">
          Comments
        </Typography>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={onOpen}
        >
          <Add />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(CommentListHeader);
