//@flow

import React from 'react';
import { Grid, Paper, Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Edit, Delete } from '@material-ui/icons';
import { connect } from 'react-redux';

import { type PostId, type PostType } from '../types/post';
import { type GlobalStateType } from '../types/state';
import { handleVotePost, handleDeletePost, type VoteOption } from '../actions/posts';

import ReadableHeader from './ReadableHeader';
import VotesHeader from './VotesHeader';

type StateProps = {
  loading: boolean,
  post: PostType,
}

type DispatchProps = {
  deletePost: Function,
  dispatchVote: Function,
};

type OwnProps = {
  onEdit: Function,
  postId: PostId,
  showButtons: boolean,
};

type StyleProps = {
  classes: Object,
}

type Props = StateProps & OwnProps & DispatchProps & StyleProps;

const styles = (theme: Object): Object => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  post: {
    padding: 20,
    margin: 10
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftHeader: {
    
  },
  rightHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 20,
  },
  fab: {
    margin: theme.spacing.unit,
  },
});

const Post = (props: Props): React$Node => {
  const {
    postId,
    post,
    loading,
    dispatchVote,
    classes,
    deletePost,
    showButtons,
    onEdit,
  } = props;

  if (loading) return null;

  const {
    title,
    body,
    author,
    timestamp,
    commentCount,
    voteScore,
    category,
  } = post;

  const date = new Date(timestamp).toISOString();

  return (
    <Grid item sm={12}>
      <Paper className={classes.post}>
        <div className={classes.headerContainer}>
          <ReadableHeader
            style={classes.leftHeader}
            headerPath={`/${category}/${postId}`}
            title={title}
            date={date}
            author={author}
            category={category}
          />
          <div className={classes.rightHeader}>
            <VotesHeader
              voteScore={voteScore}
              vote={dispatchVote}
            />
            <div>
              <Typography variant="caption" paragraph={true} color="textPrimary">
                {commentCount} comment{commentCount > 1 ? 's' : ''}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.bodyContainer}>
          <Typography variant="body2" paragraph={true} color="textPrimary">
            {body}
          </Typography>
        </div>
        {showButtons &&
          <div>
            {/* TODO: Add edit action */}
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
              onClick={(): void => deletePost(postId)}
              size="small"
            >
              <Delete />
            </IconButton>
        </div>
        }
      </Paper>
    </Grid>
  );
};

Post.defaultProps = {
  showButtons: false,
};

function mapStateToProps({ posts }: GlobalStateType, { postId }: OwnProps): StateProps {
  return {
    post: posts[postId],
    loading: !posts[postId],
  };
}

const mapDispatchToProps = (dispatch: Function, { postId }: OwnProps): Object => ({
  dispatchVote: (option: VoteOption): void => dispatch(handleVotePost({postId, option})),
  deletePost: (postId: PostId): void => dispatch(handleDeletePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
