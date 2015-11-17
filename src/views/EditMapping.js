import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PreviewActions from 'actions/previewPage/PreviewActions';
class EditMapping extends Component{
 	constructor(props) {
 		super(props);
 		const { mappingsection, dispatch } = this.props;
 		this.staticData=[
							{
							    "mappingName" : "eswer",
							    "_id" :"55e41577e027bf281269bac5"
							},
							{
							    "mappingName" : "eswer1",
							    "_id" : "55e41630e027bf281269bacd"
							},
							{
							    "mappingName" : "eswer3",
							    "_id" : "55e41681e027bf281269bad3"
							},
							{
							    "mappingName" : "mapper",
							    "_id" : "56384a4941d310b0150b945a"
							}];
							
							 this.actions = bindActionCreators(PreviewActions, dispatch);
 	}
selectMapping(e){
	//this.actions.redirectMapping();
}
 	render(){
 		
 		var mappingDropdown = [];
		for (var i = 0; i < this.staticData.length; i++) {
  			mappingDropdown.push(<option value={this.staticData[i].mappingName}>{this.staticData[i].mappingName}</option>);
		}
 		return(
 			<div className="Container">
 				<div className="form-group">
                    <label className="col-sm-2 control-label">Mapping Name:</label>
                       <div className="col-sm-8">
                         	<select name="mappingName" id="number" className="form-control" onChange={this.selectMapping.bind(this)}  required>
                            	<option value="">select format</option>
                    	 	 	{mappingDropdown}
                          	</select>
					   </div>
					</div>		
			</div>
 		)
 	}

}
function mapStateToProps(state) {
    const { editmappingection } = state;
    return {
        editmappingection
    };
}

EditMapping.propTypes = {
    editmappingection: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(EditMapping);