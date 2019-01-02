import React from 'react';

import Button from '../../Button';
import Icon from '../../Icon';

const actions = props => (
  <div className="buttons">
    <Button
      iconLeft={<Icon icon="edit" />}
      type="success"
      onClick={props.editAction}
    />
    <Button
      iconLeft={<Icon icon="times" />}
      type="danger"
      onClick={props.deleteAction}
    />
  </div>
);

export default actions;
