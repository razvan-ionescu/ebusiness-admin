import React from 'react';
import Item from './FooterItem';

const cardFooter = props => <div className="card-footer">{props.children}</div>;

cardFooter.Item = Item;
export default cardFooter;
