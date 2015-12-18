import React, { Component, PropTypes } from 'react';

class PreviewView extends Component {
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
          Preview
        </div>
      </div>
    );
  }
}

PreviewView.propTypes = {

};

export default PreviewView;
