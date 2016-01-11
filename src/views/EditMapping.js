import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions/csvActions';
import {Button, ButtonToolbar} from 'react-bootstrap'
class EditMapping extends Component{
 	constructor(props) {
    super(props);
 		const {dispatch } = this.props;
		this.actions = bindActionCreators(Actions, dispatch);
    this.sltdMapping = false;
    this.selectedMap = '';

    //console.log('selectmapping', this.props.state);
 	}
 	componentWillMount() {
    this.actions.loadMappingList();
  }

  componentDidMount() {
  }
  selectedMapping(e){
    this.selectedMap = e.target.value;
    this.sltdMapping = true;
    this.setState({})
  }
  edit() {
    this.actions.getMapInfo(this.selectedMap);
  }
  redirectHome() {
    this.actions.redirectToHome();
  }
 	render(){
 		var mappingDropdown = [];
    if(this.props.state.csv.mappingList && this.props.state.csv.mappingList.length>0){
      for (var i = 0; i < this.props.state.csv.mappingList.length; i++) {
        console.log(this.props.state.csv.mappingList)
        mappingDropdown.push(<option key={i} value={this.props.state.csv.mappingList[i].id}>{this.props.state.csv.mappingList[i].mappingName}</option>);
      }
    }
 		return(
      <div className="container">
        <div className="form-horizontal">
          <p>Please specify the mapping before you start the import. If you have already created a valid mapping then you can start import directly.</p>
   				<div className="form-group" role="form" name="mapForm">
            <label className="col-sm-2 control-label">Mapping Name</label>
            <div className="col-sm-4">
              <select name="mappingName" id="number" className="form-control"
                onChange={this.selectedMapping.bind(this)}  required>
                <option value="">Select Mapping</option>
                {mappingDropdown}
              </select>
  					</div>
            <ButtonToolbar>
              <Button className="btn" bsStyle="primary" onClick={this.redirectHome.bind(this)}>Create Mapping</Button>
  					  {this.sltdMapping == true ?
  					  <Button className="btn" bsStyle="primary" onClick={this.edit.bind(this)}>Edit Mapping</Button> : '' }
  			    </ButtonToolbar>
          </div>		
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

EditMapping.propTypes = {
    selectmapping: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(EditMapping);