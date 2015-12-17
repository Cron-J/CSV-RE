import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SelectMapActions from 'actions/selectMap/SelectMapActions';
import * as NavActions from 'actions/navPage/NavActions';
import {Button, ButtonToolbar} from 'react-bootstrap'
class NavMapping extends Component{
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
 		return(
      <div className="pull-right">
        <button className="btn btn-primary "  onClick={this.secondStep.bind(this)}>Back</button>
        <span> </span>
        <button className="btn btn-primary"  onClick={this.saveMappingStep.bind(this)}>Next</button>
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

NavMapping.propTypes = {
    selectmapping: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(NavMapping);