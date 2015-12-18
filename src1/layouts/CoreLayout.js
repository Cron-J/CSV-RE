import React from 'react';
import 'styles/core.scss';
import Navigation from 'containers/Navigation';
import Message from '../common/messageComponent/view/Message.react';

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
          <Message />
        <div>
          <Navigation routedto={this.props.children}/>
        </div>
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
