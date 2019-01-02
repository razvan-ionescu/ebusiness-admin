import React from 'react';

const textarea = props => {
  const size = props.size ? `is-${props.size}` : '';
  const label = props.label ? (
    <label className={`label ${size}`}>{props.label}</label>
  ) : (
    ''
  );
  const error = props.error ? 'is-danger' : '';
  return (
    <div className="field">
      <div className="control">
        <textarea
          rows="5"
          className={`textarea ${size} ${error}`}
          readOnly={props.readOnly}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      {props.error ? <p className="help is-danger">{props.error}</p> : null}
    </div>
  );
};

export default textarea;
