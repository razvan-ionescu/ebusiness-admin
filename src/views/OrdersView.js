import React, { Component } from 'react';

import { connect } from 'react-redux';
import { orderActions } from '../store/actions';

import Table from '../components/Table';

import AppHOC from '../hoc/AppHOC';

class OrdersView extends Component {
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    return (
      <div className="section">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Status Comanda</Table.HeaderCell>
              <Table.HeaderCell>Adresa Facturare</Table.HeaderCell>
              <Table.HeaderCell>Adresa Livrare</Table.HeaderCell>
              <Table.HeaderCell>Client</Table.HeaderCell>
              <Table.HeaderCell>Nr. produse</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
                <Table.Cell>Numar comenzi: {this.props.orders.length}</Table.Cell>
              </Table.Row>,
            {this.props.orders.length ? (
              this.props.orders.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.status}</Table.Cell>
                  <Table.Cell>{`${item.receipt.street}, ${item.receipt.city}, ${
                    item.receipt.county
                  }`}</Table.Cell>
                  <Table.Cell>{`${item.delivery.street}, ${
                    item.delivery.city
                  }, ${item.delivery.county}`}</Table.Cell>
                  <Table.Cell>{`${item.client.name} ${
                    item.client.surname
                  }`}</Table.Cell>
                  <Table.Cell>{item.products.length}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell>Numar comenzi: {this.props.orders.length}</Table.Cell>
              </Table.Row>
            )
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders
});

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(orderActions.getOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHOC(OrdersView));
