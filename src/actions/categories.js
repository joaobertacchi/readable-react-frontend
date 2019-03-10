// @flow

import { type CategoryType } from '../types/category';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export type ReceiveCategoriesActionType = {
  categories: Array<CategoryType>,
  type: 'RECEIVE_CATEGORIES',
};

export function receiveCategories(categories: Array<CategoryType>): ReceiveCategoriesActionType {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}
