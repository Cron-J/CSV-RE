import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SelectMapActions from 'actions/selectMap/SelectMapActions';
import {Button} from 'react-bootstrap'
class EditMapping extends Component{
 	constructor(props) {
 		super(props);
 		const { selectmapping, dispatch } = this.props;
		this.actions = bindActionCreators(SelectMapActions, dispatch);
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
    this.actions.getMapInfo(this.props.selectmapping.mapId);
  }
  preview() {
  	console.log('here');
  	this.actions.redirectPreview();
  }
 	render(){
 		console.log('list', this.props.selectmapping);
 		var mappingDropdown = [];
		for (var i = 0; i < this.props.selectmapping.list.length; i++) {
  		mappingDropdown.push(<option key={i} value={this.props.selectmapping.list[i].id}>{this.props.selectmapping.list[i].mappingName}</option>);
		}
 		return(
 			<div className="container">
 				<div className="form-group">
          <label className="col-sm-2 control-label">Mapping Name:</label>
          <div className="col-sm-5">
            <select name="mappingName" id="number" className="form-control"
            value={this.props.selectmapping.mapName}
            onChange={this.selectedMapping.bind(this)}  required>
              <option value="">select format</option>
              {mappingDropdown}
            </select>
					</div>
					{this.props.selectmapping.edit === true ?
					<Button className="btn" bsStyle="primary" onClick={this.edit.bind(this)}>EDIT</Button> : '' }
					{this.props.selectmapping.next === true ?
					<Button className="btn" bsStyle="primary" onClick={this.preview.bind(this)}>Next</Button> : ''}
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