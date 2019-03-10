// @flow

import React from 'react';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Post from './Post';
import { Footer } from './layouts';

import { type PostId } from '../types/post';
import { type GlobalStateType } from '../types/state';

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

type OwnProps = {
  selectedCategory: string,
};

type StateProps = {
  loading: boolean,
  postIds: Array<PostId>,
};

type Props = OwnProps & StyleProps & StateProps;

const PostList = ({ classes, postIds, loading, selectedCategory }: Props): React$Node => {
  return (
    <React.Fragment>
      {loading
        ? null
        : (<Grid container className={classes.main}>
            {postIds.map((postId: PostId): React$Node =>
              <Post
                key={postId}
                postId={postId}
              />
            )}
          </Grid>)
      }
      <Footer selectedCategory={selectedCategory} />
    </React.Fragment>
  );
};

PostList.defaultProps = {
  selectedCategory: '',
};

function mapStateToProps({ posts }: GlobalStateType, { selectedCategory }: OwnProps): StateProps {
  return {
    postIds: Object.keys(posts)
      .filter((postId: PostId): boolean => (selectedCategory ? posts[postId].category === selectedCategory : true))
      .sort((a: PostId, b: PostId): number => posts[b].timestamp - posts[a].timestamp),
    loading: !posts || Object.keys(posts).length === 0,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PostList));
