import React, { Component } from 'react';

import * as yup from 'yup';
import { withFormik } from 'formik';

import { connect } from 'react-redux';
import { authActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const enhancer = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  }),
  handleSubmit: (values, { props, resetForm }) => {
    props.login({
      email: values.email,
      password: values.password
    });
    resetForm();
  }
});

class Login extends Component {
  render() {
    return (
      <div
        className="container is-flex"
        style={{ height: '100vh', justifyContent: 'center' }}
      >
        <div
          className="columns is-centered"
          style={{ alignItems: 'center', width: '100%' }}
        >
          <div className="column is-one-third">
            <Card>
              <Card.Header>
                <h5 className="card-header-title">Login</h5>
              </Card.Header>
              <Card.Content>
                <Input
                  error={this.props.errors.email}
                  value={this.props.values.email}
                  onChange={this.props.handleChange('email')}
                  placeholder="E-mail"
                  label="E-mail"
                  type="email"
                />
                <Input
                  error={this.props.errors.password}
                  value={this.props.values.password}
                  onChange={this.props.handleChange('password')}
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Card.Content>
              <Card.Footer>
                <Card.Footer.Item>
                  <Button
                    loading={this.props.isLoading}
                    text="Login"
                    type="primary"
                    disabled={this.props.isSubmitting}
                    onClick={this.props.handleSubmit}
                  />
                </Card.Footer.Item>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: createLoadingSelector(['LOGIN'])(state)
});

const mapDispatchToProps = dispatch => ({
  login: loginObj => dispatch(authActions.login(loginObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhancer(Login));
