// @flow

import {
  type PostsActionType,
  RECEIVE_POSTS,
  VOTE_POST,
} from '../actions/posts';

import { type PostsStateType } from '../types/state';

import { type PostType } from '../types/post';

export default function posts (state: PostsStateType = {}, action: PostsActionType): PostsStateType {
  switch(action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts.reduce((acc: PostsStateType, post: PostType): PostsStateType => ({ ...acc, [post.id]: post}), {}),
      };
    // case ADD_POST:
    // case DELETE_POST:
    case VOTE_POST:
      if (['up', 'down'].includes(action.vote.option))
        return {
          ...state,
          [action.vote.postId]: {
            ...state[action.vote.postId],
            voteScore: state[action.vote.postId].voteScore + (action.vote.option === 'up' ? 1 :  -1 ),
          },
        };
      return state;
    default:
      return state;
  }
}
