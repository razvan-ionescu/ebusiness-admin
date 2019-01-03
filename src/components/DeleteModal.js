import React from 'react';

import Modal from './Modal';

const deleteModal = props => (
  <Modal
    visible={props.visible}
    title={`Delete ${props.name}`}
    successText="OK"
    cancelText="Cancel"
    actionSuccess={props.actionOk}
    actionCancel={props.actionCancel}
  >
    <Modal.Content>
      <p>Are you sure you want to delete this {props.name}?</p>
    </Modal.Content>
  </Modal>
);

export default deleteModal;
