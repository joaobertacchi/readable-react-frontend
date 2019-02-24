// @flow

import uuidv4 from 'uuid/v4';

import { type PostType, type PostId } from '../types/post';
import { type CategoryType } from '../types/category';
import { type CommentType, type CommentId } from '../types/comment';

const api = 'http://localhost:3001';

// Generate a unique token for storing your data on the backend server.
//$FlowFixMe
let token = localStorage.token;
if (!token)
//$FlowFixMe
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

export type Comment = {
  author: string,
  body: string,
  id: string,
  parentId: string,
  timestamp: Date,
};

export type CommentUpdate = {
  body: string,
  timestamp: ?Date,
};

export type GetCategoriesResponse = Array<CategoryType>;

export const getCategories = (): Promise<GetCategoriesResponse> =>
  fetch(`${api}/categories`, { headers })
    .then((res: Response): Promise<{ categories: GetCategoriesResponse}> => res.json())
    .then(({ categories }: { categories: GetCategoriesResponse}): GetCategoriesResponse => categories);

export type GetPostsResponse = Array<PostType>;

export const getPosts = (category: ?string): Promise<GetPostsResponse> =>
  typeof category === 'string' && category.length > 0
  ? fetch(`${api}/${category}/posts`, { headers })
    .then((res: Response): Promise<GetPostsResponse> => res.json())
  : fetch(`${api}/posts`, { headers })
    .then((res: Response): Promise<GetPostsResponse> => res.json());

export const getPost = (postId: string): ?Promise<PostType> =>
  typeof postId === 'string' && postId.length > 0
  ? fetch(`${api}/posts/${postId}`, { headers })
    .then((res: Response): Promise<PostType> => res.json())
  : null;

export type AddPostRequest = {
  author: string,
  body: string,
  category: string,
  id: PostId,
  timestamp: number,
  title: string,
};

export const addPost = (post: AddPostRequest): Promise<PostType> =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...post,
      id: uuidv4(),
      timestamp: new Date().getTime(),
    })
  }).then((res: Response): Promise<PostType> => res.json());

const votePost = (postId: PostId, up: boolean): Promise<PostType> =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: up ? 'upVote' : 'downVote',
    })
  }).then((res: Response): Promise<PostType> => res.json());

export const upVotePost = (postId: PostId): Promise<PostType>  =>
  votePost(postId, true);

export const downVotePost = (postId: PostId): Promise<PostType> =>
  votePost(postId, false);

export type UpdatePostRequest = {
  author: string,
  body: string,
  category: string,
  timestamp: number,
  title: string,
};

export const updatePost = (postId: PostId, postUpdate: UpdatePostRequest): Promise<PostType> =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postUpdate)
  }).then((res: Response): Promise<PostType> => res.json());

export const deletePost = (postId: PostId): Promise<PostType> =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then((res: Response): Promise<PostType> => res.json());

export type GetCommentsResponse = Array<CommentType>;

export const getComments = (postId: PostId): Promise<GetCommentsResponse> =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then((res: Response): Promise<GetCommentsResponse> => res.json());

export type AddCommentRequest = {
  author: string,
  body: string,
  id: CommentId,
  parentId: PostId,
  timestamp: number,
};

export const addComment = (comment: AddCommentRequest): Promise<CommentType> =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then((res: Response): Promise<CommentType> => res.json());

export const getComment = (commentId: string): ?Promise<CommentType> =>
  typeof commentId === 'string' && commentId.length > 0
  ? fetch(`${api}/comments/${commentId}`, { headers })
    .then((res: Response): Promise<CommentType> => res.json())
  : null;

const voteComment = (commentId: CommentId, up: boolean): Promise<CommentType> =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: up ? 'upVote' : 'downVote',
    })
  }).then((res: Response): Promise<CommentType> => res.json());

export const upVoteComment = (commentId: CommentId): Promise<CommentType> =>
  voteComment(commentId, true);

export const downVoteComment = (commentId: CommentId): Promise<CommentType> =>
  voteComment(commentId, false);

export type UpdateCommentRequest = {
  author: string,
  body: string,
  parentId: PostId,
  timestamp: number,
};

export const updateComment = (commentId: CommentId, commentUpdate: UpdateCommentRequest): Promise<CommentType> =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentUpdate)
  }).then((res: Response): Promise<CommentType> => res.json());

export const deleteComment = (commentId: CommentId): Promise<CommentType> =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then((res: Response): Promise<CommentType> => res.json());

export type GetInitialDataResponse = {
  categories: GetCategoriesResponse,
  posts: GetPostsResponse,
}

export const getInitialData = (): Promise<GetInitialDataResponse> => {
  return Promise.all([
    getCategories(),
    getPosts(),
  ]).then(([categories, posts]: Array<any>): GetInitialDataResponse => (
    {
      categories,
      posts,
    }
  ));
};
