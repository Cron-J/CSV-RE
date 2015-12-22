import React from 'react';
import Fileuploader from './fileuploader.react';

class UploadView extends React.Component {
  constructor(props) {
      super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  onupload = (file) => {
    if (this.props.onDataSubmit) {
      this.props.onDataSubmit(file);
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Fileuploader fileinfo={this.props.data.fileinfo} onFileupload={this.onupload} fileFormat={this.props.data.fileFormats} />
        </div>
      </div>
    );
  }
}

UploadView.propTypes = {
  data: React.PropTypes.func,
  onDataSubmit: React.PropTypes.func
};

export default UploadView;
