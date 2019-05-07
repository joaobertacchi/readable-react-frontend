// @flow

import React from 'react';
import { connect } from 'react-redux';
import { handleInitialComments } from '../actions/comments';
import Comment from './Comment';
import { type PostId } from '../types/post';
import { type CommentId, type CommentType } from '../types/comment';
import { type GlobalStateType } from '../types/state';
import CommentListHeader from './CommentListHeader';
import CommentModal from './CommentModal';

type State = {
  commentOpen: boolean,
  selectedComment: CommentType,
};

type OwnProps = {
  postId: PostId,
};

type ConnectedProps = {
  dispatch: Function,
};

type StateProps = {
  commentIds: Array<CommentId>,
};

type Props = ConnectedProps & OwnProps & StateProps;

class CommentList extends React.Component<Props, State> {
  state = {
    commentOpen: false,
    selectedComment: undefined,
  };

  state: State;

  componentDidMount() {
    const { postId } = this.props;
    this.props.dispatch(handleInitialComments(postId));
  }

  handleOpen = () => {
    this.setState({ commentOpen: true });
  };
  
  handleClose = () => {
    this.setState({
      commentOpen: false,
      selectedComment: undefined,
    });
  };

  editComment = (comment: CommentType) => {
    this.setState({
      selectedComment: comment,
      commentOpen: true,
    });
  };

  render (): React$Node {
    const {
      commentIds,
      postId,
    } = this.props;

    const { commentOpen, selectedComment } = this.state;

    return (
      <React.Fragment>
        {commentOpen && <CommentModal
          modalTitle="Add new comment"
          onClose={this.handleClose}
          open={commentOpen}
          comment={{
            ...selectedComment,
            parentId: postId,
          }}
        />}
        <CommentListHeader onOpen={this.handleOpen} />
        {
          commentIds.map((commentId: CommentId): React$Node =>
            <Comment key={commentId} commentId={commentId} editComment={this.editComment} />)
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps({ comments }: GlobalStateType, { postId }: OwnProps): StateProps {
  return {
    commentIds: Object.values(comments)
      .filter(
        // $FlowFixMe
        (comment: CommentType): boolean =>
          (comment.parentId === postId))
      .map((comment: CommentType): CommentId => (comment.id)),
  };
}

export default connect(mapStateToProps)(CommentList);
