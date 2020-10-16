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
    description: props.currentProduct.description || '',
    stock: props.currentProduct.stock || '',
    categoryId: props.currentProduct.categoryId || '',
    price: props.currentProduct.price || '',
    image: props.currentProduct.image || null
  }),
  validationSchema: yup.object({
    name: yup.string().required(),
    author: yup.string().required(),
    stock: yup.number().required(),
    description: yup.string().required(),
    categoryId: yup.string().required(),
    price: yup.number().required()
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    if (props.currentProduct.id) await props.updateProduct({ ...values });
    else await props.postProduct({ ...values });
    resetForm();
    props.actionCancel();
  },
  enableReinitialize: true
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
        title={this.props.id ? 'Editeaza produs' : 'Adauga produs'}
        successText="Salveaza"
        cancelText="Anuleaza"
        actionSuccess={this.props.handleSubmit}
        actionCancel={this.actionCancel}
      >
        <Modal.Content>
          <Input
            error={this.props.errors.name}
            value={this.props.values.name}
            onChange={this.props.handleChange('name')}
            placeholder="Denumire produs"
            label="Nume:"
            type="text"
          />
          <Input
            error={this.props.errors.author}
            value={this.props.values.author}
            onChange={this.props.handleChange('author')}
            placeholder="Furnizor produs"
            label="Furnizor:"
            type="text"
          />
          <label>Specificatii:</label>
          <Input.Textarea
            error={this.props.errors.description}
            value={this.props.values.description}
            onChange={this.props.handleChange('description')}
            placeholder="Descriere produs"
            label="Specificatii:"
          />
          <Input
            error={this.props.errors.stock}
            value={this.props.values.stock}
            onChange={this.props.handleChange('stock')}
            placeholder="Cantitate produs (bucati)"
            label="Stoc:"
            type="number"
          />
          <Input
            error={this.props.errors.price}
            value={this.props.values.price}
            onChange={this.props.handleChange('price')}
            placeholder="Valoare monetara produs in lei"
            label="Pret:"
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
          {!this.props.currentProduct.id ? (
            <Input.File
              onChange={e =>
                this.props.setFieldValue('image', e.target.files[0])
              }
            />
          ) : null}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
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
