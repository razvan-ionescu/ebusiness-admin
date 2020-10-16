import React, { Component } from 'react';

import * as yup from 'yup';
import { withFormik } from 'formik';

import { connect } from 'react-redux';
import { categoryActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Modal from '../components/Modal';
import Input from '../components/Input';

const enhancer = withFormik({
  mapPropsToValues: props => ({
    name: props.currentCategory.name || '',
    description: props.currentCategory.description || ''
  }),
  validationSchema: yup.object({
    name: yup.string().required(),
    description: yup.string().required()
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    if (props.currentCategory.id) await props.updateCategory({ ...values });
    else await props.postCategory({ ...values });
    resetForm();
    props.actionCancel();
  },
  enableReinitialize: true
});

class CategoryForm extends Component {
  actionCancel = () => {
    this.props.resetForm();
    this.props.actionCancel();
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title={this.props.id ? 'Editeaza categoria' : 'Adauga categorie noua'}
        successText="Salveaza"
        cancelText="Anulare"
        actionSuccess={this.props.handleSubmit}
        actionCancel={this.actionCancel}
        loading={this.props.categoryLoading}
        disabled={this.props.isSubmitting}
      >
        <Modal.Content>
          <Input
            error={this.props.errors.name}
            value={this.props.values.name}
            onChange={this.props.handleChange('name')}
            placeholder="Nume categorie"
            label="Denumire:"
            type="text"
          />
          <label>Descriere:</label>
          <Input.Textarea
            error={this.props.errors.description}
            value={this.props.values.description}
            onChange={this.props.handleChange('description')}
            placeholder="Ce fel de produse intra in acesta categorie"
            label="descriere:"
          />
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categoryLoading: createLoadingSelector(['UPDATE_CATEGORY', 'ADD_CATEGORY'])(
    state
  )
});

const mapDispatchToProps = dispatch => ({
  updateCategory: (id, categoryObj) =>
    dispatch(categoryActions.updateCategory(id, categoryObj)),
  postCategory: categoryObj =>
    dispatch(categoryActions.postCategory(categoryObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhancer(CategoryForm));
