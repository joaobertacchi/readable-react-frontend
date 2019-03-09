// @flow

import { type PostType } from './post';
import { type CommentType } from './comment';
import { type CategoryType } from './category';

export type EntitiesState<EntityType> = {
  [string]: EntityType,
};

export type PostsStateType = EntitiesState<PostType>;
export type CommentsStateType = EntitiesState<CommentType>;
export type CategoriesStateType = Array<CategoryType>;

export type GlobalStateType = {
  categories: CategoriesStateType,
  comments: CommentsStateType,
  posts: PostsStateType,
};