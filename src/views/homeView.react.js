import React from 'react';
import UploadView from './uploadview.react';
import PreviewView from './previewview.react';
import MappingView from './mappingview.react';
import ImportView from './importview.react';
import CSVNavigation from './CSVNavigation.react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CSVActions from '../actions/csvActions';


class Home extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(CSVActions, dispatch);
    // views
    this.upload = 'upload';
    this.preview = 'preview';
    this.mapping = 'mapping';
    this.import = 'import';
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  onNavigate = (view) => {
    this.actions.changeView(view);
  }
  triggeractions = (data) => {
    switch(this.props.csv.currentview) {
      case this.upload:
        this.actions.startFileupload(data);
        break;
      case this.preview:

        break;
      case this.mapping:

        break;
      case this.import:

        break;
      default:

        break;
    }
  }
  triggerNavigationSubmit = () => {
    switch(this.props.csv.currentview) {
      case this.upload:
        this.actions.uploadFile(this.props.csv.upload.fileinfo, this.props.csv.upload.uploaded);
        break;
      case this.preview:

        break;
      case this.mapping:

        break;
      case this.import:

        break;
      default:

        break;
    }
  }
  onDataSubmit = (data) => {
    this.triggeractions(data);
  }
  onpreviewHeaderChange = (check) => {
    this.actions.changeHeader(check);
  }
  onchangeDelimiter = (delimiter) => {
    this.actions.changeDelimiter(delimiter);
  }
  onchangeDate = (dateformat) => {
    this.actions.changeDate(dateformat);
  }
  onchangeNumber = (numberformat) => {
    this.actions.changeNumber(numberformat);
  }
  renderView = () => {
    switch(this.props.csv.currentview) {
    case this.upload:
      return <UploadView data={this.props.csv[this.upload]} onDataSubmit={this.onDataSubmit}/>;
      break;
    case this.preview:
      return <PreviewView data={this.props.csv[this.preview]} onChangeNumber={this.onchangeNumber} onChangeDate={this.onchangeDate} onChangeDelimiter={this.onchangeDelimiter} onChangeHeader={this.onpreviewHeaderChange}/>;
      break;
    case this.mapping:
      return <MappingView data={this.props.csv[this.upload]} onDataSubmit={this.onDataSubmit}/>;
      break;
    case this.import:
      return <ImportView data={this.props.csv[this.upload]} onDataSubmit={this.onDataSubmit}/>;
      break;
    default:
      return '';
      break;
    }
  }
  onPrevNext = (nextorprev) => {
    // next-1 prev-0
    if (nextorprev === 1) {
      this.triggerNavigationSubmit();
    } else {
      this.actions.previousview();
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="btn-group btn-group-justified btn-group-wizard">
              <div onClick={this.onNavigate.bind(this, this.upload)} className={this.props.csv.currentview==='upload' ? "btn btn-wizard active" : 'btn btn-wizard'}  >
                <span  className="badge">1</span>Upload
              </div>
              <div onClick={this.onNavigate.bind(this, this.preview)} className={this.props.csv.currentview==='preview' ? "btn btn-wizard active" : 'btn btn-wizard'}>
                <span className="badge">2</span>Preview
              </div>
              <div onClick={this.onNavigate.bind(this, this.mapping)} className={this.props.csv.currentview==='mapping' ? "btn btn-wizard active" : 'btn btn-wizard'}>
                <span className="badge">3</span>Map
              </div>
              <div onClick={this.onNavigate.bind(this, this.import)} className={this.props.csv.currentview==='import' ? "btn btn-wizard active" : 'btn btn-wizard'}>
                <span className="badge">4</span>Import
              </div>
          </div>
        </div>
        <div className="row">
          <div>
            {this.renderView()}
          </div>
        </div>
        <div className="row">
          <CSVNavigation onPrev={this.onPrevNext.bind(this, 0)} onNext={this.onPrevNext.bind(this, 1)} block={this.props.csv.block} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { csv } = state;
    return {
        csv
    };
}

Home.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    csv: React.PropTypes.object
};

export default connect(mapStateToProps)(Home);
