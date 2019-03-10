//@flow

import React from 'react';
import { Input, Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { type PostId } from '../types/post';
import { type GlobalStateType, type PostsStateType } from '../types/state';

type StateProps = {
  loading: boolean,
  posts: PostsStateType,
}

type OwnProps = {
  postId: PostId,
};

type Props = StateProps & OwnProps;

const styles = {
  post: {
    padding: 20,
    margin: 10
  }
};

const Post = (props: Props): React$Node => {
  const { postId, posts, loading } = props;

  if (loading) return null;

  const post = posts[postId];
  const {
    title,
    body,
    author,
    timestamp,
    commentCount,
    voteScore,
    category
  } = post;

  const date = new Date(timestamp).toISOString();

  return (
    <Grid item sm={8}>
      <Paper style={styles.post}>
        <Input type="text" placeholder="Title" value={title} />
        <br />
        <Input type="text" multiline={true} placeholder="Body" value={body} />
        <br />
        <Input type="text" placeholder="Author" value={author} />
        <br />
        <span>Category: {category}</span>
        <br />
        <span>Created in {date}</span>
        <br />
        <span>Score: {voteScore}</span>
        <br />
        <span>
          {commentCount} comment{commentCount > 1 ? 's' : ''}
        </span>
        <br />
        <Link to={`/${category}/${postId}`}>More...</Link>
      </Paper>
    </Grid>
  );
};

function mapStateToProps({ posts }: GlobalStateType): StateProps {
  return {
    posts,
    loading: !posts || Object.keys(posts).length === 0,
  };
}

export default connect(mapStateToProps)(Post);
