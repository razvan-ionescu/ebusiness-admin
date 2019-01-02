import React from 'react';

import Content from './Content';

import Button from '../Button';

const Modal = props =>
  props.visible ? (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.actionCancel} />
      <div className="modal-card">
        <div className="modal-card-head">
          <h5 className="modal-card-title">{props.title}</h5>
          <button
            className="delete"
            aria-label="close"
            onClick={props.actionCancel}
          />
        </div>
        {props.children}
        <div className="modal-card-foot">
          <Button
            loading={props.modalLoading}
            disabled={props.modalDisabled}
            type="success"
            text={props.successText}
            onClick={props.actionSuccess}
          />
          <Button
            type="danger"
            text={props.cancelText}
            onClick={props.actionCancel}
          />
        </div>
      </div>
    </div>
  ) : null;

Modal.Content = Content;
export default Modal;
