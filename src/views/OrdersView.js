import React, { Component } from 'react';

import Table from '../components/Table';

import AppHOC from '../hoc/AppHOC';

class OrdersView extends Component {
  render() {
    // let tableBody = this.props.products.length ? (
    //   <p>ceva</p>
    // ) : (
    //   <Table.Row>
    //     <Table.Cell colSpan={7}>
    //       <p className="has-text-centered">No products to display.</p>
    //     </Table.Cell>
    //   </Table.Row>
    // );

    // if (this.props.loading)
    //   tableBody = (
    //     <Table.Row>
    //       <Table.Cell colSpan={7}>
    //         <div
    //           style={{ justifyContent: 'center' }}
    //           className="is-fullwidth is-flex"
    //         >
    //           <span className="loader" />
    //         </div>
    //       </Table.Cell>
    //     </Table.Row>
    //   );
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Receipt Address</Table.HeaderCell>
            <Table.HeaderCell>Delivery Address</Table.HeaderCell>
            <Table.HeaderCell>Client</Table.HeaderCell>
            <Table.HeaderCell>Number of products</Table.HeaderCell>
            <Table.HeaderCell>Order value</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
  }
}

export default AppHOC(OrdersView);
