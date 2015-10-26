import React       from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Header from '../views/Header.react';

export default class Navigation extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (

      <div>
        <Header />
        <div brand={<Link to="/"></Link>}>
        <div className="container">
          <div className="btn-group btn-group-justified btn-group-wizard">
              <Link to="/" className="btn btn-wizard">
                <span className="badge">1</span>Upload
              </Link>
              <Link to="/preview" className="btn btn-wizard">
                <span className="badge">2</span>Preview
              </Link>
              <Link to="/mapping" className="btn btn-wizard">
                <span className="badge">3</span>Map
              </Link>
              <Link to="/" className="btn btn-wizard">
                <span className="badge">4</span>Import
              </Link>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
