import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SelectMapActions from 'actions/selectMap/SelectMapActions';
import * as MappingActions from 'actions/mappingPage/MappingActions';
import {Button, ButtonToolbar} from 'react-bootstrap'
class EditMapping extends Component{
 	constructor(props) {
 		super(props);
 		const { selectmapping, dispatch } = this.props;
		this.actions = bindActionCreators(SelectMapActions, dispatch);
    this.mapActions = bindActionCreators(MappingActions, dispatch);
 	}
 	componentWillMount() {
    this.actions.loadMappingList();
  }

  componentDidMount() {
  }
  selectedMapping(e){
	  const change = {};
	  change.mapId = e.target.value;
	  this.actions.handleChanges(change);
  }
  edit() {
    this.actions.editMapping(this.props.selectmapping.mapId);
  }
  redirectHome() {
    this.actions.redirectToHome();
  }
 	render(){
 		var mappingDropdown = [];
		for (var i = 0; i < this.props.selectmapping.list.length; i++) {
  		mappingDropdown.push(<option key={i} value={this.props.selectmapping.list[i].id}>{this.props.selectmapping.list[i].mappingName}</option>);
		}
 		return(
      <div className="container">
        <div className="form-horizontal">
          <p>Please specify the mapping before you start the import. If you have already created a valid mapping then you can start import directly.</p>
   				<div className="form-group" role="form" name="mapForm">
            <label className="col-sm-2 control-label">Mapping Name</label>
            <div className="col-sm-4">
              <select name="mappingName" id="number" className="form-control"
              value={this.props.selectmapping.mapName}
              onChange={this.selectedMapping.bind(this)}  required>
                <option value="">Select Mapping</option>
                {mappingDropdown}
              </select>
  					</div>
            <ButtonToolbar>
              <Button className="btn" bsStyle="primary" onClick={this.redirectHome.bind(this)}>Create Mapping</Button>
  					  {this.props.selectmapping.edit === true ?
  					  <Button className="btn" bsStyle="primary" onClick={this.edit.bind(this)}>Edit Mapping</Button> : '' }
  			    </ButtonToolbar>
          </div>		
        </div>
      </div>
 		)
 	}

}
function mapStateToProps(state) {
    const { selectmapping } = state;
    return {
        selectmapping
    };
}

EditMapping.propTypes = {
    selectmapping: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(EditMapping);