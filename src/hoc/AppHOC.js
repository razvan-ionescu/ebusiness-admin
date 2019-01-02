import React, { Component } from 'react';

import Header from '../containers/Header';

const appHOC = WrappedComponent =>
  class extends Component {
    render() {
      return (
        <div className="has-background-light">
          <Header />
          <div className="container">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  };

export default appHOC;
