import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import * as MappingActions from 'actions/mappingPage/MappingActions';
import * as homeActions from 'actions/homePage/HomeActions'
import { connect } from 'react-redux';
import request from 'superagent';
import FileUploader from './FileUploader.react';


class Home extends Component {

    constructor(props) {
        super(props);
        var { homesection } = this.props.state;
        var {dispatch} = this.props;
        console.log("homesection",homesection);
        this.state=homesection;
        if(this.props.state.homesection.fileSelected==true){

          this.message=this.props.state.homesection.properties.message;
          this.size=this.props.state.homesection.properties.size;
          this.type=this.props.state.homesection.properties.type;
          this.name=this.props.state.homesection.properties.name;
        }
        else
        {
          this.message = "";
          this.size="";
          this.name="";
          this.type="";
        }
        this.actions = bindActionCreators(PreviewActions, dispatch);
        this.homeSectionActions = bindActionCreators(homeActions,dispatch);
        this.mappingSectionActions = bindActionCreators(MappingActions, dispatch);
    }

    componentWillMount(){
        this.mappingSectionActions.attributeList();
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
            this.homeSectionActions.selectedFile({
                properties : {size:this.size,
                    name:this.name,
                    message:this.message,
                    type:this.type},
                response : response.body
            },this.mappingsectionstate);
        }
    }
    startRead(files){
        this.actions.redirectPreview();

    }
    onfileOver(e){
        if(e.target.className==="dropzoneContainer")
          e.target.style.border='5px dashed green';
    }
    onDragLeave(e){
       if(e.target.className==="dropzoneContainer")
          e.target.style.border='5px dashed #DDD';
    }

    updateView(viewprops){
        if(viewprops){
            this.size = viewprops.size;
            this.name = viewprops.name;
            this.message = viewprops.message;
            this.type = viewprops.type;
        }
    }
    componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this.updateView(this.props.state.homesection.properties)
    }
    render() {
        return (
            <div className="container">
              <FileUploader />
              { 
                this.message==='please select csv file' &&
                <div className="errorMessage">
                  {this.message}
                </div>
              }

              {
                this.message==='Uploaded file:' &&
                <div className="displayMessage">
                  <b>{this.message}</b>{this.name}<b className="marginleft5">Size</b>:{this.size}<b className="marginleft5">Type</b>: {this.type}
                </div>
              }
        
         
         { this.message==='Uploaded file:' &&
         <div className="pull-right">
             <button className="btn btn-primary" onClick={this.startRead.bind(this)}>Next</button>
         </div>
             }


            </div>

        );
    }
}


function mapStateToProps(state) {
    return {
        state
    };
}

Home.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Home);