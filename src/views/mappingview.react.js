import React, { Component, PropTypes } from 'react';
import {Button, ButtonToolbar, Glyphicon, Input} from 'react-bootstrap';
import ListBox from './listBox.react';
import MapSelection from './mapSelection.react';
import MappingTable from './mappingtable.react';
import _ from 'underscore';

class MappingView extends Component {
  constructor(props) {
      super(props);
      //this.props.onAutoMapping();
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  onMappingNameChange = (e) => {
    this.props.onChnageMappingName(e.currentTarget.value);
  }
  onMap = () => {
    $('.default-value').removeClass('active');
    this.props.onMappData();
  }
  onMapAttribute = () => {
    this.props.onMapAttribute();
  }
  onColumnChange = (column) => {
    if (this.props.onColumnChange) {
      this.props.onColumnChange(column);
    }
  }
  onTableSelect = (table) => {
    if (this.props.onTableSelect) {
      this.props.onTableSelect(table);
    }
  }
  onPropertyChange = (property) => {
    if (this.props.onPropertyChange) {
      this.props.onPropertyChange(property);
    }
  }
  onMapSelect = (value) => {
    if (this.props.onTableChange) {
      this.props.onTableChange(value);
    }
  }
  onAdd = () => {
    this.props.onMappingAdd();
  }
  onRemove = () => {
    this.props.onMappingRemove();
  }
  onsaveTranformation = (row, transformation) => {
    if (this.props.onsaveTranformation) {
      this.props.onsaveTranformation(row, transformation);
    }
  }
  isMapValid = () => {
    const map = this.props.data.map;
    if (map.currentColumn.length > 0 && map.tableObject.length > 0  && map.currentProperty.length > 0) {
      return false;
    }
    return true;
  }
  isAutoAttributeMapValid = () => {
    const map = this.props.data.map;
    if (map.currentColumn.length > 0) {
      return false;
    }
    return true;
  }
  onDefaultValueChange = (e) => {
    if(e.currentTarget.value.length>0)
      $('.default-value').addClass('active');
    else
      $('.default-value').removeClass('active');
    if (this.props.onDefaultValueChange) {
      this.props.onDefaultValueChange(e.currentTarget.value);
    }
  }
  onMapdataRemove = (rowid) => {
    if (this.props.onMapDataRemove) {
      this.props.onMapDataRemove(rowid);
    }
  }
  onSave = () => {
    if(this.props.onSaveMappingData) {
      this.props.onSaveMappingData(this.props.data);
    }
  }
  renderColumnHiglight = () => {
    let object = {};
    _.each(this.props.data.map.mappedColumn, function(val, index){
      object[val] = {color: '#3c763d'};
    });
    return object;
  }
  renderPropertyHighlight = () => {
    let object = {};
    const mappedProperty = this.props.data.map.mappedProperty;
    const selectedTable = this.props.data.map.selectedTable
    _.each(this.props.data.map.requiredProperty, function(val, index){
      if (!mappedProperty[val]) {
        object[val] = {color: '#31708f'};
      }
    });
    _.each(this.props.data.map.mappedProperty, function(val, index){
      for(let i in val){
        if(selectedTable == i){
          object[val[i]] = {color: '#3c763d'};
        }
      }
    });
    return object;
      }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="upload-container">
            <legend>Mapping</legend>
          </div>
          <form className="form-horizontal" role="form" name="mapForm">
            <div className="form-group">
              <label htmlFor="x" className="col-sm-2 control-label">Mapping Name</label>
              <div className="col-sm-3">
                <input name="mapname" className="form-control"
                value={this.props.data.map.mappingName}
                onChange={this.onMappingNameChange}
                placeholder="Choose Mapping Name" type="text"
                required disabled={this.props.data.viewOnly} />
              </div>
            </div>
          </form>
          <div className="bs-callout bs-callout-info">
            <p><span className="text-info"><b>Required properties</b> are displayed in blue.</span><br/><span className="text-success"><b>Mapped properties</b> are marked with green color.</span></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
             <h4>Columns from input file <a className="btn btn-default"><span className="glyphicon glyphicon-question-sign"></span></a></h4>
          </div>
          <div className="col-md-4 col-md-offset-2">
            <h4>Tables <a className="btn btn-default"><span className="glyphicon glyphicon-question-sign"></span></a></h4>
          </div>
          <div className="col-md-3">
             <h4>Properties <a className="btn btn-default"><span className="glyphicon glyphicon-question-sign"></span></a></h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <ListBox highlightItems={this.renderColumnHiglight()} value={this.props.data.map.currentColumn} data={this.props.data.map.columns} onItemSelect={this.onColumnChange}/>
          </div>
          
          <div className="col-md-2">
            <ButtonToolbar>
              <Button disabled={this.isMapValid()} bsStyle="default" onClick={this.onMap}>
                Map <Glyphicon glyph="chevron-right"/> 
              </Button>
              <br /><br />
              <Button disabled={this.isAutoAttributeMapValid()} bsStyle="default" onClick={this.onMapAttribute}>
                Auto Add Attribute <Glyphicon glyph="chevron-right"/> 
              </Button>
            </ButtonToolbar>
          </div>
          <div className="col-md-4">
            <ListBox selectionlevel={[0, 2]} value={this.props.data.map.tableObject} data={this.props.data.map.tables} onItemSelect={this.onTableSelect}/>
          </div>
          <div className="col-md-3">
            <ListBox highlightItems={this.renderPropertyHighlight()} value={this.props.data.map.currentProperty} data={this.props.data.map.properties} onItemSelect={this.onPropertyChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="btn-group ">
              <button type="button" className="btn btn-default default-value"  data-toggle="button"><span>Default value</span><span></span></button>
              <a className="btn btn-default edit-icon"  onClick={this.clickForEdit}><span className="glyphicon glyphicon-pencil"></span></a>
              <a className="btn btn-default hide ok-icon"><span className="glyphicon glyphicon-ok"></span></a>
              <a className="btn btn-default"><span className="glyphicon glyphicon-question-sign"></span></a>
            </div>
            <form role="form">
              <div className="form-group">
                <input type="text" className="form-control" value={this.props.data.map.defaultValue} onChange={this.onDefaultValueChange}></input>
              </div>
            </form>
          </div>
          <div className="col-md-2">
          </div>
          <div className="col-md-4">
            <MapSelection remove={this.props.data.map.remove} tableobject={this.props.data.map.tableObject} onAdd={this.onAdd} onRemove={this.onRemove} onSelect={this.onMapSelect} value={this.props.data.map.currentTable} data={this.props.data.map.childTables} />
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="row">
          <MappingTable onsaveTranformation={this.onsaveTranformation} onRemove={this.onMapdataRemove} data={this.props.data.map.mappingData} />
        </div>
      </div>
    );
  }
}

MappingView.propTypes = {
  data: React.PropTypes.object,
  onColumnChange: React.PropTypes.func,
  onTableSelect: React.PropTypes.func,
  onPropertyChange: React.PropTypes.func,
  onTableChange: React.PropTypes.func,
  onMappingAdd: React.PropTypes.func,
  onMappingRemove: React.PropTypes.func,
  onMappData: React.PropTypes.func,
  onMapDataRemove: React.PropTypes.func,
  onMapAttribute: React.PropTypes.func,
  onDefaultValueChange: React.PropTypes.func,
  onSaveMappingData: React.PropTypes.func,
  onChnageMappingName: React.PropTypes.func,
  onsaveTranformation: React.PropTypes.func
};

export default MappingView;
