import React, { Component, PropTypes } from 'react';
import request from 'request';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import * as HomeActions from 'actions/homePage/HomeActions';
import { connect } from 'react-redux';


class Home extends Component {
    
  constructor(props) {
    super(props);
    const { homesection,dispatch } = this.props;
    this.state=homesection;
    this.message = "";
    this.size="";
    this.name="";
    this.type="";
    this.uploadedFile;
    this.actions = bindActionCreators(PreviewActions, dispatch);
  }


  onDrop(files) {
    this.uploadedFile=files;
    console.log(this.props.homesection);
   console.log("this is file="+this.file);
    console.log("=============",this.actions);
    var extention ="";
    extention= files[0].name.split('.').pop();
    extention=extention.toLowerCase();

    if(extention=="csv"){
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
   
    this.setState(
      {
        size:this.size,
        name:this.name,
        message:this.message,
        type:this.type
      }
    );
 }   
 startRead(files){
      this.actions.redirectPreview();
               
}

onDragover(files){
  alert("dragover!!!");
}

  render() {

  
  
    return (
      <div className="container">  
          <div className="row">
            <div className="col-md-10">
            <Dropzone className="dropzoneContainer" onDragover={this.onDragover.bind(this)} onDrop={this.onDrop.bind(this)} >
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
              <b>{this.state.message}</b>{this.state.name}-{this.state.size}-{this.state.type}
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
  const { attributesectionsearch } = state;
  return {
    attributesectionsearch
  };
}

Home.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Home);
