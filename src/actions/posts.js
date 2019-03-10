// @flow

import { type PostType } from '../types/post';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

export type ReceivePostsActionType = {
  posts: Array<PostType>,
  type: 'RECEIVE_POSTS',
};

export function receivePosts(posts: Array<PostType>): ReceivePostsActionType {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
}
