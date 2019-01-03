import { createReducer } from 'redux-act';

import { categoryActions } from '../actions';

const initialState = {
  categories: []
};

export default createReducer(
  {
    [categoryActions.getCategoriesSuccess]: (state, payload) => ({
      ...state,
      categories: payload.length ? [...payload] : []
    }),
    [categoryActions.getCategorySuccess]: (state, payload) => ({
      ...state,
      currentCategory: { ...payload }
    }),
    [categoryActions.postCategorySuccess]: (state, payload) => ({
      ...state,
      categories: [...state.categories, payload]
    }),
    [categoryActions.updateCategorySuccess]: (state, payload) => ({
      ...state,
      currentCategory: null,
      categories: state.categories.map(item => {
        if (item.id !== payload.id) return item;
        return {
          ...payload
        };
      })
    }),
    [categoryActions.deleteCategorySuccess]: (state, payload) => ({
      ...state,
      categories: state.categories.filter(item => item.id !== payload)
    })
  },
  initialState
);
