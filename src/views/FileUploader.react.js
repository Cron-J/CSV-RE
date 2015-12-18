import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import * as MappingActions from 'actions/mappingPage/MappingActions';
import * as homeActions from 'actions/homePage/HomeActions';

class FileUploader extends Component {
    constructor(props) {
    	super(props);
    	var {homesection} = this.props.state;
    	var {dispatch} = this.props;
    	this.state = homesection;

    	this.actions = bindActionCreators(PreviewActions, dispatch);
        this.homeSectionActions = bindActionCreators(homeActions,dispatch);
        this.mappingSectionActions = bindActionCreators(MappingActions, dispatch);
    }

    componentWillMount() {
        
    }

    componentDidMount() {

    }

    onfileOver(e){
        if(e.target.className==="dropzoneContainer")
          e.target.style.border='5px dashed green';
    }
    onDragLeave(e){
       if(e.target.className==="dropzoneContainer")
          e.target.style.border='5px dashed #DDD';
    }

    onDrop(files,e) {
        if(e.target.className==="dropzoneContainer")
          e.target.style.border='5px dashed #DDD';
        console.log(e.target);
        this.style={'border.dashed': 'green'}
        this.uploadedFile=files;
        console.log("homesection");
        console.log(this.props.state.homesection);
        var extention ="";
        extention= files[0].name.split('.').pop();
        extention=extention.toLowerCase();

        if(extention==="csv" || extention === "txt"){
            console.log(files);
            this.message="Uploaded file:";
            this.size=files[0].size+"B";
            this.name=files[0].name;
            if(files[0].type==="application/vnd.ms-excel")
                this.type="Microsoft Office Comma Seperated Value";
            else{
                this.type = files[0].type;
            }
            //this.buttonVisibility=false;
            console.log(this.size+" "+this.name);
            
        }
        else{
            this.message="please select csv file";
            this.size="";
            this.name="";
            this.type="";
            this.setState({message: this.message});
            //this.homeSectionActions.showMessage('Only text and csv files are supported please select a valid file');
        }
        var req = request.post('http://localhost:4000/api/csv/uploadCSV');
            files.forEach((file)=> {
                req.attach(file.name, file);
            });
            req.end(this.callBack.bind(this));
    }

    callBack(err,response) {
        if(err){
            console.log('error uploading a file');
            //this.state.selectedFile(err);
            // handle of error upload goes here
        }else{
            this.createMappingSectionReplaceObject();
            //Set your state to store file data;
            console.log(response.body);
            console.log('this.homeSectionActions', this.homeSectionActions);
            this.homeSectionActions.selectedFile({
                properties : {size:this.size,
                    name:this.name,
                    message:this.message,
                    type:this.type},
                response : response.body
            },this.mappingsectionstate);
        }
    }

    createMappingSectionReplaceObject(){
        const { state, dispatch } = this.props;
        // this object is for maintaining and destroying persistance of mapping page state;
        this.mappingsectionstate = state.mappingsection;
        this.mappingsectionstate.headers = [];
        this.mappingsectionstate.mappedData = [];
        this.mappingsectionstate.mappedFields = [];
        this.mappingsectionstate.mappingData = [];
        this.mappingsectionstate.headSelect = '';
        this.mappingsectionstate.pickedTable = '';
    }

    render(){
        return (
            <div className="row">
                <div className="col-lg-12"  onDragLeave={this.onDragLeave.bind(this)} onDragOver={this.onfileOver.bind(this)}>
                    <Dropzone className="dropzoneContainer" onDrop={this.onDrop.bind(this)} >
                        <div className="dropzoneMessage">
                            Click here to choose .CSV file <b>or</b> Drop .CSV file here
                        </div>
                    </Dropzone>
                </div>
            </div>
    	)
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

FileUploader.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(FileUploader);