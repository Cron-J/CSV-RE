import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import * as homeActions from 'actions/homePage/HomeActions'
import { connect } from 'react-redux';
import request from 'superagent';


class Home extends Component {

    constructor(props) {
        super(props);
        var { homesection,dispatch } = this.props;
        console.log("homesection",homesection);
        this.state=homesection;
        if(this.props.homesection.fileSelected==true){
          this.message=this.props.homesection.properties.message;
          this.size=this.props.homesection.properties.size;
          this.type=this.props.homesection.properties.type;
        }
        else
        {
          this.message = "";
          this.size="";
          this.name="";
          this.type="";
        }
        this.style;
        this.uploadedFile;
        this.actions = bindActionCreators(PreviewActions, dispatch);
        this.homeSectionActions = bindActionCreators(homeActions,dispatch);
    }


    onDrop(files,e) {
      if(e.target.className==="dropzoneContainer")
          e.target.style.border='5px dashed #DDD';
      console.log(e.target);
         this.style={'border.dashed': 'green'}
        this.uploadedFile=files;
        console.log("homesection");
        console.log(this.props.homesection);
        var extention ="";
        extention= files[0].name.split('.').pop();
        extention=extention.toLowerCase();

        if(extention==="csv"){
            this.message="uploaded file:";
            this.size=" size:"+files[0].size+"B";
            this.name=" name:"+files[0].name;
            this.type=" type:"+files[0].type;
            //this.buttonVisibility=false;
            console.log(this.size+" "+this.name);
            
        }
        else{

            this.message="please select csv file";
            this.size="";
            this.name="";
            this.type="";

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
            //Set your state to store file data;
            console.log(response.body);
            this.homeSectionActions.selectedFile({
                properties : {size:this.size,
                    name:this.name,
                    message:this.message,
                    type:this.type},
                response : response.body
            });
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
        this.updateView(this.props.homesection.properties)
    }
    render() {
        return (
            <div className="container">
              <div className="row">
                  <div className="col-md-10"  onDragLeave={this.onDragLeave.bind(this)} onDragOver={this.onfileOver.bind(this)}>
                      <Dropzone className="dropzoneContainer" onDrop={this.onDrop.bind(this)} >
                          <div className="dropzoneMessage">
                          Click here to choose .CSV file <b>or</b> Drop .CSV file here
                          </div>
                      </Dropzone>
                  </div>
              </div>
          { 
            this.message==='please select csv file' &&
            <div className="errorMessage">
             {this.message}
            </div>
              }

          {
            this.message==='uploaded file:' &&
            <div className="displayMessage">
                <b>{this.message}</b>{this.name}-{this.size}-{this.type}
            </div>

          }
        
         
         { this.message==='uploaded file:' &&
         <div className="pull-right">
             <button className="btn btn-primary" onClick={this.startRead.bind(this)}>Next</button>
         </div>
             }


            </div>

        );
    }
}


function mapStateToProps(state) {
    const { homesection } = state;
    return {
        homesection
    };
}

Home.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Home);