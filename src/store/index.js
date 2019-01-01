import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import { sagaMiddleware } from './sagas';

import * as reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers
});

let composeEnhancers = compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // eslint-disable-line
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
}

const configureStore = () =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

export default configureStore;
