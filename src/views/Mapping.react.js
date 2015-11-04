import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as MappingActions from 'actions/mappingPage/MappingActions';
import { connect } from 'react-redux';
//import Growl from 'react-growl';
//import 'react-notifications/lib/notifications.css';
//import Notifications from 'react-notifications';
class Mapping extends Component {
  constructor(props) {
    super(props);
    const { mappingsection, homesection, dispatch } = this.props;
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
    this.selectedTab = '';
    this.mappingName = '';
    if(this.props.homesection && this.props.homesection.filedata && this.props.homesection.filedata.headers){
        this.headers = this.props.homesection.filedata.headers.split(',');
    }else{
        console.log('no headers found. possiblity that file is not uploaded');
        this.actions.redirectPreview();
    }
    //this.growler= null;
  }
  componentWillMount() {
    this.actions.attributeList();
                        
  }
  
  componentDidMount() {
  }
  componentWillRecieveProps(nextProps){
      console.log(nextProps);
      //this.mappingName
  }

  mapping(e) {
    e.preventDefault();
    this.defaultValue="";
    if(this.headSelect===''||this.propertySelect===''||this.selectedTab===''){
      alert("select three column");
    }
    else{
          let propertyname;
          let mappedField = {};
          for(let index in this.props.mappingsection.attributeList){
            if(this.selectedTab === index){
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
          this.mappedFields.push({column:this.headSelect,propertydec: this.propertySelect, propertyname: propertyname});
          this.mappedData.push(mappedField);
          this.props.mappingsection.selectedTable = this.selectedTab;
          this.props.mappingsection.mappedData = this.mappedData;
          this.props.mappingsection.mappedFields = this.mappedFields;
          this.actions.handleMappedChnages(this.props.mappingsection);
  }
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
    let selectedTab = e.currentTarget.value;
    this.selectedTab = selectedTab;
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
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  selectedProperty(e) {
    e.preventDefault();
  } 
  
  enteredDefaultVal(e) {
    if(e.currentTarget.value.length>0)
      $('.default-value').addClass('active');
    else
      $('.default-value').removeClass('active');
    
    this.defaultValue = e.currentTarget.value;
  }

  selectnewPropTable(e) {
    e.preventDefault();
    this.props.mappingsection.pickedTable = e.target.text;
    this.setState({});
  }
  mapAttribute(e) {
    if(this.headSelect=="")
     alert("select column");
    else{ 
         e.preventDefault();
        for(let table in this.props.mappingsection.tables){
          if(table === 'attributeValues'){
            this.props.mappingsection.tables[table].push('attributeValues');
          }
        }
        this.props.mappingsection.mappedData.push({
                  "userFieldName": this.headSelect,
                  "transformations": [],
                  "field": 'value',
                  "defaultValue": this.defaultValue,
                  "index": '',
                  "instance": '',
                  "isRequired": true,
                  "rowId": this.mappedData.length++
                });
        this.props.mappingsection.mappedData.push({
                  "userFieldName": '"'+this.headSelect+'"',
                  "transformations": [],
                  "field": 'value',
                  "defaultValue": this.defaultValue,
                  "index": '',
                  "instance": '',
                  "isRequired": true,
                  "rowId": this.mappedData.length++
                });
        this.mappedFields.push({column:this.headSelect,propertydec: 'value', propertyname: 'product.attributeValues.value'});
        this.mappedFields.push({column:'"'+this.headSelect+'"',propertydec: 'attribute', propertyname: 'product.attributeValues.attribute'});
        this.props.mappingsection.mappedFields = this.mappedFields;
        this.actions.handleChanges(this.props.mappingsection);
    }
}
  removeRow(index) {
    this.props.mappingsection.mappedFields.splice(index,1);
    console.log('Mapped Fields',this.props.mappingsection.mappedFields);
    this.actions.handleMappedChnages(this.props.mappingsection);

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
    console.log("--tb---");
    console.log(tb);
    for(let key in tb){
      console.log("in loop");
      let ch = [];
      if(tb[key].length){
        for (let i = 0; i < tb[key].length; i++) {
          ch.push(<option key={key} onClick={this.selectedTable.bind(this)} value={tb[key][i]}>{tb[key][i]}</option>);
        }
      } 
      if(key === 'product'){
        child.push(<option key={key} onClick={this.selectedTable.bind(this)} value={key}>{key}</option>);
      }else{
        child.push(<optgroup key={key} label={key}>{ch}</optgroup>);
      }
    }
    return child;
  }

  selectHead(e) {
    this.headSelect = e.currentTarget.value;
    console.log(this.headSelect);
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
    console.log("(-------------)", this.headers);
    let headers;
    if(this.props.attributesectionsearch.customHeader.length === 0) {
      headers = this.headers;
    } else {
      headers = this.props.attributesectionsearch.customHeader;
    }
    const attributesList = [];
    console.log("--header--");
    console.log(headers);
    for(let index in headers){
      attributesList.push(<option key={index} onClick={this.selectHead.bind(this)} value={headers[index]}>{headers[index]}</option>);
    }
    return attributesList;
  }
  
  tableProperty() {
    const propertiesList = [];
    const props = this.props.mappingsection.properties;
    for(let index in props){
      if(props[index].mapped){
        propertiesList.push(<option key={index}  className="green-color" onClick={this.selectProperty.bind(this)} value={props[index].field}>{props[index].field}</option>);
      }else if(props[index].isRequired){
        propertiesList.push(<option key={index} className="required-color" onClick={this.selectProperty.bind(this)} value={props[index].field}>{props[index].field}</option>);
      }else{
        propertiesList.push(<option key={index} onClick={this.selectProperty.bind(this)} value={props[index].field}>{props[index].field}</option>);
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
              <button className="btn btn-default btn-xs" onClick={this.removeRow.bind(this,key)}><span className="glyphicon glyphicon-remove"></span> Remove</button>
            </td>
          </tr>
        </tbody>
      )
    }
    }
    return MDHTML;
  }
  
  mappingNameHandler(e) {
    this.mappingName = e.currentTarget.value;
  }
  
  saveMappingStep(e) {
    if(this.mappingName===""){
      this.setState({mappingName:undefined});
    }
    else{
        for(let i=0;i<this.props.mappingsection.mappedData.length;i++){
            let mapped = this.props.mappingsection.mappedData[i];
            if(mapped === undefined){
                this.props.mappingsection.mappedData.splice(i,1);
            }
        }
    let finalData = {
      'delimeter': {includeHeader: true, delimeterFormat: ",", dateFormat: "dd-MM-yyyy", numberFormat: "#,###.##"},
      'fileName': "example.csv1445947979733",
      'mappingInfo': this.props.mappingsection.mappedData,
      'tenantId': 'tnt1',
      'attributeId': 'attr1',
      'mappingName': this.mappingName
    }
    this.actions.saveMappedData(finalData);
    this.actions.redirectImport();
  }
}
  render() {    
    return (
	    <div className="container">
      
        <div className="upload-container">
          <legend>Mapping</legend>
        </div>
        <form className="form-horizontal" role="form" name="mapForm">
          <div className="form-group">
            <label htmlFor="x" className="col-sm-2 control-label">Mapping Name</label>
            <div className="col-sm-3">
              <input name="jobId" className="form-control" onChange={this.mappingNameHandler.bind(this)} placeholder="Choose Mapping Name" id="mapName" type="text" ng-model="map.name" required ng-disabled="edit" />
            { this.mappingName === undefined &&
            <span  id="error">please enter mapping name</span>
                }
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
          this.props.mappingsection.mappedData && this.props.mappingsection.mappedData.length === 0 &&
            <div ng-show="tableData.length == 0">
              No mapped details
            </div>
          }
          
          {
            this.props.mappingsection.mappedFields && this.props.mappingsection.mappedFields.length > 0 &&
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
            <span> </span>
            <button className="btn btn-primary"  onClick={this.saveMappingStep.bind(this)}>Next</button>
          </div>
        </div>
	    </div>
    );
  }
}

function mapStateToProps(state) {
  const { mappingsection, attributesectionsearch, homesection } = state;
  return {
    mappingsection, attributesectionsearch, homesection
  };
}

Mapping.propTypes = {
  mappingsection: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  attributesectionsearch: React.PropTypes.object
};

export default connect(mapStateToProps)(Mapping);
