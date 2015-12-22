import React from 'react';
import Dropzone from 'react-dropzone';

class Fileuploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: ''};
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  onDrop = (files, e) => {
    if (files.length > 0) {
      let extension = '';
      extension= files[0].name.split('.').pop();
      extension=extension.toLowerCase();
      if (this.props.fileFormat.indexOf('.' + extension) < 0) {
        this.setState({error: 'Invalid File Format'});
      } else {
        this.setState({error: ''});
        this.props.onFileupload(files[0]);
      }
    }
  }
  renderInfo = () => {
    if (this.props.fileinfo.name && this.props.fileinfo.name.length > 0) {
      return <div><b>File Selected:</b>{this.props.fileinfo.name}<b className="marginleft5">Size</b>:{this.props.fileinfo.size}<b className="marginleft5">Type</b>:{this.props.fileinfo.type}</div>;

    }
      return '';
  }
  render() {
    const fileFormats = this.props.fileFormat.join(', ');
    return (
      <div className="container">
        <div className="row">
          <form>
            <Dropzone className="dropzoneContainer" multiple={false} onDrop={this.onDrop.bind(this)} >
                <div className="dropzoneMessage">
                  Click here / Drop the <b>{fileFormats}</b> file
                </div>
            </Dropzone>
          </form>
          <div className="errorMessage">
            {this.state.error || this.props.error}
          </div>
          
          <div className="displayMessage">
            {this.renderInfo()}
          </div>
        </div>
      </div>
    );
  }
}

Fileuploader.propTypes = {
  fileFormat: React.PropTypes.arrayOf(React.PropTypes.string),
  fileinfo: React.PropTypes.object,
  error: React.PropTypes.string,
  onFileupload: React.PropTypes.func
};

export default Fileuploader;
