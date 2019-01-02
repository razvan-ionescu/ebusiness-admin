import { createReducer } from 'redux-act';

import { productActions } from '../actions';

const initialState = {
  products: [],
  currentProduct: {
    name: '',
    categoryId: '',
    author: '',
    stock: 0,
    price: 0.0,
    description: ''
  }
};

export default createReducer(
  {
    [productActions.getProductsSuccess]: (state, payload) => ({
      ...state,
      products: payload.length ? [...payload] : []
    }),
    [productActions.getProductSuccess]: (state, payload) => ({
      ...state,
      currentProduct: { ...payload }
    }),
    [productActions.updateProductSuccess]: (state, payload) => ({
      ...state,
      currentProduct: null,
      products: state.products.map(item => {
        if (item.id !== payload.id) return item;
        return {
          ...payload
        };
      })
    }),
    [productActions.deleteProductSuccess]: (state, payload) => ({
      ...state,
      products: state.products.filter(item => item.id !== payload),
      currentProduct: null
    })
  },
  initialState
);
