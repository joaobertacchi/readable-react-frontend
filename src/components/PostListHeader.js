// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Fab,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { type SortType, Constants } from '../types/post';

const styles = (theme: Object): Object => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing.unit*3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  fab: {
    margin: theme.spacing.unit*3,
  },
});

type OwnProps = {
  classes: Object,
  onOpen: Function,
  onSortType: Function,
  sortType: SortType,
};

type Props = OwnProps;

class PostListHeader extends React.Component<Props> {
  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { onSortType } = this.props;
    onSortType(event.currentTarget.value);
  };

  render(): React$Node {
    const { classes, sortType, onOpen } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Sort by</FormLabel>
          <RadioGroup
            aria-label="Sort by"
            name="sortBy"
            className={classes.group}
            value={sortType}
            onChange={this.handleChange}
            row={true}
          >
            <FormControlLabel value={Constants.sortType.TITLE} control={<Radio />} label="Title" />
            <FormControlLabel value={Constants.sortType.DATE} control={<Radio />} label="Date" />
            <FormControlLabel value={Constants.sortType.SCORE} control={<Radio />} label="Score" />
          </RadioGroup>
        </FormControl>
        {/* // TODO: Add new action */}
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

export default withStyles(styles)(PostListHeader);
