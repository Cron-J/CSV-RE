import React from 'react';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';


class Fileuploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: '', fileInfo: {name: '', size: 0}, isuploaded: false};
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
        this.setState({error: 'Invalid File Format', isuploaded:false, fileInfo: {name: '', size: 0}});
      } else {
        this.setState({error: '', isuploaded: true, fileInfo: {
          name: files[0].name,
          size: files[0].size
        }});
        const fd = new FormData();
        fd.append( 'file', this.refs.uploadForm.refs.fileInput.getDOMNode().files[0]);
        this.props.onFileupload({fileinfo: files[0], form: fd});
      }
    }
  }
  renderInfo = () => {
    if (this.state.isuploaded) {
      return <div><b>Name :</b>{this.state.fileInfo.name}<b className="marginleft5">Size :</b>{this.state.fileInfo.size}</div>;
    }
      return '';
  }
  render() {
    const fileFormats = this.props.fileFormat.join(', ');
    return (
      <div className="container">
        <div className="row">
          <form>
            <Dropzone ref="uploadForm" className="dropzoneContainer" multiple={false} onDrop={this.onDrop.bind(this)} >
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
  error: React.PropTypes.string,
  onFileupload: React.PropTypes.func
};

export default Fileuploader;
