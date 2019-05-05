// @flow

import React from 'react';
import { connect } from 'react-redux';
import { handleInitialComments } from '../actions/comments';
import Comment from './Comment';
import { type PostId } from '../types/post';
import { type CommentId, type CommentType } from '../types/comment';
import { type PostsStateType, type GlobalStateType } from '../types/state';
import CommentListHeader from './CommentListHeader';

type OwnProps = {
  postId: PostId,
};

type ConnectedProps = {
  dispatch: Function,
};

type StateProps = {
  commentIds: Array<CommentId>,
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
    const { commentIds, loading } = this.props;

    if (loading)
      return null;

    return (
      <React.Fragment>
      <CommentListHeader />
        {
          commentIds.map((commentId: CommentId): React$Node =>
            <Comment key={commentId} commentId={commentId} />)
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps({ comments, posts }: GlobalStateType, { postId }: OwnProps): StateProps {
  return {
    commentIds: Object.values(comments)
      .filter(
        // $FlowFixMe
        (comment: CommentType): boolean =>
          (comment.parentId === postId))
      .map((comment: CommentType): CommentId => (comment.id)),
    posts,
    loading: !posts || Object.keys(posts).length === 0 || !comments || Object.keys(comments).length === 0,
  };
}

export default connect(mapStateToProps)(CommentList);
