import React, { Component } from 'react';

import { connect } from 'react-redux';
import { categoryActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Table from '../components/Table';
import Button from '../components/Button';

import AppHOC from '../hoc/AppHOC';

// import CategoryForm from '../containers/CategoryForm';

class CategoriesView extends Component {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    this.props.getCategories();
  }

  openModal = async currentCategory => {
    if (currentCategory.id) await this.props.getProduct(currentCategory.id);
    this.setState({
      modalVisible: true
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    let tableBody = this.props.categories.length ? (
      <p>ceva</p>
    ) : (
      <Table.Row>
        <Table.Cell colSpan={7}>
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
            text="Add Category"
            type="primary"
            loading={this.props.modalLoading}
            onClick={() => this.openModal(this.props.currentCategory)}
          />
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableBody}</Table.Body>
        </Table>
      </div>
    );
  }
}

// {
//   this.state.modalVisible ? (
//     <ProductForm
//       visible={this.state.modalVisible}
//       actionCancel={this.closeModal}
//     />
//   ) : null
// }

const mapStateToProps = state => ({
  currentCategory: state.category.currentCategory,
  categories: state.category.categories,
  loading: createLoadingSelector(['GET_CATEGORIES'])(state),
  modalLoading: createLoadingSelector(['GET_CATEGORY'])(state)
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(categoryActions.getCategories()),
  getCategory: id => dispatch(categoryActions.getCategory(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHOC(CategoriesView));
