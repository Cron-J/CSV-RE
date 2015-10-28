import React, { Component, PropTypes } from 'react';
import request from 'request-promise';
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
    this.buttonVisibility=true;
    this.actions = bindActionCreators(PreviewActions, dispatch);
  }


  onDrop(files) {
   
    console.log("=============",this.actions);
    var extention ="";
    extention= files[0].name.split('.').pop();
    extention=extention.toLowerCase();

    if(extention=="csv"){
      this.message="uploaded successfully:";
      this.size="size:-"+files[0].size+"Bytes";
      this.name=" name:-"+files[0].name;
      this.buttonVisibility=false;
      console.log(this.size+" "+this.name);
    }
    else{
      
      this.message="please select csv file";
      this.size="";
      this.name="";
      this.buttonVisibility=true;
    }
    this.setState({});
    var formData = new FormData();
    formData.append('file', files);
    console.log('==formData==', formData);
    request({
      url: 'http://localhost:4000/api/csv/uploadfile',
      method: 'POST',
      body: formData,
      json: true
    }).then(function success(data) {
        console.log('---------------');
      }).error(function failure(error) {
        console.log(error);
      });
  }
  render() {

  
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div>
      <div className="container">  
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <div>
             Click here to choose .CSV file or Drop .CSV file here
          </div>

        </Dropzone>

        
         <div>
         {
            this.message==='please select csv file' &&      
            <span className="label label-danger">
                {this.message}
            </span>
            
         }
         {
            this.message==='uploaded successfully:' &&      
            <div>
              {this.message}{this.name}{this.size}
            </div>
            
         }
         </div>
         
         { this.message==='uploaded successfully:' &&
         
            <button className="btn btn-primary" onClick={this.actions.redirectPreview}>Next</button>
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
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Home);
