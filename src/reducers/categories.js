// @flow

import { type ReceiveCategoriesActionType, RECEIVE_CATEGORIES } from '../actions/categories';
import { type CategoriesStateType } from '../types/state';

export default function categories (state: CategoriesStateType = [], action: ReceiveCategoriesActionType): CategoriesStateType {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return [
        ...state,
        ...action.categories,
      ];
    default:
      return state;
  }
}
