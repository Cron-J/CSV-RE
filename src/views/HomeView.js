import React, { Component, PropTypes } from 'react';
import request from 'request';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import { connect } from 'react-redux';


class Home extends Component {
    
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.message = "";
    this.size="";
    this.name="";
    this.uploadedFile;
    //this.buttonVisibility=true;
    this.actions = bindActionCreators(PreviewActions, dispatch);
  }


  onDrop(files) {
    this.uploadedFile=files;
   console.log("this is file="+this.file);
    console.log("=============",this.actions);
    var extention ="";
    extention= files[0].name.split('.').pop();
    extention=extention.toLowerCase();

    if(extention=="csv"){
      this.message="uploaded file:";
      this.size=" size:"+files[0].size+"B";
      this.name=" name:"+files[0].name;
      //this.buttonVisibility=false;
      console.log(this.size+" "+this.name);
    }
    else{
      
      this.message="please select csv file";
      this.size="";
      this.name="";
     // this.buttonVisibility=true;
    }
   
    this.setState(
      {
        size:this.size,
        name:this.name,
        message:this.message

      }
    );
    //console.log("state="+this.state.size);
    /*var formData = new FormData();
    formData.append('file', files);
    console.log('==formData==', formData);*/
 }   
 startRead(files){
                // console.log("startread");
                // var data = {};
                // console.log(this.uploadedFile);
                // data.file = this.uploadedFile[0];
                // data.file_name = this.uploadedFile[0].name;
                // console.log(data.file+"---"+data.file_name);
                // var fd = new FormData();     
                // /*angular.forEach(data, function(value, key) {
                //     console.log("keyyy", key);
                //     console.log("value", value);
                //     fd.append(key, value);
                // });*/
                let callback = function(err,resp,body){
                  console.log(err,resp,body);
                }
                var req = request.post('http://localhost:4000/api/csv/uploadfile');
                this.uploadedFile.forEach((file)=> {
                    req._multipart.body = file
                });
                this.actions.redirectPreview();
                // var fd = new FormData();
                // fd.append("file", this.uploadedFile[0]);
                // fd.append("file_name", this.uploadedFile[0].name);
                // console.log("-------------");
                // console.log(fd);
                // var options = {
                //       method: 'POST',
                //       uri: 'http://localhost:4000/api/csv/uploadfile',
                //       // body: {
                //       //     file: this.uploadedFile[0],
                //       //     file_name: this.uploadedFile[0].name
                //       // },
                //       formData: {
                //           file: this.uploadedFile[0],
                //           file_name: this.uploadedFile[0].name
                //       }
                //       // headers: {
                //       //     'content-type': undefined
                //       // }
                // };
                // var req = request.post('http://localhost:4000/api/csv/uploadfile', fd);
                // request({
                //   method: 'POST',
                //   uri: 'http://localhost:4000/api/csv/uploadfile',
                //   // formData: fd,
                //   multipart: fd
                //   // headers: {
                //   //         'content-type': "multipart/form-data"
                //   // }
                // });
                // var req = request.post('http://localhost:4000/api/csv/uploadfile', function (err, resp, body) {
                //   if (err) {
                //     console.log('Error!');
                //   } else {
                //     console.log('URL: ' + body);
                //   }
                // });
                // var form = req.form();
                // form.append('file', this.uploadedFile[0]);
                // form.append("file_name", this.uploadedFile[0].name);
                // request(options)
                //     .then(function (parsedBody) {
                //         console.log("succedd");
                //     })
                //     .catch(function (err) {
                //       console.log(err)
                //   });
            }

  render() {

  
  
    return (
    
      <div>
      <div className="container">  
        <Dropzone className="dropzoneContainer" onDrop={this.onDrop.bind(this)}>
          <div className="dropzoneMessage">
             Click here to choose .CSV file <b>or</b> Drop .CSV file here
          </div>

        </Dropzone>

        
         <div>
         {
            this.message==='please select csv file' &&      
            <div className="errorMessage">
                {this.message}
            </div>            
         }
         {
            
            this.message==='uploaded file:' &&      
            <div className="displayMessage">
              <b>{this.state.message}</b>{this.state.name}-{this.state.size}
            </div>            

         }
         </div>
         
         { this.message==='uploaded file:' &&
            <div className="pull-right">
            <button className="btn btn-primary" onClick={this.startRead.bind(this)}>Next</button>
            </div>
         }
         
      
         
        
      </div>
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
