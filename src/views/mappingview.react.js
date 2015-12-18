import React, { Component, PropTypes } from 'react';

class MappingView extends Component {
  constructor(props) {
      super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          Mapping
        </div>
      </div>
    );
  }
}

MappingView.propTypes = {

};

export default MappingView;
