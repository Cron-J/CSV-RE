import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as MappingActions from 'actions/mappingPage/MappingActions';
import {ButtonToolbar, OverlayTrigger, Popover, Button, Modal} from 'react-bootstrap';

class Tranformation extends Component {
    constructor(props) {
        super(props);
        console.log('-----TRANSFORMATIONS-----', this.props);
        this.state = this.props.transform;
        
    }
    getOptions(transformations){
        let options = [];
        for(let i=0;i< transformations.length;i++) {
            let transform = transformations[i].name;
            options.push({value : transform,label : transform})
        }
        return options;
    }
    editicons(index){
        let edit = this.props.transform.edit;
        if(edit){
            let lefticon,righticon;
            if(index > 0){
                lefticon = <span className="glyphicon glyphicon-chevron-left lefticon" onClick={this.tranformEditLeftShift.bind(this,index)}></span>
            }
            if(this.props.transform.transformations && this.props.transform.transformations.length-1 !== index){
                righticon = <span className="glyphicon glyphicon-chevron-right righticon" onClick={this.tranformEdiRightShift.bind(this,index)}></span>
            }
            this.editables = <span>
                {lefticon}
                <span className="glyphicon glyphicon-remove closeicon" onClick={this.tranformEditClose.bind(this,index)}></span>
                {righticon}
            </span>
        }else{
            this.editables = <span></span>
        }
    };
    render() {
        this.options = this.getOptions(this.props.transform.transformations);
        if(this.props.transform.showselectbox) {
            this.select = <Select
                name="form-field-name"
                options={this.options}
                onChange={this.toggleSelect.bind(this)}/>
        }else{
            this.select = <span></span>
        }
        let labels = this.props.transform.tranformationsApplied;
        let labelshtml = [];
        for(let i=0;i<labels.length;i++) {
            var params = [];
            for(let j=0;j<labels[i].params.length;j++) {
                let paramtype = labels[i].params[j].type;
                let value = labels[i].params[j].value;
                params.push(<span><input onChange={this.addParamvalue.bind(this,labels[i],j,i)}  type={paramtype} value={value} size="2" className="" aria-label="" /></span>);
            }
            this.editicons(i);
            let innerLabel = <span className="margin5px">{this.editables}<span >{labels[i].name}</span><span><span className="">(</span> {params}</span><span className="">)</span></span>;
            labelshtml.push(innerLabel);
        }
        labelshtml.push(this.select);
        this.selectBox = labelshtml;
        return <div className="">
            <span className="glyphicon glyphicon-eye-open border1px" aria-hidden="true" onClick={this.edittranformations.bind(this)}></span>
            {this.selectBox}
            </div>
    }
    edittranformations() {
        this.props.transform.edit = !this.props.transform.edit;
        this.notifychanges();
    }
    tranformEditLeftShift(index) {
        let temp = this.props.transform.tranformationsApplied[index];
        this.props.transform.tranformationsApplied[index] = this.props.transform.tranformationsApplied[index-1];
        this.props.transform.tranformationsApplied[index-1] = temp;
        this.notifychanges();
    }
    tranformEdiRightShift(index){
        let temp = this.props.transform.tranformationsApplied[index];
        this.props.transform.tranformationsApplied[index] = this.props.transform.tranformationsApplied[index+1];
        this.props.transform.tranformationsApplied[index+1] = temp;
        this.notifychanges();
    }
    tranformEditClose(index){
        this.props.transform.tranformationsApplied.splice(index,1);
        this.notifychanges();
    }
    notifychanges(){
        this.props.propertyChanged(this.props.transform);
    }
    toggleSelect(value) {
        console.log(value);
        console.log('====', this.props.transform.transformations);
        let transformations = this.props.transform.transformations;
        let tranformationparams;
        for (let i = 0; i < transformations.length; i++) {
            console.log('t', transformations[i].name);
            console.log('v', value);
            if(transformations[i].name === value.value){
                tranformationparams = transformations[i].params.length;
                this.props.transform.tranformationsApplied.push(_.cloneDeep(transformations[i]));
                break;
            }
        }
        this.props.transform.selectboxvalue = value;
        this.props.transform.showselectbox = tranformationparams <= 0;
        this.setState(this.props.transform);
        this.notifychanges();
    }
    addParamvalue(tranformation,param,index,event) {
        console.log(event.target.value);
        let value = event.target.value;
        let transformations = this.props.transform.tranformationsApplied;
        if(tranformation.params[param]){
            let temp = tranformation.params[param];
            transformations[index].params[param].isvalid = temp.pattern.test(value);// test validity of parameter
            transformations[index].params[param].value = value;
        }
        let isvalid = true;
        for(let i=0;i<transformations.length;i++){
            if(transformations[i].params && transformations[i].params.length){
                for(let j=0;j<transformations[i].params.length;j++){
                    if(!transformations[i].params[j].isvalid){
                        isvalid = false;
                        break;
                    }
                }
            }
            if(!isvalid){
                break;
            }
        }
        this.props.transform.showselectbox= isvalid;
        this.setState(this.props.transform);
        this.notifychanges();
    }
}

const MyLargeModal = React.createClass({
    getInitialState(props) {
        this.state = {
            showselectbox : true,
            selectboxvalue : '',
            transformations : [
                {
                    name : 'subString',
                    params : [{type : 'text', value : '',pattern :  /^\d+$/, isvalid : false},{type : 'text', value : '',pattern :  /^\d+$/, isvalid : false}],
                    subString : function(...params) {
                        console.log(params);
                    }
                },
                {
                    name : 'upperCase',
                    params : [],
                    upperCase : function(...params) {
                        console.log(params);
                    }
                },
                {
                    name : 'lowerCase',
                    params : [],
                    upperCase : function(...params) {
                        console.log(params);
                    }
                }
            ],
            tranformationsApplied : [],
            edit : false
        };
        return this.state;
    },
    render() {
        let temp;
        if(this.props.aplTrans.length>0){
          temp = this.props.aplTrans;
          this.state.tranformationsApplied=this.props.aplTrans;
        }else{
           temp = this.state.tranformationsApplied; 
        }
         
        let string = '';
        this.getparams = function(params, isempty) {
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
        this.getnexttransformation = function(tranformationarray,next){
            let tranfomationfunc = '';
            if(tranformationarray[next]){
                if(tranformationarray[next+1]){
                    tranfomationfunc = this.getnexttransformation(tranformationarray,next+1);
                }
                return tranfomationfunc = tranformationarray[next].name + '('+tranfomationfunc+this.getparams(tranformationarray[next].params,tranfomationfunc)+')';
            }
        };
        this.tranformation = this.getnexttransformation(temp,0);
        return (
            <span>
                <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Add/Edit Transformations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tranformation transform={this.state} propertyChanged={this.propertyChanged.bind(this)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </span>
        );
    },
    propertyChanged(value) {
        this.setState({transform : value});
        this.props.tranformationPropertyChanged({transform : value});
    }
});

const App = React.createClass({
    getInitialState() {
        return { smShow: false, lgShow: false };
    },
    render() {
        let lgClose = () => this.setState({ lgShow: false });

        return (
            <span>
            <ButtonToolbar>
                <Button bsStyle="default" className="btn-padding"  onClick={()=>this.setState({ lgShow: true })}>
                    <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </Button>
                <MyLargeModal aplTrans={this.props.appliedTrans} show={this.state.lgShow} onHide={lgClose} tranformationPropertyChanged={this.propertyChange.bind(this)} />
            </ButtonToolbar>
            </span>
        );
    },
    propertyChange(value){
      this.props.transformationChnaged(value.transform.tranformationsApplied, this.props.selectedMappTrans);
    }
});
function mapStateToProps(state) {
  const { mappingsection, attributesectionsearch, homesection, selectmapping, transformation} = state;
  return {
    mappingsection, attributesectionsearch, homesection, selectmapping, transformation
  };
}


export default connect(mapStateToProps)(App);
