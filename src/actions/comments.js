// @flow
import { getComments } from '../utils/api';

import { type CommentType } from '../types/comment';
import { type PostId } from '../types/post';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export type ReceiveCommentsActionType = {
  comments: Array<CommentType>,
  type: 'RECEIVE_COMMENTS',
};

export function receiveComments(comments: Array<CommentType>): ReceiveCommentsActionType {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  };
}

export function handleInitialComments(postId: PostId): Function {
  return (dispatch: Function): Promise<void> => {
    return getComments(postId)
      .then((comments: Array<CommentType>) => {
        dispatch(receiveComments(comments));
      });
  };
}
