//@flow

import React from 'react';
import Post from './Post';
import CommentList from './CommentList';

import { type PostId } from '../types/post';

import { withStyles } from '@material-ui/core/styles';

const styles = (): Object => ({
  main: {
    marginTop: 80,
    marginBottom: 60,
    justifyContent: 'space-around',
  },
});

type StyleProps = {
  classes: Object,
}

type RouterProps = {
  match: {
    params: {
      postId: PostId,
    },
  },
  postId: PostId,
};

type Props = RouterProps & StyleProps;

const PostDetails = (props: Props): React$Node => {
  const { classes,
    match: {
      params: {
        postId
      },
    }
  } = props;
  return (
    <div className={classes.main}>
      <Post postId={postId} />
      <CommentList postId={postId} />
    </div>
  );
};

export default withStyles(styles)(PostDetails);