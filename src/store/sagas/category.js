import { put, call } from 'redux-saga/effects';
import { categoryActions } from '../actions';

export function* getCategories(api) {
  yield put(categoryActions.getCategoriesRequest());
  try {
    const response = yield call(api.getCategories);
    yield put(categoryActions.getCategoriesSuccess(response.data));
  } catch (e) {
    yield put(categoryActions.getCategoriesFailure(e));
  }
}

export function* getCategory(api, object) {
  yield put(categoryActions.getCategoryRequest());
  try {
    const response = yield call(api.getCategory, object.payload);
    yield put(categoryActions.getCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.getCategoryFailure(e));
  }
}

export function* postCategory(api, object) {
  yield put(categoryActions.postCategoryRequest());
  try {
    const response = yield call(api.postCategory, object.payload);
    yield put(categoryActions.postCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.postCategoryFailure(e));
  }
}

export function* deleteCategory(api, object) {
  yield put(categoryActions.deleteCategoryRequest());
  try {
    yield call(api.deleteCategory, object.payload);
    yield put(categoryActions.deleteCategorySuccess(object.payload));
  } catch (e) {
    yield put(categoryActions.deleteCategoryFailure(e));
  }
}

export function* updateCategory(api, object) {
  yield put(categoryActions.updateCategoryRequest());
  try {
    const response = yield call(
      api.patchCategory,
      object.payload.id,
      object.payload.category
    );
    yield put(categoryActions.updateCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.updateCategoryFailure(e));
  }
}
