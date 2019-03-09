// @flow

import { type IdType } from './shared';
import { type PostId } from './post';

export type CommentId = IdType;

export type CommentType = {
  author: string,
  body: string,
  id: CommentId,
  parentId: PostId,
  timestamp: number,
  voteScore: number,
};
