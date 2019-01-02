import React, { Component } from 'react';

import { connect } from 'react-redux';
import { productActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Table from '../components/Table';
import Button from '../components/Button';

import AppHOC from '../hoc/AppHOC';

import ProductForm from '../containers/ProductForm';

class ProductsView extends Component {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    this.props.getProducts();
  }

  openModal = async currentProduct => {
    if (currentProduct.id) await this.props.getProduct(currentProduct.id);
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
    let tableBody = this.props.products.length ? (
      <p>ceva</p>
    ) : (
      <Table.Row>
        <Table.Cell colSpan={7}>
          <p className="has-text-centered">No products to display.</p>
        </Table.Cell>
      </Table.Row>
    );

    if (this.props.loading)
      tableBody = (
        <Table.Row>
          <Table.Cell colSpan={8}>
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
            text="Add Product"
            type="primary"
            loading={this.props.modalLoading}
            onClick={() => this.openModal(this.props.currentProduct)}
          />
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableBody}</Table.Body>
        </Table>
        {this.state.modalVisible ? (
          <ProductForm
            visible={this.state.modalVisible}
            actionCancel={this.closeModal}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentProduct: state.product.currentProduct,
  products: state.product.products,
  loading: createLoadingSelector(['GET_PRODUCTS'])(state),
  modalLoading: createLoadingSelector(['GET_PRODUCT'])(state)
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(productActions.getProducts()),
  getProduct: id => dispatch(productActions.getProduct(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHOC(ProductsView));
