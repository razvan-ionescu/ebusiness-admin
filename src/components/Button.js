import React from 'react';

const button = props => {
  const size = props.size ? `is-${props.size}` : '';
  const type = props.type ? `is-${props.type}` : '';
  const outline = props.outline ? 'is-outlined' : '';
  const inverted = props.inverted ? 'is-inverted' : '';
  const rounded = props.rounded ? 'is-rounded' : '';
  const loading = props.loading ? 'is-loading' : '';
  const readOnly = props.readOnly ? 'is-static' : '';
  const expanded = props.expanded ? 'is-expanded' : '';
  return (
    <button
      disabled={props.disabled}
      type="button"
      className={`button
        ${type}
        ${size}
        ${outline}
        ${inverted}
        ${rounded}
        ${loading}
        ${readOnly}
        ${expanded}
      `}
      onClick={props.onClick}
    >
      {props.iconLeft}
      {props.text}
      {props.iconRight}
    </button>
  );
};

export default button;
