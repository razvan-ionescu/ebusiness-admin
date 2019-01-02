import React from 'react';

import Header from './components/Header';
import Image from './components/Image';
import Content from './components/Content';
import Footer from './components/Footer';

const Card = props => <div className="card">{props.children}</div>;

Card.Header = Header;
Card.Image = Image;
Card.Content = Content;
Card.Footer = Footer;
export default Card;
