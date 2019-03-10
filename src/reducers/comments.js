// @flow

import { RECEIVE_COMMENTS } from '../actions/comments';
import { type ReceiveCommentsActionType } from '../actions/comments';
import { type CommentsStateType } from '../types/state';
import { type CommentType } from '../types/comment';

export default function comments (state: CommentsStateType = {}, action: ReceiveCommentsActionType): CommentsStateType {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments.reduce((acc: CommentsStateType, comment: CommentType): CommentsStateType => ({ ...acc, [comment.id]: comment}), {}),
      };
    default:
      return state;
  }
}
