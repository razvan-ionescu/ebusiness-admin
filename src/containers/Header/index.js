import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { authActions } from '../../store/actions';

import Button from '../../components/Button';

import './Header.css';

class Header extends Component {
  state = {
    navbarOpen: false
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      navbarOpen: !prevState.navbarOpen
    }));
  };

  render() {
    const navbarOpen = this.state.navbarOpen ? 'is-active' : '';
    return (
      <nav className="navbar is-link">
        <div className="navbar-brand">
          <span className="navbar-item title is-marginless is-paddingless">
            Admin
          </span>
          <div
            role="button"
            className={`navbar-burger ${navbarOpen}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleNavbar}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>
        <div className={`navbar-menu ${navbarOpen}`}>
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/">
              Orders
            </NavLink>
            <NavLink className="navbar-item" to="/products">
              Products
            </NavLink>
            <NavLink className="navbar-item" to="/categories">
              Categories
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Button
                  text="Log out"
                  type="light"
                  onClick={() => this.props.logout()}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
