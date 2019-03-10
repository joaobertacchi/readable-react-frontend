// @flow

import { getInitialData } from '../utils/api';
import { receivePosts } from '../actions/posts';
import { receiveCategories } from '../actions/categories';
import { type CategoryType } from '../types/category';
import { type PostType } from '../types/post';

export function handleInitialData(): Function {
  return (dispatch: Function): Promise<void> => {
    return getInitialData()
      .then(({
        categories,
        posts,
      }: {
        categories: Array<CategoryType>,
        posts: Array<PostType>,
      }) => {
        dispatch(receiveCategories(categories));
        dispatch(receivePosts(posts));
      });
  };
}