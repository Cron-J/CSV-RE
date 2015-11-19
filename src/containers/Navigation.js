import React       from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Header from '../views/Header.react';
import { bindActionCreators } from 'redux';
import * as homeActions from 'actions/homePage/HomeActions'
import * as PreviewActions from 'actions/previewPage/PreviewActions';
export default class Navigation extends React.Component {
  constructor (props) {
    super(props);
    var { homesection,dispatch } = this.props
    this.actions = bindActionCreators(PreviewActions,dispatch);
    this.path="";

  }
  render () {
      this.path=this.props.routedto.props.route.path;
    return (

      <div>
        <Header />
        <div brand={<Link to="/"></Link>}>
        <div className="container">
        
          <div className="btn-group btn-group-justified btn-group-wizard">
              <Link to="/" className={this.path==='/' ? "btn btn-wizard active" : 'btn btn-wizard'}  >
                <span  className="badge">1</span>Upload
              </Link>
              <Link to="/preview" className={this.path==='/preview' ? "btn btn-wizard active" : 'btn btn-wizard'}>
                <span className="badge">2</span>Preview         
              </Link>
              <Link to="/mapping" className={this.path==='/mapping' ? "btn btn-wizard active" : 'btn btn-wizard'}>
                <span className="badge">3</span>Map
              </Link>
              <Link to="/import" className={this.path==='/import' ? "btn btn-wizard active" : 'btn btn-wizard'}>
                <span className="badge">4</span>Import
              </Link>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
        state
    };
}

Navigation.propTypes = {
    mappingsection: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
    attributesectionsearch: React.PropTypes.object
};

export default connect(mapStateToProps)(Navigation);
