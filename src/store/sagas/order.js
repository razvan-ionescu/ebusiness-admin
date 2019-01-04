import { put, call } from 'redux-saga/effects';
import { orderActions } from '../actions';

export function* getOrders(api) {
  yield put(orderActions.getOrdersRequest());
  try {
    const response = yield call(api.getOrders);
    yield put(orderActions.getOrdersSuccess(response.data));
  } catch (e) {
    yield put(orderActions.getOrdersFailure(e));
  }
}

export function* patchOrder(api, object) {
  yield put(orderActions.patchOrderRequest());
  try {
    const response = yield call(api.patchOrder, object.payload);
    yield put(orderActions.patchOrderSuccess(response.data));
  } catch (e) {
    yield put(orderActions.patchOrderFailure(e));
  }
}
