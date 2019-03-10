//@flow

import React from 'react';
import { Input, Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';

import { type GlobalStateType, type CommentsStateType } from '../types/state';
import { type CommentId } from '../types/comment';

const styles = {
  post: {
    padding: 20,
    margin: 10
  }
};

type StateProps = {
  comments: CommentsStateType,
};

type OwnProps = {
  commentId: CommentId,
}

type Props = StateProps & OwnProps;

const Comment = (props: Props): React$Node => {
  const { commentId, comments } = props;
  const comment = comments[commentId];
  const {
    author,
    body,
    timestamp,
    voteScore,
  } = comment;

  const date = new Date(timestamp).toISOString();

  return (
    <Grid item sm={8}>
      <Paper style={styles.post}>
        <Input type="text" multiline={true} placeholder="Body" value={body} />
        <br />
        <Input type="text" placeholder="Author" value={author} />
        <br />
        <span>Created in {date}</span>
        <br />
        <span>Score: {voteScore}</span>
        <br />
      </Paper>
    </Grid>
  );
};

function mapStateToProps({ comments }: GlobalStateType): StateProps {
  return {
    comments,
  };
}

export default connect(mapStateToProps)(Comment);
