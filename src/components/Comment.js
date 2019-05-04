//@flow

import React from 'react';
import { Input, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { type GlobalStateType, type CommentsStateType } from '../types/state';
import { type CommentId } from '../types/comment';
import { handleVoteComment, handleDeleteComment, type VoteOption } from '../actions/comments';

import ReadableHeader from './ReadableHeader';
import VotesHeader from './VotesHeader';
import ActionButtons from './ActionButtons';

const styles = (): Object => ({
  post: {
    padding: 20,
    margin: 10
  }
});

type StateProps = {
  comments: CommentsStateType,
};

type OwnProps = {
  commentId: CommentId,
};

type DispatchProps = {
  deletePost: Function,
  dispatchVote: Function,
};

type StyleProps = {
  classes: Object,
};

type Props = StateProps & OwnProps & StyleProps & DispatchProps;

const Comment = (props: Props): React$Node => {
  const { commentId, comments, classes, dispatchVote } = props;
  const comment = comments[commentId];
  const {
    author,
    body,
    timestamp,
    voteScore,
  } = comment;

  const date = new Date(timestamp).toISOString();

  return (
    <Grid item sm={12}>
      <Paper className={classes.post}>
        <ReadableHeader
          date={date}
          author={author}
        />
        <VotesHeader
          voteScore={voteScore}
          vote={dispatchVote}
        />
        <Input type="text" multiline={true} placeholder="Body" value={body} />
        <ActionButtons />
      </Paper>
    </Grid>
  );
};

function mapStateToProps({ comments }: GlobalStateType): StateProps {
  return {
    comments,
  };
}

const mapDispatchToProps = (dispatch: Function, { commentId }: OwnProps): Object => ({
  dispatchVote: (option: VoteOption): void => dispatch(handleVoteComment({commentId, option})),
  deletePost: (commentId: CommentId): void => dispatch(handleDeleteComment(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Comment));
