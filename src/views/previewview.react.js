import React, { Component, PropTypes } from 'react';
import {Modal, Input, Button} from 'react-bootstrap';
import CustomTable from './customTable.react';

class PreviewView extends Component {
  constructor(props) {
      super(props);
      this.show=true;
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  changeHeader = (e) => {
    if (this.props.onChangeHeader) {
      this.props.onChangeHeader(e.target.checked);
    }
  }
  changeDateFormat = (e) => {
    if (this.props.onChangeDate) {
      this.props.onChangeDate(e.target.value);
    }
  }
  changeNumberFormat =(e) => {
    if (this.props.onChangeNumber) {
      this.props.onChangeNumber(e.target.value);
    }
  }
  changeDelimiterFormat = (e) => {
    if (this.props.onChangeDelimiter) {
      this.props.onChangeDelimiter(e.target.value);
    }
  }
  resetPreviewSetting = (e) => {
    this.props.previewSetting();
  }
  _renderDateOptions = () => {
    const options = [];
    for (let i = 0; i < this.props.data.setters.dateformat.length; i++) {
      if (this.props.data.setters.dateformat[i].value === this.props.data.dateFormat) {
        options.push(<option value={this.props.data.setters.dateformat[i].value} selected>{this.props.data.setters.dateformat[i].label}</option>);
      } else {
        options.push(<option value={this.props.data.setters.dateformat[i].value}>{this.props.data.setters.dateformat[i].label}</option>);
      }
    }
    return options;
  }
  _renderNumberFormatOptions = () => {
    const options = [];
    for (let i = 0; i < this.props.data.setters.numberformat.length; i++) {
      if (this.props.data.setters.numberformat[i].value === this.props.data.numberFormat) {
        options.push(<option value={this.props.data.setters.numberformat[i].value} selected>{this.props.data.setters.numberformat[i].label}</option>);
      } else {
        options.push(<option value={this.props.data.setters.numberformat[i].value}>{this.props.data.setters.numberformat[i].label}</option>);
      }
    }
    return options;
  }
  _renderDelimiterOptions = () => {
    const options = [];
    for (let i = 0; i < this.props.data.setters.delimiterformat.length; i++) {
      if (this.props.data.setters.delimiterformat[i].value === this.props.data.delimiter) {
        options.push(<option value={this.props.data.setters.delimiterformat[i].value} selected>{this.props.data.setters.delimiterformat[i].label}</option>);
      } else {
        options.push(<option value={this.props.data.setters.delimiterformat[i].value}>{this.props.data.setters.delimiterformat[i].label}</option>);
      }
    }
    return options;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="Preview-Container">
            <legend>File Preview</legend>
            <div className="col-lg-6">
              <div className="row">
                <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-4 control-label">First line include header</label>
                    <div className="col-sm-8">
                      <Input type="checkbox" checked={this.props.data.noHeader}  onChange={this.changeHeader}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Date Format </label>
                    <div className="col-sm-8">
                      <select name="datePattern" className="form-control" onChange={this.changeDateFormat} required>
                        {this._renderDateOptions()}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Number Format</label>
                    <div className="col-sm-8">
                      <select name="numberPattern" className="form-control" onChange={this.changeNumberFormat}  required>
                        {this._renderNumberFormatOptions()}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Delimiter Format</label>
                    <div className="col-sm-8">
                      <select name="decimalSeparator" className="form-control" onChange={this.changeDelimiterFormat} required>
                        {this._renderDelimiterOptions()}
                      </select>
                    </div>
                  </div>
                  <div className="row btn-margin btn-Allignment">
                  <button className="btn btn-primary" onClick={this.resetPreviewSetting.bind(this)}>Reset Preview Settings</button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <CustomTable headers={this.props.data.resultdata.headers} data={this.props.data.resultdata.data} />
        </div>
      </div>
    );
  }
}

PreviewView.propTypes = {
    data: React.PropTypes.object,
    onChangeHeader: React.PropTypes.func,
    onChangeDelimiter: React.PropTypes.func,
    onChangeDate: React.PropTypes.func,
    onChangeNumber: React.PropTypes.func,
    previewSetting: React.PropTypes.func
};


export default PreviewView;
