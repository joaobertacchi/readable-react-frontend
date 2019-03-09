// @flow

import { type PostType } from './post';
import { type CommentType } from './comment';
import { type CategoryType } from './category';

export type EntitiesState<EntityType> = {
  [string]: EntityType,
};
export type LocalState<EntityType> = {
  entities: EntitiesState<EntityType>,
};

export type PostsStateType = LocalState<PostType>;
export type CommentsStateType = LocalState<CommentType>;
export type CategoriesStateType = [CategoryType];

export type GlobalStateType = {
  categories: CategoriesStateType,
  comments: CommentsStateType,
  posts: PostsStateType,
};