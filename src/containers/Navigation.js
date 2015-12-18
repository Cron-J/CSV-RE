import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class Navigation extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (
      <Navbar brand={<Link to="/"><img
      src={'http://www.jcatalog.com/WeceemFiles/de/Image/jclogo.png'} height= "30px" alt="jCatalog"/></Link>}>
        <Nav>
        </Nav>
      </Navbar>
    );
  }
}
