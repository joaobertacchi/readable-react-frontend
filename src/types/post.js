// @flow

import { type IdType } from './shared';

export type PostId = IdType;

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