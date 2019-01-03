import { put, call } from 'redux-saga/effects';
import { productActions } from '../actions';

export function* getProducts(api) {
  yield put(productActions.getProductsRequest());
  try {
    const response = yield call(api.getProducts);
    yield put(productActions.getProductsSuccess(response.data));
  } catch (e) {
    yield put(productActions.getProductsFailure(e));
  }
}

export function* getProduct(api, object) {
  yield put(productActions.getProductRequest());
  try {
    const response = yield call(api.getProduct, object.payload);
    yield put(productActions.getProductSuccess(response.data));
  } catch (e) {
    yield put(productActions.getProductFailure(e));
  }
}

export function* postProduct(api, object) {
  yield put(productActions.addProductRequest());
  try {
    const imageFormData = new FormData();
    const image = object.payload.image;
    delete object.payload.image;
    imageFormData.append('product', image);
    const response = yield call(api.postProduct, object.payload);
    const imageResponse = yield call(
      api.postProductImage,
      response.data.id,
      imageFormData
    );
    yield put(productActions.addProductSuccess(imageResponse.data));
  } catch (e) {
    yield put(productActions.addProductFailure(e));
  }
}

export function* deleteProduct(api, object) {
  yield put(productActions.deleteProductRequest());
  try {
    yield call(api.deleteProduct, object.payload);
    yield put(productActions.deleteProductSuccess(object.payload));
  } catch (e) {
    yield put(productActions.deleteProductFailure(e));
  }
}

export function* updateProduct(api, object) {
  yield put(productActions.updateProductRequest());
  try {
    const response = yield call(
      api.patchProduct,
      object.payload.id,
      object.payload.product
    );
    yield put(productActions.updateProductSuccess(response.data));
  } catch (e) {
    yield put(productActions.updateProductFailure(e));
  }
}
