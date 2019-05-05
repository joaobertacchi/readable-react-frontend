// @flow

import React from 'react';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Edit, Delete } from '@material-ui/icons';

const styles = (): Object => ({
  button: {
  },
});

type OwnProps = {
  onDelete: Function,
  onEdit: Function,
};

type StyleProps = {
  classes: Object,
}

type Props = OwnProps & StyleProps;

const ActionButtons = ({ classes, onEdit, onDelete }: Props): React$Node => (
  <div>
    <IconButton
      aria-label="Edit"
      className={classes.button}
      onClick={onEdit}
      color="secondary"
      size="small"
    >
      <Edit />
    </IconButton>
    <IconButton
      aria-label="Delete"
      className={classes.button}
      onClick={onDelete}
      size="small"
    >
      <Delete />
    </IconButton>
  </div>
);

ActionButtons.defaultProps = {
  onEdit: () => {
    return;
  },
  onDelete: () => {
    return;
  },
};

export default withStyles(styles)(ActionButtons);
