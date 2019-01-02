import { createReducer } from 'redux-act';

import { categoryActions } from '../actions';

const initialState = {
  categories: [],
  currentCategory: {
    name: '',
    description: ''
  }
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
      categories: state.categories.filter(item => item.id !== payload),
      currentCategory: null
    })
  },
  initialState
);
