// @flow

import { type ReceivePostsActionType, RECEIVE_POSTS } from '../actions/posts';

import { type PostsStateType } from '../types/state';

import { type PostType } from '../types/post';

export default function posts (state: PostsStateType = {}, action: ReceivePostsActionType): PostsStateType {
  switch(action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts.reduce((acc: PostsStateType, post: PostType): PostsStateType => ({ ...acc, [post.id]: post}), {}),
      };
    // case ADD_POST:
    // case DELETE_POST:
    default:
      return state;
  }
}
