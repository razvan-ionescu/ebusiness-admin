import createSagaMiddleware from 'redux-saga';
import { takeLatest, all } from 'redux-saga/effects';
import api from '../../lib/api';

const API = api();

export const sagaMiddleware = createSagaMiddleware();
