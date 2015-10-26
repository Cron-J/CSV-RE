import React from 'react';
import 'styles/core.scss';
import Navigation from 'containers/Navigation';

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor () {
    super();
  }

  render () {
    return (
      <div className='page-container'>
        <div>
          <Navigation />
        </div>
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
