import React, { Component } from 'react';

import { connect } from 'react-redux';
import { authActions } from './store/actions';

import Router from './router';

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }
  render() {
    return <Router />;
  }
}

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(authActions.checkAuth())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
