import createSagaMiddleware from 'redux-saga';
import { takeLatest, all } from 'redux-saga/effects';
import api from '../../lib/api';

import * as auth from './auth';
import * as product from './product';
import * as category from './category';
import * as order from './order';
import {
  authTypes,
  productTypes,
  categoryTypes,
  orderTypes
} from '../actionTypes';

const API = api();

function* watchAuth() {
  yield all([
    takeLatest(authTypes.LOGIN, auth.login, API),
    takeLatest(authTypes.REGISTER, auth.register, API),
    takeLatest(authTypes.CHECK_AUTH, auth.checkAuth),
    takeLatest(authTypes.LOGOUT, auth.logout)
  ]);
}

function* watchProduct() {
  yield all([
    takeLatest(productTypes.ADD_PRODUCT, product.postProduct, API),
    takeLatest(productTypes.GET_PRODUCT, product.getProduct, API),
    takeLatest(productTypes.GET_PRODUCTS, product.getProducts, API),
    takeLatest(productTypes.UPDATE_PRODUCT, product.updateProduct, API),
    takeLatest(productTypes.DELETE_PRODUCT, product.deleteProduct, API)
  ]);
}

function* watchCategories() {
  yield all([
    takeLatest(categoryTypes.POST_CATEGORY, category.postCategory, API),
    takeLatest(categoryTypes.GET_CATEGORY, category.getCategory, API),
    takeLatest(categoryTypes.GET_CATEGORIES, category.getCategories, API),
    takeLatest(categoryTypes.UPDATE_CATEGORY, category.updateCategory, API),
    takeLatest(categoryTypes.DELETE_CATEGORY, category.deleteCategory, API)
  ]);
}

function* watchOrders() {
  yield all([
    takeLatest(orderTypes.GET_ORDERS, order.getOrders, API),
    takeLatest(orderTypes.PATCH_ORDER, order.patchOrder, API)
  ]);
}

export const sagaMiddleware = createSagaMiddleware();
export const authSaga = watchAuth;
export const productSaga = watchProduct;
export const categorySaga = watchCategories;
export const orderSaga = watchOrders;
