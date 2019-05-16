// @flow

import { type PostType, type PostId } from '../types/post';
import {
  upVotePost,
  downVotePost,
  addPost,
  deletePost,
  updatePost,
} from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const VOTE_POST = 'VOTE_POST';
export const UPDATE_COMMENT_COUNT = 'UPDATE_COMMENT_COUNT';

export type VoteOption = 'up' | 'down';

export type Vote = {
  option: VoteOption,
  postId: PostId,
};

type VotePostActionType = {
  type: 'VOTE_POST',
  vote: Vote,
};

type ReceivePostsActionType = {
  posts: Array<PostType>,
  type: 'RECEIVE_POSTS',
};

type AddPostActionType = {
  post: PostType,
  type: 'ADD_POST',
};

export type DeletePostActionType = {
  postId: PostId,
  type: 'DELETE_POST',
};

type UpdatePostActionType = {
  post: PostType,
  type: 'UPDATE_POST',
};

export type UpdateCommentCountOperationType = 'inc' | 'dec';

type UpdateCommentCountActionType = {
  operation: UpdateCommentCountOperationType,
  postId: PostId,
  type: 'UPDATE_COMMENT_COUNT',
};

export type PostActionType =
  AddPostActionType |
  DeletePostActionType |
  UpdatePostActionType |
  ReceivePostsActionType |
  VotePostActionType |
  UpdateCommentCountActionType;

export function receivePosts(posts: Array<PostType>): ReceivePostsActionType {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
}

export function votePost(vote: Vote): VotePostActionType {
  return {
    type: VOTE_POST,
    vote,
  };
}

export const addPostAction = (post: PostType): AddPostActionType => ({
  type: ADD_POST,
  post,
});

export const deletePostAction = (postId: PostId): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

export const updatePostAction = (post: PostType): UpdatePostActionType => ({
  type: UPDATE_POST,
  post,
});

export const updateCommentCountAction = (postId: PostId, operation: UpdateCommentCountOperationType): UpdateCommentCountActionType => ({
  type: UPDATE_COMMENT_COUNT,
  postId,
  operation,
});

export function handleVotePost(vote: Vote): Function {
  return (dispatch: Function): ?Promise<void> => {
    if (vote.option === 'up')
      return upVotePost(vote.postId)
        .then((): void => dispatch(votePost(vote)));
    else if (vote.option === 'down')
      return downVotePost(vote.postId)
        .then((): void => dispatch(votePost(vote)));
    else
      return;
  };
}

export const handleAddPost = (
  post: PostType,
): Function => (dispatch: Function): ?Promise<void> => {
  return addPost(post)
    .then((result: PostType): void => dispatch(addPostAction(result)));
};

export const handleUpdatePost = (
  post: PostType,
): Function => (dispatch: Function): ?Promise<void> => {
  return updatePost(post.id, post)
    .then((result: PostType): void => dispatch(updatePostAction(result)));
};

export const handleDeletePost = (
  postId: PostId,
): Function => (dispatch: Function): ?Promise<void> => {
  return deletePost(postId)
    .then((post: PostType): void => dispatch(deletePostAction(post.id)));
};
