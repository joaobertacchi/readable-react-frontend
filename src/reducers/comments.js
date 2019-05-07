// @flow

import {
  type CommentActionType,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT,
} from '../actions/comments';
import { type CommentsStateType } from '../types/state';
import { type CommentType, type CommentId } from '../types/comment';

const comments = (state: CommentsStateType = {}, action: CommentActionType): CommentsStateType => {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments.reduce((acc: CommentsStateType, comment: CommentType): CommentsStateType => ({ ...acc, [comment.id]: comment}), {}),
      };
    case VOTE_COMMENT:
      if (['up', 'down'].includes(action.vote.option))
        return {
          ...state,
          [action.vote.commentId]: {
            ...state[action.vote.commentId],
            voteScore: state[action.vote.commentId].voteScore + (action.vote.option === 'up' ? 1 :  -1 ),
          },
        };
      return state;
    case DELETE_COMMENT: {
      const { commentId } = action;
      return Object.entries(state).reduce(
          (acc: CommentsStateType, [key, value]: [CommentId, any]): CommentsStateType => (
            key !== commentId
              ? {
                  ...acc,
                  [key]: value,
                }
              : acc),
          {}
        );
    }
    case ADD_COMMENT: {
      const { comment } = action;
      return {
        ...state,
        [comment.id]: comment,
      };
    }
    case UPDATE_COMMENT: {
      const { comment } = action;
      return {
        ...state,
        [comment.id]: comment,
      };
    }
    default:
      return state;
  }
};

export default comments; 
