// @flow

const api = 'http://localhost:3001';

// Generate a unique token for storing your data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

export type Post = {
  id: string,
  timestamp: Date,
  title: string,
  body: string,
  author: string,
  category: string,
};

export type PostUpdate = {
  title: string,
  body: string,
};

export type Comment = {
  id: string,
  timestamp: Date,
  body: string,
  author: string,
  parentId: string,
};

export type CommentUpdate = {
  timestamp: ?Date,
  body: string,
};

export const getInitialData = () => {
  return Promise.all([
    getCategories(),
    getPosts(),
  ]).then(([categories, posts]) => (
    {
      categories,
      posts,
    }
  ));
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = (category: ?string) =>
  typeof category === 'string' && category.length > 0
  ? fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
  : fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const getPost = (postId: string) =>
  typeof postId === 'string' && postId.length > 0
  ? fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
  : null;

export const addPost = (post: Post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

const votePost = (postId: string, up: boolean) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: up ? 'upVote' : 'downVote',
    })
  }).then(res => res.json());

export const upVotePost = (postId: string) =>
  votePost(postId, true);

export const downVotePost = (postId: string) =>
  votePost(postId, false);

export const updatePost = (postId: string, postUpdate: PostUpdate) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postUpdate)
  }).then(res => res.json());

export const deletePost = (postId: string) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());

export const getComments = (postId: string) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json());

export const addComment = (comment: Comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const getComment = (commentId: string) =>
  typeof commentId === 'string' && commentId.length > 0
  ? fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
  : null;

const voteComment = (commentId: string, up: boolean) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: up ? 'upVote' : 'downVote',
    })
  }).then(res => res.json());

export const upVoteComment = (commentId: string) =>
  voteComment(commentId, true);

export const downVoteComment = (commentId: string) =>
  voteComment(commentId, false);

export const updateComment = (commentId: string, commentUpdate: CommentUpdate) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentUpdate)
  }).then(res => res.json());

export const deleteComment = (commentId: string) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
