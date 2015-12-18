import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as MappingActions from 'actions/mappingPage/MappingActions';
import { connect } from 'react-redux';
import Transformation from './Transformation.react';
import _ from 'lodash';
//import Growl from 'react-growl';
//import 'react-notifications/lib/notifications.css';
//import Notifications from 'react-notifications';
class Mapping extends Component {
  constructor(props) {
    super(props);
    const { mappingsection, homesection, selectmapping, dispatch } = this.props;
   //this.props.mappingsection = mappingsection;
    this.actions = bindActionCreators(MappingActions, dispatch);
    //this.growler= null;
    const params = this.props.params;
    if (typeof params.id !== 'undefined') {
      this.actions.getMapInfo(params.id);
      this.actions.getCSVfileData(params.id, 'tnt1');
      this.edit= true;
    } else {
      if(!(this.props.homesection && this.props.homesection.filedata && this.props.homesection.filedata.headers)){
        console.log('no headers found. possiblity that file is not uploaded');
        this.actions.redirectPreview();
      }
    }
    this.mappingName = this.props.mappingsection.mappingName;
    if(this.props.mappingsection.headers.length){
      this.headers = this.props.mappingsection.headers;
    }
    else if(!this.props.attributesectionsearch.noHeader) {
      let headers = [];
      let row = this.splitter(this.props.homesection.filedata.headers, this.props.attributesectionsearch.delimiter);
      for(let c=1; c <=row.length; c++){
        headers.push('Column'+c);
      }
      this.headers = headers;
    } else {
      if(this.props.homesection.filedata.headers){
        this.headers = this.props.homesection.filedata.headers.split(this.props.attributesectionsearch.delimiter);
        for (var i = 0; i < this.headers.length; i++) {
          this.headers[i] = this.headers[i].trim();
        };
      }
    }
    this.headers =  _.map(this.headers, function (header) {
      if(header.value) return header;
      else return {'value':header, 'mapped':false}
    })
    this.props.mappingsection.headers = this.headers;
  }

  componentWillMount() {
    if(this.props.mappingsection.tables !== undefined || (this.props.mappingsection.tables && this.props.mappingsection.tables.length === 0)){
      this.actions.attributeList();
    }
    let synonymsList = this.props.attributesectionsearch.synonymsList;
    let mappedField = {};
    if(this.props.attributesectionsearch.autoMap && !this.props.mappingsection.mapped){
      for(let i in this.props.mappingsection.headers){
        for( let index in synonymsList){
          for(let indx in synonymsList[index].synonyms){
            let c =  this.props.mappingsection.headers[i].value;
            console.log('HEADER', c.toLowerCase());
            if(synonymsList[index].synonyms[indx] === c.toLowerCase()){
              mappedField = {
                "userFieldName": c,
                "transformations": [],
                "table": synonymsList[index].tableName,
                "field": index,
                "defaultValue": '',
                "index": '',
                "instance": '',
                "isRequired": ''
              };
              this.props.mappingsection.mappedData.push(mappedField);
              //this.props.mappingsection.mappedFields = this.props.mappingsection.mappedData;
              this.props.mappingsection.selectedTable = c;
              let name = this.util_getindexnumber(this.props.mappingsection.pickedTable);
              let propertyname;
      if(synonymsList[index].tableName === 'product'){
        propertyname = 'product.'+index;
      }else{
        propertyname = 'product.'+name[1]+synonymsList[index].tableName+'.'+c;
      }

              this.props.mappingsection.mappedFields.push({transformations:[],column:c,propertydec: index, propertyname: propertyname});
              console.log('Header Matched', mappedField);
            }
          }
        }
        break;
      }

      this.props.mappingsection.mapped = true;
      this.actions.handleMappedChnages(this.props.mappingsection);
    }
  }

  componentWillReceiveProps(nextProps){
    this.props = nextProps;
    if (typeof this.props.params.id !== 'undefined') {
      if(this.props.mappingsection.headers.length >  0) {
        for (var i = 0; i < this.props.mappingsection.headers.length; i++) {
          if(this.props.mappingsection.headers[i].value == undefined) {
            this.props.mappingsection.headers[i] = {'value':this.props.mappingsection.headers[i].trim(), 'mapped':false}
          }
        };
        this.headers = this.props.mappingsection.headers;
        this.mappedTables();
      }
    }
    this.setColourToMappedItems();

    //this.props.mappingsection.mappingName
  }

  redirectMapping() {
    this.actions.redirectEdit();
  }
  splitter(data, splittype) {
    return data.split(splittype);
  }

  setHeaderSelected(headSelect,value){
    var header = _.find(this.headers,{'value':headSelect});
    if(header){
      this.headers[_.findIndex(this.headers,header)].mapped = value;
      return;
    }
  }

  setColourToMappedItems() {
    this.setColourToMappedColumn();
    this.setColourToMappedProperty();
  }

  setColourToMappedColumn() {
    for (var i = 0; i < this.props.mappingsection.mappedData.length; i++) {
      for (var j = 0; j < this.headers.length; j++) {
        if (this.props.mappingsection.mappedData[i].userFieldName === this.headers[j].value) {
          this.headers[j].mapped = true;
        }
      };
    }
  }

  setColourToMappedProperty() {
    let selectedTab = this.util_getindexcommna(this.props.mappingsection.selectedTab);
    let tableindex = selectedTab[0];
    (false === isNaN(parseInt(tableindex))) ? tableindex= tableindex : tableindex = '';
    for (var i = 0; i < this.props.mappingsection.mappedData.length; i++) {
      for (var k = 0; k < this.props.mappingsection.properties.length; k++) {
        if(this.props.mappingsection.mappedData[i].table === selectedTab[1] && this.props.mappingsection.mappedData[i].index === tableindex && (this.props.mappingsection.properties[k].field === this.props.mappingsection.mappedData[i].field ||
          this.props.mappingsection.properties[k].field === 'tenantId')) {
          this.props.mappingsection.properties[k].mapped = true;
        }
      }
    }
  }

  mappedTables() {
    for (var i = 0; i < this.props.mappingsection.mappedData.length; i++) {
      if(this.props.mappingsection.mappedData[i].table !== 'product') {
        var obj = {
          index: this.props.mappingsection.mappedData[i].index,
          name: this.props.mappingsection.mappedData[i].table,
          properties: _.cloneDeep(this.props.mappingsection.attributeList[this.props.mappingsection.mappedData[i].table])
        };
        var exist = false;
        for (var j = 0; j < this.props.mappingsection.tables[this.props.mappingsection.mappedData[i].table].length; j++) {
          if(this.props.mappingsection.tables[this.props.mappingsection.mappedData[i].table][j].index === this.props.mappingsection.mappedData[i].index) {
            exist = true;
          }
        };
        if(exist === false){
          this.props.mappingsection.tables[this.props.mappingsection.mappedData[i].table].push(obj);
        }
      }
    }
  }

  mapping(e) {
    e.preventDefault();
    if(this.props.mappingsection.headSelect===''||this.props.mappingsection.propertySelect===''||this.props.mappingsection.selectedTab===''){
      this.actions.showAddMappingMessage('Please select three columns');
    }
    else{
      let propertyname;
      let mappedField = {};
      let selectedTab = this.util_getindexcommna(this.props.mappingsection.selectedTab);
      let tableindex = selectedTab[0];
      (false === isNaN(parseInt(tableindex))) ? tableindex=tableindex : tableindex = '';
      for(let index in this.props.mappingsection.attributeList){
            if(selectedTab[1] === index){
              for(let idx in this.props.mappingsection.attributeList[index]){
                if(this.props.mappingsection.attributeList[index][idx].field === this.props.mappingsection.propertySelect){
                  this.setHeaderSelected(this.props.mappingsection.headSelect,true);
                  mappedField = {
                    "userFieldName": this.props.mappingsection.headSelect,
                    "transformations": [],
                    "table": selectedTab[1],
                    "field": this.props.mappingsection.attributeList[index][idx].field,
                    "defaultValue": this.props.mappingsection.defaultValue,
                    "index": tableindex,
                    "instance": this.props.mappingsection.attributeList[index][idx].instance,
                    "isRequired": this.props.mappingsection.attributeList[index][idx].isRequired
                  };
                }
              }
            }
          }
      let name = this.util_getindexnumber(this.props.mappingsection.pickedTable);
      if(selectedTab[1] === 'product'){
        propertyname = 'product.'+this.props.mappingsection.propertySelect;
      }else{
        propertyname = 'product.'+name[1]+tableindex+'.'+this.props.mappingsection.propertySelect;
      }
      if(this.props.mappingsection.defaultValue){
        this.props.mappingsection.headSelect = '"'+this.props.mappingsection.defaultValue+'"';
      }
      this.props.mappingsection.mappedFields.push({column:this.props.mappingsection.headSelect,propertydec: this.props.mappingsection.propertySelect, propertyname: propertyname});
      this.props.mappingsection.mappedData.push(mappedField);
      this.props.mappingsection.selectedTable = this.props.mappingsection.selectedTab;
      this.props.mappingsection.headers = this.headers;
      if(this.props.mappingsection.defaultValue){
        this.props.mappingsection.defaultValue = '';
        $('.default-value').removeClass('active');
      }
      this.setColourToMappedProperty();
      this.props.mappingsection.propertySelect = '';
      this.props.mappingsection.selectedTab = '';
      this.props.mappingsection.headSelect = '';
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

  /*util_ functions are well tested*/
  util_getindexcommna = function(tablename){
    let table = tablename.split(","),index =0,found=false;

    if(table.length >= 1){
      return [parseInt(table[1]),table[0]];
    }else{
      return [NaN,table[0]];
    }
  };
  util_getindexnumber = function(tablename){
    let table = tablename.split(""),index =0;
    let test = tablename.match(/\d+/);
    test = (test && test.length>0) ? test.toString() : 0;
    for(index in table){
      if(isNaN(table[index] === false)){
        console.log(index);
        break;
      }
    }
    let result = [test,tablename.substr(0,table.length-test.length)];
    return result;
  }
  selectedTable(e) {
    let selectedTab;
    if(typeof e === 'string'){
      selectedTab = e;
    }else{
      e.preventDefault();
      selectedTab = e.currentTarget.value;
    }
    this.hideremoveicon(false);
    this.props.mappingsection.selectedTab = selectedTab;
    let info = this.util_getindexcommna(selectedTab);
    let tablename = info[1],info0 = parseInt(info[0]);
    if(isNaN(info0) === true){
      for(let key in this.props.mappingsection.attributeList) {
        if(key === tablename){
          this.props.mappingsection.properties = this.props.mappingsection.attributeList[tablename];
          this.hideremoveicon(true);
        }
      }
    }else{
      for(let key in this.props.mappingsection.tables) {
        if(key === tablename){
          this.props.mappingsection.properties = this.props.mappingsection.tables[tablename][info[0]].properties;
        }
      }
    }
    (isNaN(info0))? info0 = '': info0 = info0;
    this.props.mappingsection.pickedTable = info[1]+info0;
    this.hideplusicon(true);
    this.actions.handleChanges(this.props.mappingsection);
  }
  hideplusicon(value){
    value ? $('#tablesadd').addClass('hide'): $('#tablesadd').removeClass('hide');
  }
  hideremoveicon(value){
    value ? $('#tableremove').addClass('hide'): $('#tableremove').removeClass('hide');
  }
  removeInList(e){
    let name = this.util_getindexnumber(this.props.mappingsection.pickedTable);
    for(let table in this.props.mappingsection.tables){
      if(table === name[1]){
        this.props.mappingsection.tables[table].splice(name[0],1);
      }
    }
    let tablename = name[1];
    (isNaN(name[0]))? tablename += '': tablename += name[0];
    for(var i=0;i<this.props.mappingsection.mappedData.length;i++){
      if(name[1] === this.props.mappingsection.mappedData[i].table){
        if((isNaN(name[0])) === false && name[0] == this.props.mappingsection.mappedData[i].index){
          this.props.mappingsection.mappedData.splice(i,1);
          this.props.mappingsection.mappedFields.splice(i,1);

        }
      }
    }
    this.selectedTable('product');
    this.actions.removeInList(this.props.mappingsection);

  }
  addToList(e){
    for(let table in this.props.mappingsection.tables){
      if(table === this.props.mappingsection.pickedTable){
        this.props.mappingsection.tables[table].push({"name":this.props.mappingsection.pickedTable,"index":this.props.mappingsection.tables[table].length,"properties": _.cloneDeep(this.props.mappingsection.attributeList[table])});
      }
    }
    this.actions.handleChanges(this.props.mappingsection);
    e.preventDefault();
    //e.stopImmediatePropagation();
  }
  selectedProperty(e) {
    e.preventDefault();
    this.setColourToMappedItems();
  }

  enteredDefaultVal(e) {
    if(e.currentTarget.value.length>0)
      $('.default-value').addClass('active');
    else
      $('.default-value').removeClass('active');
    this.props.mappingsection.defaultValue = e.currentTarget.value;
    this.actions.handleChanges(this.props.mappingsection);
  }

  selectnewPropTable(e) {
    e.preventDefault();
    this.props.mappingsection.pickedTable = e.target.text;
    this.hideplusicon(false);
    this.hideremoveicon(true);
    this.actions.handleChanges(this.props.mappingsection);
  }
  mapAttribute(e) {
    if(this.props.mappingsection.headSelect=="")
      this.actions.showAddMappingMessage('Please select column');
    else{
         e.preventDefault();
      let table;
        for(table in this.props.mappingsection.tables){
          if(table === 'attributeValues'){
            this.props.mappingsection.tables[table].push({"name":table,"index":this.props.mappingsection.tables[table].length,"properties": _.cloneDeep(this.props.mappingsection.attributeList[table])});
            break;
          }
        }
        this.setHeaderSelected(this.props.mappingsection.headSelect, true);
        const mapField1 = {
          "userFieldName": this.props.mappingsection.headSelect,
          "transformations": [],
          "field": 'value',
          "defaultValue": this.props.mappingsection.defaultValue,
          "index": (this.props.mappingsection.tables[table].length-1),
          "instance": '',
          "table": 'attributeValues',
          "isRequired": true
        };
        this.props.mappingsection.mappedData.push(mapField1);
        this.props.mappingsection.mappedFields.push({column:this.props.mappingsection.headSelect,propertydec: 'value', propertyname: 'product.attributeValues'+(this.props.mappingsection.tables[table].length-1).toString()+'.value'});
        const mapField2 = {
          "userFieldName": this.props.mappingsection.headSelect,
          "transformations": [],
          "field": 'attribute',
          "defaultValue": this.props.mappingsection.defaultValue,
          "index": (this.props.mappingsection.tables[table].length-1),
          "instance": '',
          "table": 'attributeValues',
          "isRequired": true
        };
        this.props.mappingsection.mappedData.push(mapField2);
        this.props.mappingsection.mappedFields.push({column:this.props.mappingsection.defaultValue? '"'+this.props.mappingsection.defaultValue+'"' : '"'+this.props.mappingsection.headSelect+'"',propertydec: 'attribute', propertyname: 'product.attributeValues'+(this.props.mappingsection.tables[table].length-1).toString()+'.attribute'});
        if (this.props.mappingsection.defaultValue) {
          this.props.mappingsection.defaultValue = '';
          $('.default-value').removeClass('active');
        }
        this.actions.handleChanges(this.props.mappingsection);
    }
}
  removeRow(index) {
    // get the table element and remove color
    let fieldname = this.props.mappingsection.mappedData[index].field,tableindex= this.props.mappingsection.mappedData[index].index;
    let table = this.props.mappingsection.tables[this.props.mappingsection.mappedData[index].table];
    /*console.log('====table[tableindex].properties====', table[tableindex]);
    console.log("==");
    let rowindex = _.findIndex(table[tableindex].properties, function(chr) {
        return  chr.field == fieldname;
      });
    table[tableindex].properties[rowindex].mapped = false;*/
    //get the column element and remove color
    this.setHeaderSelected(this.props.mappingsection.mappedData[index].userFieldName,false);
    this.props.mappingsection.headers = this.headers;
    this.props.mappingsection.mappedFields.splice(index,1);
    this.props.mappingsection.mappedData.splice(index,1);
    this.actions.handleMappedChnages(this.props.mappingsection);

  }
  renderChild() {
    const child = [];
    for (let key in this.props.mappingsection.tables) {
      if(key !== "product"){
        child.push(<li className="dropdown-element"><a>{key}</a></li>);
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
          if(tb[key][i] && tb[key][i].index >=0)
          ch.push(<option key={tb[key][i].index}onClick={this.selectedTable.bind(this)} value={tb[key][i].name+','+i}>{tb[key][i].name}{i}</option>);
          else{
            console.log('Error at showing multipletables in tables');
          }
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
  secondStep(e){
    this.actions.redirectPreview([this.props.mappingsection,this.headers]);
  }
  selectHead(e) {
    this.props.mappingsection.headSelect = e.currentTarget.value;
    this.actions.handleChanges(this.props.mappingsection);
  }

  selectProperty(e) {
    this.props.mappingsection.propertySelect = e.currentTarget.value;
    for(let i=0; i<this.props.mappingsection.attributeList.length; i++){
      if(e.currentTarget.value === this.props.mappingsection.attributesList[i].field){
        this.props.mappingsection.attributesList[i]['mapped'] = true;
      }
    }
    this.actions.handleChanges(this.props.mappingsection);
  }

  tableAttribute() {
    let headers = this.headers;
    const attributesList = [];
    console.log("--header--");
    console.log(headers);
    for(let index in headers){
      if(headers[index].mapped){
        attributesList.push(<option key={index} className="green-color" onClick={this.selectHead.bind(this)} value={headers[index].value}>{headers[index].value}</option>);
      }else{
        attributesList.push(<option key={index} onClick={this.selectHead.bind(this)} value={headers[index].value}>{headers[index].value}</option>);
      }
    }
    return attributesList;
  }

  tableProperty() {
    const propertiesList = [];
    const props = this.props.mappingsection.properties;
    for(var idx in props){
      if(props[idx].field ==="tenantId"){
        props[idx]['mapped']=true;
      }
    }
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
  transChange(value,index){
    this.props.mappingsection.mappedFields[index].transformations = value;
    this.props.mappingsection.mappedData[index].transformations = value;
    this.actions.handleMappedChnages(this.props.mappingsection);
  }
  getparams(params, isempty) {
            let param = '';
            if(isempty !== '' && params.length > 0){
                param = ','
            }
            param += params[0] && params[0].value ? params[0].value : '';
            for(var i=1;i<params.length;i++){
                param += ','+params[i].value;
            }
            return param;
        };
  getnexttransformation(tranformationarray,next){

    let tranfomationfunc = '';
    if(tranformationarray[next]){
        if(tranformationarray[next+1]){
            tranfomationfunc = this.getnexttransformation(tranformationarray,next+1);
        }
        return tranfomationfunc = tranformationarray[next].name + '('+tranfomationfunc+this.getparams(tranformationarray[next].params,tranfomationfunc)+')';
    }
  };

  mappedDataInTable() {
    const MD = this.props.mappingsection.mappedFields;
    const MDHTML = [];
    if(MD.length>0){
      for(let key in MD){
        let tranformation;
        console.log('yes here', MD[key].transformations);
        if(MD[key].transformations.length>0){
          tranformation = this.getnexttransformation(MD[key].transformations,0);
        }
      MDHTML.push(
          <tr>
            <td className="inline-place">{MD[key].column}<Transformation selectedMappTrans={key} transformationChnaged={this.transChange.bind(this)} /><span className="margin5px">{tranformation}</span></td>
            <td>{MD[key].propertyname}</td>
            <td>{MD[key].propertydec}</td>
            <td>{key}</td>
            <td>
              <button className="btn btn-default btn-xs" onClick={this.removeRow.bind(this,key)}><span className="glyphicon glyphicon-remove"></span> Remove</button>
            </td>
          </tr>
      )
    }
    }
    return MDHTML;
  }

  mappingNameHandler(e) {
    const change = this.props.mappingsection;
    change.mappingName = e.target.value;
    this.actions.handleChanges(change);
  }

  saveMappingStep(e) {
    if(this.props.mappingsection.mappingName=== "" ||
      this.props.mappingsection.mappingName=== undefined){
      this.props.mappingsection.mappingName = undefined;
      this.actions.showAddMappingMessage('Please enter the mapping name');
      this.actions.handleChanges(this.props.mappingsection);
    }
    else{
      for(let i=0;i<this.props.mappingsection.mappedData.length;i++){
          let mapped = this.props.mappingsection.mappedData[i];
          if(mapped === undefined){
              this.props.mappingsection.mappedData.splice(i,1);
          }
      }
      let preview = this.props.attributesectionsearch;
      let finalData = {
        'id': this.props.mappingsection.id,
        'delimeter': {includeHeader: preview.noHeader, delimeterFormat: preview.delimeter, dateFormat: preview.dFormat, numberFormat: preview.noFormat},
        'fileName': this.props.homesection.filedata.fileName,
        'mappingInfo': this.props.mappingsection.mappedData,
        'tenantId': 'tnt1',
        'attributeId': this.props.homesection.filedata.fileName,
        'mappingName': this.props.mappingsection.mappingName
      };
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
              <input name="jobId" className="form-control"
              value={this.props.mappingsection.mappingName}
              onChange={this.mappingNameHandler.bind(this)}
              placeholder="Choose Mapping Name" id="mapName" type="text"
              required disabled={this.edit} />
            { this.props.mappingsection.mappingName === undefined &&
            <span  id="error" className="red-color">Please enter mapping name</span>
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
                <input type="text"  className="form-control" value={this.props.mappingsection.defaultValue}
                onChange={this.enteredDefaultVal.bind(this)}  placeholder="" />
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
              <a href="#" id="tablesadd" className="btn btn-default btn-sm" onClick={this.addToList.bind(this)}><span className="glyphicon glyphicon-plus"></span></a>
              <a href="#" id="tableremove" className="btn btn-default btn-sm" onClick={this.removeInList.bind(this)}><span className="glyphicon glyphicon-remove"></span></a>
              <div ng-include="'app/partials/confirmationDialogBox.html'"></div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="button-container">
          {
            this.props.mappingsection.mappedData && this.props.mappingsection.mappedData.length > 0 ?
            <div >
              <table className="table" cellSpacing="0">
                <thead>
                  <tr>
                    <th prev-default>Column from import file</th>
                    <th>Property name</th>
                    <th>Property description</th>
                    <th>Index</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                 {this.mappedDataInTable()}
                </tbody>
              </table>
            </div> : <p>No mapped details</p>
          }
          <hr />
          { this.props.mappingsection.id ?
          <div className="pull-right">
            <button className="btn btn-primary"
            onClick={this.saveMappingStep.bind(this)}>Update</button>
            <span> </span>
            <button className="btn btn-primary"
            onClick={this.redirectMapping.bind(this)}>Cancel</button>
          </div> :
          <div className="pull-right">
            <button className="btn btn-primary "  onClick={this.secondStep.bind(this)}>Back</button>
            <span> </span>
            <button className="btn btn-primary"  onClick={this.saveMappingStep.bind(this)}>Save Mapping & Proceed</button>
          </div>

         }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('--mapping section state--', state);
  const { mappingsection, attributesectionsearch, homesection, selectmapping } = state;
  return {
    mappingsection, attributesectionsearch, homesection, selectmapping
  };
}

Mapping.propTypes = {
  mappingsection: React.PropTypes.object,
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  attributesectionsearch: React.PropTypes.object,
  transformations: React.PropTypes.object
};

export default connect(mapStateToProps)(Mapping);
