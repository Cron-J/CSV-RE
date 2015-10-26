import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as MappingActions from 'actions/mappingPage/MappingActions';
import { connect } from 'react-redux';

class Mapping extends Component {
  constructor(props) {
    super(props);
    const { mappingsection, dispatch } = this.props;
    this.state = mappingsection;
    this.actions = bindActionCreators(MappingActions, dispatch);
    this.headers = [];
    this.headSelect = '';
    this.propertySelect = '';
    this.defaultValue = '';
    this.selectedHeaders = [];
    this.selectedTables = [];
    this.selectedProperties = [];
    this.mappedFields = [];
    this.mappedData = [];

  }
  componentWillMount() {
    this.actions.attributeList();
  }
  
  componentDidMount() {
    this.headers = this.props.attributesectionsearch.headers.split(',');
  }
  
  mapping(e) {
    e.preventDefault();
    let propertyname;
    let mappedField = {};
    for(let index in this.props.mappingsection.attributeList){
      if(this.props.mappingsection.pickedTable === index){
        for(let idx in this.props.mappingsection.attributeList[index]){
          if(this.props.mappingsection.attributeList[index][idx].field === this.propertySelect){
            this.props.mappingsection.attributeList[index][idx]['mapped'] = true;
            mappedField = {
              "userFieldName": this.headSelect,
              "transformations": [],
              "field": this.props.mappingsection.attributeList[index][idx].field,
              "defaultValue": this.defaultValue,
              "index": this.props.mappingsection.attributeList[index][idx].index,
              "instance": this.props.mappingsection.attributeList[index][idx].instance,
              "isRequired": this.props.mappingsection.attributeList[index][idx].isRequired,
              "rowId": this.mappedData.length++
            };
          }
        }
      }
    }
    if(this.props.mappingsection.pickedTable === 'product'){
      propertyname = this.props.mappingsection.pickedTable+'.'+this.propertySelect;
    }else{
      propertyname = 'product.'+this.props.mappingsection.pickedTable+'.'+this.propertySelect;
    }
    if(this.defaultValue.length>0){
      this.headSelect = this.defaultValue;
    }
    console.log('=========', mappedField);
    this.mappedFields.push({column:this.headSelect,propertydec: this.propertySelect, propertyname: propertyname});
    this.mappedData.push(mappedField);
    this.props.mappingsection.mappedData = this.mappedData;
    this.props.mappingsection.mappedFields = this.mappedFields;
    this.actions.handleMappedChnages(this.props.mappingsection);
  }
  
  toAddDefaultName(e) {
    $('.edit-icon').addClass('hide');
    $('.ok-icon').removeClass('hide');
  }

  saveDefaultName(e) {
    $('.ok-icon').addClass('hide');
    $('.edit-icon').removeClass('hide');
  }
  selectedTable(e) {
    e.preventDefault();
    let selectedTab = e.currentTarget.value
    for(let key in this.props.mappingsection.attributeList) {
      if(key === selectedTab){
        this.props.mappingsection.properties = this.props.mappingsection.attributeList[key];
        this.actions.handleChanges(this.props.mappingsection);
      }
    }
  }

  addToList(e){
    for(let table in this.props.mappingsection.tables){
      if(table === this.props.mappingsection.pickedTable){
        this.props.mappingsection.tables[table].push(this.props.mappingsection.pickedTable);
      }
    }
    this.actions.handleChanges(this.props.mappingsection);
  }
  selectedProperty(e) {
    e.preventDefault();
  } 
  
  enteredDefaultVal(e) {
    $('.default-value').addClass('active');
    this.defaultValue = e.currentTarget.value;
  }

  selectnewPropTable(e) {
    e.preventDefault();
    this.props.mappingsection.pickedTable = e.target.text;
    this.setState({'k':''});
  }

  mapAttribute(e) {
    e.preventDefault();
    for(let table in this.props.mappingsection.tables){
      if(table === 'attributeValues'){
        this.props.mappingsection.tables[table].push('attributeValues++('+this.props.mappingsection.tables[table].length+')');
      }
    }
    this.actions.handleChanges(this.props.mappingsection);
  }
  renderChild() {
    const child = [];
    for (let key in this.props.mappingsection.tables) {
      if(key !== "product"){
        child.push(<li><a>{key}</a></li>);
      }
    }
    return child;
  }

  renderChild1() {
    const child = [];
    let tb = this.props.mappingsection.tables;
    console.log(tb);
    for(let key in tb){
      let ch = [];
      if(tb[key].length){
        for (let i = 0; i < tb[key].length; i++) {
          ch.push(<option onClick={this.selectedTable.bind(this)} value={tb[key][i]}>{tb[key][i]}</option>);
        }
      } 
      if(key === 'product'){
        child.push(<option onClick={this.selectedTable.bind(this)} value={key}>{key}</option>);
      }else{
        child.push(<optgroup label={key}>{ch}</optgroup>);
      }
    }
    return child;
  }

  selectHead(e) {
    this.headSelect = e.currentTarget.value;
  }

  selectProperty(e) {
    this.propertySelect = e.currentTarget.value;
    for(let i=0; i<this.props.mappingsection.attributeList.length; i++){
      if(e.currentTarget.value === this.props.mappingsection.attributesList[i].field){
        this.props.mappingsection.attributesList[i]['mapped'] = true;
      }
    }
    this.actions.handleChanges(this.props.mappingsection);
  }

  tableAttribute() {
    const attributesList = [];
    for(let index in this.headers){
      attributesList.push(<option  onClick={this.selectHead.bind(this)} value={this.headers[index]}>{this.headers[index]}</option>);
    }
    return attributesList;
  }
  tableProperty() {
    const propertiesList = [];
    const props = this.props.mappingsection.properties;
    for(let index in props){
      if(props[index].mapped){
        propertiesList.push(<option  className="green-color" onClick={this.selectProperty.bind(this)} value={props[index].field}>{props[index].field}</option>);
      }else if(props[index].isRequired){
        propertiesList.push(<option  className="required-color" onClick={this.selectProperty.bind(this)} value={props[index].field}>{props[index].field}</option>);
      }else{
        propertiesList.push(<option onClick={this.selectProperty.bind(this)} value={props[index].field}>{props[index].field}</option>);
      }
    }
    return propertiesList;
  }
  
  mappedDataInTable() {
    const MD = this.props.mappingsection.mappedFields;
    const MDHTML = [];
    if(MD.length>0){
      for(let key in MD){
      MDHTML.push(
        <tbody>
          <tr>
            <td>{MD[key].column}</td>         
            <td>{MD[key].propertyname}</td>
            <td>{MD[key].propertydec}</td>
            <td>{key}</td>
            <td>
              <button className="btn btn-default btn-xs" ng-click="removeRow(row.propName.field, row.columnName, row.tableName, $index)"><span className="glyphicon glyphicon-remove"></span> Remove</button>
            </td>
          </tr>
        </tbody>
      )
    }
    }
    return MDHTML;
  }
  render() {
    /*let tableAttribute = this.headers.map(function(attribute){
      return <option value={attribute}>{attribute}</option>;
    });*/

    /*let properties = this.props.mappingsection.properties.map(function(property){
        return <option  value={this.props.mappingsection.properties[property].field}>{this.props.mappingsection.propertiesproperty.filed}</option>;
    });*/
    
    return (
	    <div className="container">  
	      <div className="upload-container">
          <legend>Mapping</legend>
        </div>
        <form className="form-horizontal" role="form" name="mapForm">
          <div className="form-group">
            <label for="x" className="col-sm-2 control-label">Mapping Name</label>
            <div className="col-sm-3">
              <input name="jobId" className="form-control" placeholder="Choose Mapping Name" id="mapName" type="text" ng-model="map.name" required ng-disabled="edit" />
              <span  id="error" ng-show="form-mapForm.$invalid && submitted">please enter mapping name</span>
            </div>
          </div>
        </form>
        <div className="bs-callout bs-callout-info">
          <p><span className="text-info"><b>Required properties</b> are displayed in blue.</span><br/><span className="text-success"><b>Mapped properties</b> are marked with green color.</span></p>
        </div>
        <div className="row">
          <div className="col-md-3">
             <h4><a href="#" prev-default>Columns from input file</a> <a className="btn btn-default"><span className="glyphicon glyphicon-question-sign"></span></a></h4>
          </div>
          <div className="col-md-4 col-md-offset-2">
             <h4>Tables <a className="btn btn-default"><span className="glyphicon glyphicon-question-sign"></span></a></h4>
          </div>
          <div className="col-md-3">
             <h4><a href="#">Properties</a></h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <select className="mapping-select" id="columns1" name="columns" size="20" >
              {this.tableAttribute()}    
            </select>
          </div>
          <div className="col-md-2">
             <div className="btn-group btn-group-justified">
                <a href="" className="btn btn-default" onClick={this.mapping.bind(this)}>Map <span className="glyphicon glyphicon-chevron-right"></span></a>
             </div>
             <br/>
             <div className="btn-group btn-group-justified" ng-if="attributeList.automap">
                <a className="btn btn-default" onClick={this.mapAttribute.bind(this)}>Auto Add Attribute <span className="glyphicon glyphicon-chevron-right"></span></a>
             </div>
             <br/>
          </div>
          <div className="col-md-4">
             <select className="mapping-select" id="SelectId"  name="classesList" size="20">
                  
                {this.renderChild1()}
             </select>
          </div>
          <div className="col-md-3">
            <select className="mapping-select" id="property" name="properties" size="20" onClick={this.selectedProperty.bind(this)}>
              {this.tableProperty()}   
            </select>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-3">
            <div className="btn-group ">
              <button type="button" className="btn btn-default default-value"  data-toggle="button"><span>Default value</span><span ng-if="defaultVal.name != 'defaultValue'"></span></button>
              <a className="btn btn-default edit-icon"  onClick={this.toAddDefaultName.bind(this)}><span className="glyphicon glyphicon-pencil"></span></a>
              <a className="btn btn-default hide ok-icon" onClick={this.saveDefaultName.bind(this)}><span className="glyphicon glyphicon-ok"></span></a>
              <a className="btn btn-default"><span className="glyphicon glyphicon-question-sign"></span></a>
            </div>
            <form role="form">
              <div className="form-group">
                <input type="text"  className="form-control" onChange={this.enteredDefaultVal.bind(this)}  placeholder="" />
              </div>
            </form>
          </div>
          <div className="col-md-4 col-md-offset-2">
              <div className="btn-group" id="subTable">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                  {
                    this.props.mappingsection.pickedTable !== "Select" &&
                    <span ng-show="pickedTable">{this.props.mappingsection.pickedTable}</span>
                  }
                  {
                    this.props.mappingsection.pickedTable === "Select" &&
                    <span ng-hide="pickedTable">Select</span>
                  }
                  
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu" id="subtableList" onClick={this.selectnewPropTable.bind(this)}>
                  {this.renderChild()}
                </ul>
              </div>
              <a href="#" className="btn btn-default btn-sm" onClick={this.addToList.bind(this)}><span className="glyphicon glyphicon-plus"></span></a>
              <a href="#" className="btn btn-default btn-sm" ng-click="removeProperty()"><span className="glyphicon glyphicon-remove"></span></a>
              <div ng-include="'app/partials/confirmationDialogBox.html'"></div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="button-container">
          {
            this.props.mappingsection.mappedData.length === 0 &&
            <div ng-show="tableData.length == 0">
              No mapped details
            </div>
          }
          
          {
            this.props.mappingsection.mappedFields.length > 0 &&
            <div ng-show="tableData.length > 0">
              <table className="table" cellspacing="0">
                <thead>
                  <tr>
                    <th prev-default>Column from import file</th>
                    <th>Property name</th>
                    <th>Property description</th>
                    <th>Index</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {this.mappedDataInTable()}
              </table>
            </div>
          }    
          <hr />
          <div className="pull-right">
            <button className="btn btn-primary "  onClick={this.actions.redirectPreview}>Back</button>
            <button className="btn btn-primary"  ng-click="saveMappingStep(map, tableData)">Save Mapping</button>
          </div>
        </div>
	    </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('--state--', state);
  const { mappingsection, attributesectionsearch } = state;
  return {
    mappingsection, attributesectionsearch
  };
}

Mapping.propTypes = {
  mappingsection: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  attributesectionsearch: React.PropTypes.object
};

export default connect(mapStateToProps)(Mapping);
