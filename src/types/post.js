// @flow

import { type IdType } from './shared';

export type PostId = IdType;

export const Constants = {
  sortType: {
    DATE: 'timestamp',
    SCORE: 'voteScore',
    TITLE: 'title',
  },
};

export type SortType = 'timestamp' | 'voteScore' | 'title';

export type PostType = {
  author: string,
  body: string,
  category: string,
  commentCount: number,
  deleted: boolean,
  id: PostId,
  timestamp: number,
  title: string,
  voteScore: number,
};