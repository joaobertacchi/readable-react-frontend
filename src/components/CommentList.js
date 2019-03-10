// @flow

import React from 'react';
import { connect } from 'react-redux';
import { handleInitialComments } from '../actions/comments';
import Comment from './Comment';
import { type PostId } from '../types/post';
import { type CommentId } from '../types/comment';
import { type CommentsStateType, type PostsStateType, type GlobalStateType } from '../types/state';

type OwnProps = {
  postId: PostId,
};

type ConnectedProps = {
  dispatch: Function,
};

type StateProps = {
  comments: CommentsStateType,
  loading: boolean,
  posts: PostsStateType,
};

type Props = ConnectedProps & OwnProps & StateProps;

class CommentList extends React.Component<Props> {
  componentDidMount() {
    const { postId } = this.props;
    this.props.dispatch(handleInitialComments(postId));
  }

  render (): React$Node {
    const { comments, loading } = this.props;

    if (loading)
      return null;

    return Object.keys(comments).map((id: CommentId): React$Node =>
      <Comment key={id} commentId={id} />);
  }
}

function mapStateToProps({ comments, posts }: GlobalStateType): StateProps {
  return {
    comments,
    posts,
    loading: !posts || Object.keys(posts).length === 0 || !comments || Object.keys(comments).length === 0,
  };
}

export default connect(mapStateToProps)(CommentList);
