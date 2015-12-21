import React, { Component, PropTypes } from 'react';
import {Input} from 'react-bootstrap';
import CustomTable from './customTable.react';

class PreviewView extends Component {
  constructor(props) {
      super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  changeHeader = (e) => {
    if (this.props.changeHeader) {
      this.props.changeHeader(e.target.checked);
    }
  }
  changeDateFormat = () => {

  }
  changeDelimiterFormat = (e) => {
    if (this.props.changeDelimiter) {
      this.props.changeDelimiter(e.target.value);
    }
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
    changeHeader: React.PropTypes.func,
    changeDelimiter: React.PropTypes.func
};


export default PreviewView;
