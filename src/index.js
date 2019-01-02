import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bulma/css/bulma.min.css';
import * as serviceWorker from './serviceWorker';

import './lib/fontAwesome';

import { Provider } from 'react-redux';

import configureStore from './store';

import {
  sagaMiddleware,
  authSaga,
  productSaga,
  categorySaga
} from './store/sagas';

export const store = configureStore(); // eslint-disable-line

sagaMiddleware.run(authSaga);
sagaMiddleware.run(productSaga);
sagaMiddleware.run(categorySaga);

ReactDOM.render(
  React.createElement(() => (
    <Provider store={store}>
      <App />
    </Provider>
  )),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
