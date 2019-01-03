import React from 'react';

import Textarea from './Textarea';
import FileInput from './File';

const input = props => {
  const addons = props.leftAddon || props.rightAddon ? 'has-addons' : '';
  const addonsAlignment = props.addonAlignment
    ? `has-addons-${props.addonsAlignment}`
    : '';
  const size = props.size ? `is-${props.size}` : '';
  const label = props.label ? (
    <label className={`label ${size}`}>{props.label}</label>
  ) : (
    ''
  );
  const iconLeft = props.iconLeft ? 'has-icons-left' : '';
  const iconRight = props.iconRight ? 'has-icons-right' : '';
  const error = props.error ? 'is-danger' : '';
  return (
    <div className={`field ${addons} ${addonsAlignment}`}>
      {label}
      {props.leftAddon ? (
        <div className={`control ${iconLeft} ${iconRight}`}>
          {props.leftAddon}
        </div>
      ) : null}
      <div className={`control ${iconLeft} ${iconRight}`}>
        <input
          className={`input ${size} ${error}`}
          readOnly={props.readOnly}
          disabled={props.disabled}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {iconLeft}
        {iconRight}
      </div>
      {props.error ? <p className="help is-danger">{props.error}</p> : null}
      {props.rightAddon ? (
        <div className={`control ${iconLeft} ${iconRight}`}>
          {props.rightAddon}
        </div>
      ) : null}
    </div>
  );
};

input.Textarea = Textarea;
input.File = FileInput;
export default input;
