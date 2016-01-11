import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import Header from '../views/Header.react';

export default class Navigation extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (
      <Header />
    );
  }
}
