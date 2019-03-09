// @flow

export type PostId = string;

export type PostType = {
  id: PostId,
  timestamp: number,
  title: string,
  body: string,
  author: string,
  category: string,
  commentCount: number,
  voteScore: number
};