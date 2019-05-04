// @flow

import {
  type PostActionType,
  RECEIVE_POSTS,
  ADD_POST,
  DELETE_POST,
  VOTE_POST,
  UPDATE_POST,
} from '../actions/posts';

import { type PostsStateType } from '../types/state';

import { type PostType, type PostId } from '../types/post';

const posts = (state: PostsStateType = {}, action: PostActionType): PostsStateType => {
  switch(action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts.reduce((acc: PostsStateType, post: PostType): PostsStateType => ({ ...acc, [post.id]: post}), {}),
      };
    case ADD_POST: {
      const { post } = action;
      return {
        ...state,
        [post.id]: post,
      };
    }
    case DELETE_POST: {
      const { postId } = action;
      return Object.entries(state).reduce(
          (acc: PostsStateType, [key, value]: [PostId, any]): PostsStateType => (
            key !== postId
              ? {
                  ...acc,
                  [key]: value,
                }
              : acc),
          {}
        );
    }
    case UPDATE_POST: {
      const { post } = action;
      return {
        ...state,
        [post.id]: post,
      };
    }
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
};

export default posts;
