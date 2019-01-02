import React from 'react';

import Header from './components/Header';
import HeaderCell from './components/HeaderCell';
import Cell from './components/Cell';
import Body from './components/Body';
import Row from './components/Row';
import Footer from './components/Footer';
import Actions from './components/Actions';

const Table = props => (
  <table className="table is-fullwidth">{props.children}</table>
);

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;
Table.Cell = Cell;
Table.HeaderCell = HeaderCell;
Table.Actions = Actions;
export default Table;
