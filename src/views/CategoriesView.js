import React, { Component } from 'react';

import { connect } from 'react-redux';
import { categoryActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Table from '../components/Table';
import Button from '../components/Button';

import AppHOC from '../hoc/AppHOC';

import CategoryForm from '../containers/CategoryForm';
import DeleteModal from '../components/DeleteModal';

class CategoriesView extends Component {
  state = {
    modalVisible: false,
    deleteModalVisible: false,
    currentCategory: {
      name: '',
      description: ''
    }
  };

  componentDidMount() {
    this.props.getCategories();
  }

  closeDeleteModal = () => {
    this.setState({
      deleteModalVisible: false,
      currentCategory: {
        name: '',
        description: ''
      }
    });
  };

  deleteCategory = () => {
    this.props.deleteCategory(this.state.currentCategory.id);
    this.closeDeleteModal();
  };

  openDeleteModal = currentCategory => {
    this.setState({
      deleteModalVisible: true,
      currentCategory
    });
  };

  openModal = (
    currentCategory = {
      name: '',
      description: ''
    }
  ) => {
    this.setState({
      modalVisible: true,
      currentCategory
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      currentCategory: {
        name: '',
        description: ''
      }
    });
  };

  render() {
    let tableBody = this.props.categories.length ? (
      this.props.categories.map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.description}</Table.Cell>
          <Table.Cell>
            <Table.Actions
              editAction={() => this.openModal(item)}
              deleteAction={() => this.openDeleteModal(item)}
            />
          </Table.Cell>
        </Table.Row>
      ))
    ) : (
      <Table.Row>
        <Table.Cell colSpan={3}>
          <p className="has-text-centered">No categories to display.</p>
        </Table.Cell>
      </Table.Row>
    );

    if (this.props.loading)
      tableBody = (
        <Table.Row>
          <Table.Cell colSpan={2}>
            <div
              style={{ justifyContent: 'center' }}
              className="is-fullwidth is-flex"
            >
              <span className="loader" />
            </div>
          </Table.Cell>
        </Table.Row>
      );

    return (
      <div className="section">
        <div>
          <Button
            text="Adauga categorie noua"
            type="primary"
            onClick={() => this.openModal(this.props.currentCategory)}
          />
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nume</Table.HeaderCell>
              <Table.HeaderCell>Descriere</Table.HeaderCell>
              <Table.HeaderCell>Optiuni</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableBody}</Table.Body>
        </Table>
        {this.state.modalVisible ? (
          <CategoryForm
            visible={this.state.modalVisible}
            actionCancel={this.closeModal}
            currentCategory={this.state.currentCategory}
          />
        ) : null}
        {this.state.deleteModalVisible ? (
          <DeleteModal
            visible={this.state.deleteModalVisible}
            name="category"
            actionOk={() => this.deleteCategory()}
            actionCancel={this.closeDeleteModal}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  loading: createLoadingSelector(['GET_CATEGORIES'])(state)
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(categoryActions.getCategories()),
  getCategory: id => dispatch(categoryActions.getCategory(id)),
  deleteCategory: id => dispatch(categoryActions.deleteCategory(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHOC(CategoriesView));
