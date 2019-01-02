import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const icon = props => {
  const type = props.type ? `has-text-${props.type}` : '';
  const containerSize = props.containerSize ? `is-${props.containerSize}` : '';
  const left = props.left ? 'is-left' : '';
  const right = props.right ? 'is-right' : '';
  return (
    <span className={`icon ${type} ${containerSize} ${left} ${right}`}>
      <FontAwesomeIcon icon={props.icon} size={props.size} />
    </span>
  );
};

export default icon;
