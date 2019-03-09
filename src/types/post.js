// @flow

import { type IdType } from './shared';

export type PostId = IdType;

export type PostType = {
  author: string,
  body: string,
  category: string,
  commentCount: number,
  id: PostId,
  timestamp: number,
  title: string,
  voteScore: number,
};