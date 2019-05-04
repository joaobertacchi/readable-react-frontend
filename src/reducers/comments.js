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
import { type CommentType } from '../types/comment';

const comments = (state: CommentsStateType = {}, action: CommentActionType): CommentsStateType => {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments.reduce((acc: CommentsStateType, comment: CommentType): CommentsStateType => ({ ...acc, [comment.id]: comment}), {}),
      };
    case ADD_COMMENT:
    case DELETE_COMMENT:
    case VOTE_COMMENT:
    case UPDATE_COMMENT:
    default:
      return state;
  }
};

export default comments; 
