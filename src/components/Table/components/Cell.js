import React from 'react';

const cell = props => (
  <td className={props.className} colSpan={props.colSpan}>
    {props.children}
  </td>
);

export default cell;
