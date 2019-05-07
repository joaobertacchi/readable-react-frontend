// @flow
import * as API from '../utils/api';

import { type CommentType } from '../types/comment';
import { type PostId } from '../types/post';
import { type CommentId } from '../types/comment';

import { updateCommentCountAction } from './posts';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export type VoteOption = 'up' | 'down';

export type Vote = {
  commentId: CommentId,
  option: VoteOption,
};

type VoteCommentActionType = {
  type: 'VOTE_COMMENT',
  vote: Vote,
};

type ReceiveCommentsActionType = {
  comments: Array<CommentType>,
  type: 'RECEIVE_COMMENTS',
};

type AddCommentActionType = {
  comment: CommentType,
  type: 'ADD_COMMENT',
};

type DeleteCommentActionType = {
  commentId: CommentId,
  type: 'DELETE_COMMENT',
};

type UpdateCommentActionType = {
  comment: CommentType,
  type: 'UPDATE_COMMENT',
}

export type CommentActionType =
  AddCommentActionType |
  DeleteCommentActionType |
  UpdateCommentActionType |
  ReceiveCommentsActionType |
  VoteCommentActionType;

export const receiveCommentsAction = (comments: Array<CommentType>): ReceiveCommentsActionType => {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  };
};

export function voteComment(vote: Vote): VoteCommentActionType {
  return {
    type: VOTE_COMMENT,
    vote,
  };
}

export function handleVoteComment(vote: Vote): Function {
  return (dispatch: Function): ?Promise<void> => {
    if (vote.option === 'up')
      return API.upVoteComment(vote.commentId)
        .then((): void => dispatch(voteComment(vote)));
    else if (vote.option === 'down')
      return API.downVoteComment(vote.commentId)
        .then((): void => dispatch(voteComment(vote)));
    else
      return;
  };
}

export const addCommentAction = (comment: CommentType): AddCommentActionType => ({
  type: ADD_COMMENT,
  comment,
});

export const deleteCommentAction = (commentId: CommentId): DeleteCommentActionType => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

export const updateCommentAction = (comment: CommentType): UpdateCommentActionType => ({
  type: UPDATE_COMMENT,
  comment,
});

export const handleAddComment = (
  comment: CommentType,
): Function => (dispatch: Function): ?Promise<void> => {
  return API.addComment(comment)
    .then((comment: CommentType) => {
      dispatch(addCommentAction(comment));
      dispatch(updateCommentCountAction(comment.parentId, 'inc'));
    });
};

export const handleUpdateComment = (
  comment: CommentType,
): Function => (dispatch: Function): ?Promise<void> => {
  return API.updateComment(comment.id, comment)
    .then((result: CommentType): void => dispatch(updateCommentAction(result)));
};

export const handleDeleteComment = (commentId: CommentId): Function => {
  return (dispatch: Function): Promise<void> => {
    return API.deleteComment(commentId)
      .then(({ id, parentId }: CommentType) => {
        dispatch(deleteCommentAction(id));
        dispatch(updateCommentCountAction(parentId, 'dec'));
      });
  };
};

export const handleInitialComments = (postId: PostId): Function => {
  return (dispatch: Function): Promise<void> => {
    return API.getComments(postId)
      .then((comments: Array<CommentType>) => {
        dispatch(receiveCommentsAction(comments));
      });
  };
};
