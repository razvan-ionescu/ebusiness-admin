import React from 'react';

import Icon from '../Icon';

const file = props => (
  <div className="file">
    <label className="file-label">
      <input className="file-input" type="file" onChange={props.onChange} />
      <span className="file-cta">
        <span className="file-icon">
          <Icon icon="upload" />
        </span>
        <span className="file-label">Choose a file…</span>
      </span>
    </label>
  </div>
);

export default file;
