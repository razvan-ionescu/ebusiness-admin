import React, { Component } from 'react';

import * as yup from 'yup';
import { withFormik } from 'formik';

import { connect } from 'react-redux';
import { productActions, categoryActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';

const enhancer = withFormik({
  mapPropsToValues: props => ({
    name: props.currentProduct.name || '',
    author: props.currentProduct.author || '',
    stock: props.currentProduct.stock || '',
    categoryId: props.currentProduct.categoryId || '',
    description: props.currentProduct.description || '',
    price: props.currentProduct.price || ''
  }),
  validationSchema: yup.object({
    name: yup.string().required(),
    author: yup.string().required(),
    stock: yup.number().required(),
    categoryId: yup.string().required(),
    price: yup.number().required()
  }),
  handleSubmit: (values, { props, resetForm }) => {
    resetForm();
  }
});

class ProductForm extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  actionCancel = () => {
    this.props.resetForm();
    this.props.actionCancel();
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title={this.props.id ? 'Edit product' : 'Add product'}
        successText="Save product"
        cancelText="Cancel"
        actionSuccess={this.props.handleSubmit}
        actionCancel={this.actionCancel}
      >
        <Modal.Content>
          <Input
            error={this.props.errors.name}
            value={this.props.values.name}
            onChange={this.props.handleChange('name')}
            placeholder="Product name"
            label="Name"
            type="text"
          />
          <Input
            error={this.props.errors.author}
            value={this.props.values.author}
            onChange={this.props.handleChange('author')}
            placeholder="Product author"
            label="Author"
            type="text"
          />
          <Input
            error={this.props.errors.stock}
            value={this.props.values.stock}
            onChange={this.props.handleChange('stock')}
            placeholder="Product stock"
            label="Stock"
            type="number"
          />
          <Input
            error={this.props.errors.price}
            value={this.props.values.price}
            onChange={this.props.handleChange('price')}
            placeholder="Product price"
            label="Price"
            type="text"
          />
          <Select
            loading={this.props.categoryLoading}
            value={this.props.values.categoryId}
            options={this.props.categories.map(item => ({
              label: item.name,
              value: item.id
            }))}
            onChange={e =>
              this.props.setFieldValue('categoryId', e.target.value)
            }
          />
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  currentProduct: state.product.currentProduct,
  categoryLoading: createLoadingSelector(['GET_CATEGORIES'])(state),
  productLoading: createLoadingSelector([
    'UPDATE_PRODUCT',
    'ADD_PRODUCT',
    'DELETE_PRODUCT'
  ])(state)
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(categoryActions.getCategories()),
  updateProduct: (id, productObj) =>
    dispatch(productActions.updateProduct(id, productObj)),
  deleteProduct: id => dispatch(productActions.deleteProduct(id)),
  postProduct: productObj => dispatch(productActions.addProduct(productObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhancer(ProductForm));
