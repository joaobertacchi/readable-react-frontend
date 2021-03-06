//@flow

import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { type GlobalStateType, type CommentsStateType } from '../types/state';
import { type CommentId } from '../types/comment';
import { handleVoteComment, handleDeleteComment, type VoteOption } from '../actions/comments';

import ReadableHeader from './ReadableHeader';
import VoteButtons from './VoteButtons';
import ActionButtons from './ActionButtons';

const styles = (): Object => ({
  post: {
    padding: 20,
    margin: 10
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    marginTop: 20,
  },
});

type StateProps = {
  comments: CommentsStateType,
};

type OwnProps = {
  commentId: CommentId,
};

type DispatchProps = {
  deleteComment: Function,
  dispatchVote: Function,
  editComment: Function,
};

type StyleProps = {
  classes: Object,
};

type Props = StateProps & OwnProps & StyleProps & DispatchProps;

const Comment = (props: Props): React$Node => {
  const { commentId, comments, classes, dispatchVote, deleteComment, editComment } = props;
  const comment = comments[commentId];
  const {
    author,
    body,
    timestamp,
    voteScore,
  } = comment;

  const date = new Date(timestamp).toISOString();
  const onDelete = (): void => deleteComment(commentId);
  const onEdit = (): void => editComment(comment);

  return (
    <Grid item sm={12}>
      <Paper className={classes.post}>
        <ReadableHeader
          date={date}
          author={author}
        />
        <div className={classes.bodyContainer}>
          <Typography variant="body2" paragraph={true} color="textPrimary">
            {body}
          </Typography>
        </div>
        <div className={classes.footer}>
          <ActionButtons
            onDelete={onDelete}
            onEdit={onEdit}
          />
          <VoteButtons
            voteScore={voteScore}
            vote={dispatchVote}
          />
        </div>
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
  deleteComment: (commentId: CommentId): void => dispatch(handleDeleteComment(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Comment));
