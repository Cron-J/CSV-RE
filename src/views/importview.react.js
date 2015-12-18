import React, { Component, PropTypes } from 'react';

class ImportView extends Component {
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
          Import
        </div>
      </div>
    );
  }
}

ImportView.propTypes = {

};

export default ImportView;
