import { createReducer } from 'redux-act';

import { orderActions } from '../actions';

const initialState = {
  orders: []
};

export default createReducer(
  {
    [orderActions.getOrdersSuccess]: (state, payload) => ({
      ...state,
      orders: payload.length ? [...payload] : []
    }),
    [orderActions.patchOrderSuccess]: (state, payload) => ({
      ...state,
      orders: state.orders.map(item => {
        if (item.id !== payload.id) return item;
        return { ...payload };
      })
    })
  },
  initialState
);
