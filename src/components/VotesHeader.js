// @flow

import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ThumbDownOutlined, ThumbUpOutlined } from '@material-ui/icons';
import { type PostId } from '../types/post';

type StyleProps = {
  classes: Object,
};

type OwnProps = {
  vote: ({option: string, postId: PostId}) => void,
  voteScore: number,
};

type Props = StyleProps & OwnProps;

const styles = (theme: Object): Object => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const handleVote = (option: string, vote: Function): Function => (): void => vote(option);

const VotesHeader = ({ voteScore, vote, classes }: Props): React$Node => (
  <div>
    <IconButton
      className={classes.button}
      aria-label="Dislike"
      onClick={handleVote('down', vote)}
    >
      <ThumbDownOutlined />
    </IconButton>
    <Typography variant="caption" inline>
      {voteScore}
    </Typography>
    <IconButton
      className={classes.button}
      aria-label="Like"
      onClick={handleVote('up', vote)}
    >
      <ThumbUpOutlined />
    </IconButton>
  </div>
);

export default withStyles(styles)(VotesHeader);
