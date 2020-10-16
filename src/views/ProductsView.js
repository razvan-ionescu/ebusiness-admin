import React, { Component } from 'react';

import { connect } from 'react-redux';
import { productActions, categoryActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Table from '../components/Table';
import Button from '../components/Button';

import AppHOC from '../hoc/AppHOC';

import ProductForm from '../containers/ProductForm';
import DeleteModal from '../components/DeleteModal';

class ProductsView extends Component {
  state = {
    modalVisible: false,
    currentProduct: {
      name: '',
      categoryId: '',
      author: '',
      stock: 0,
      price: 0.0,
      description: '',
      image: null
    },
    deleteModalVisible: false
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getProducts();
  }

  closeDeleteModal = () => {
    this.setState({
      deleteModalVisible: false,
      currentProduct: {
        name: '',
        categoryId: '',
        author: '',
        stock: 0,
        price: 0.0,
        description: '',
        image: null
      }
    });
  };

  deleteProduct = () => {
    this.props.deleteProduct(this.state.currentProduct.id);
    this.closeDeleteModal();
  };

  openDeleteModal = currentProduct => {
    this.setState({
      deleteModalVisible: true,
      currentProduct
    });
  };

  openModal = (
    currentProduct = {
      name: '',
      categoryId: '',
      author: '',
      stock: 0,
      price: 0.0,
      description: '',
      image: null
    }
  ) => {
    this.setState({
      modalVisible: true,
      currentProduct
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      currentProduct: {
        name: '',
        categoryId: '',
        author: '',
        stock: 0,
        price: 0.0,
        description: '',
        image: null
      }
    });
  };

  render() {
    let tableBody = this.props.products.length ? (
      this.props.products.map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>
            <figure className="image is-128x128">
              <img
                src={`${process.env.REACT_APP_API_URL}/${item.image}`}
                alt={item.name}
              />
            </figure>
          </Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.description}</Table.Cell>
          <Table.HeaderCell>{item.author}</Table.HeaderCell>
          <Table.HeaderCell>
            {this.props.categoryById(item.categoryId).name}
          </Table.HeaderCell>
          <Table.HeaderCell>{item.stock}</Table.HeaderCell>
          <Table.HeaderCell>{item.price}</Table.HeaderCell>
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
            text="Adauga produs nou"
            type="primary"
            loading={this.props.modalLoading}
            onClick={() => this.openModal(this.state.currentProduct)}
          />
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Imagine</Table.HeaderCell>
              <Table.HeaderCell>Denumire</Table.HeaderCell>
              <Table.HeaderCell>Descriere</Table.HeaderCell>
              <Table.HeaderCell>Producator</Table.HeaderCell>
              <Table.HeaderCell>Categorie</Table.HeaderCell>
              <Table.HeaderCell>Stoc (buc)</Table.HeaderCell>
              <Table.HeaderCell>Pret (lei)</Table.HeaderCell>
              <Table.HeaderCell>Optiuni</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableBody}</Table.Body>
        </Table>
        {this.state.modalVisible ? (
          <ProductForm
            visible={this.state.modalVisible}
            actionCancel={this.closeModal}
            currentProduct={this.state.currentProduct}
          />
        ) : null}
        {this.state.deleteModalVisible ? (
          <DeleteModal
            visible={this.state.deleteModalVisible}
            name="product"
            actionOk={() => this.deleteProduct()}
            actionCancel={this.closeDeleteModal}
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
  modalLoading: createLoadingSelector(['GET_PRODUCT'])(state),
  categoryById: id => state.category.categories.find(item => item.id === id)
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(categoryActions.getCategories()),
  getProducts: () => dispatch(productActions.getProducts()),
  getProduct: id => dispatch(productActions.getProduct(id)),
  deleteProduct: id => dispatch(productActions.deleteProduct(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHOC(ProductsView));
