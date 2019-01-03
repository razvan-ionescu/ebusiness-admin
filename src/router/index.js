import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';

import history from '../lib/history';

import PrivateRoute from '../containers/PrivateRoute';

import Login from '../views/Login';
import OrdersView from '../views/OrdersView';
import ProductsView from '../views/ProductsView';
import CategoriesView from '../views/CategoriesView';

const router = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={OrdersView} />
      <PrivateRoute path="/products" component={ProductsView} />
      <PrivateRoute path="/categories" component={CategoriesView} />
    </Switch>
  </Router>
);

export default router;
