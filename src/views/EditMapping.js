import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';

class EditMapping extends Component{
 	constructor(props) {
 		super(props);
 		var staticData=[
							{
							    "mappingName" : "eswer",
							    "_id" : ObjectId("55e41577e027bf281269bac5")
							},
							{
							    "mappingName" : "eswer1",
							    "_id" : ObjectId("55e41630e027bf281269bacd")
							},
							{
							    "mappingName" : "eswer3",
							    "_id" : ObjectId("55e41681e027bf281269bad3")
							},
							{
							    "mappingName" : "mapper",
							    "_id" : ObjectId("56384a4941d310b0150b945a")
							}];
 	}

 	render(){
 		var mappingDropdown = [];
		for (var i = 0; i < this.staticData.length; i++) {
  			mappingDropdown.push(<option value={this.staticData[i].name}>{this.staticData[i].name}</option>);
}	
 		return(
 			<div className="Container">
 				<div className="form-group">
                    <label className="col-sm-4 control-label">Mapping Name:</label>
                       <div className="col-sm-8">
                         	<select name="mappingName" id="number" className="form-control" onChange={this.selectMapping.bind(this)}  required>
                            	<option value="">select format</option>
                    	 	 	{mappingDropdown}
                          	</select>
					   </div>
					</div>
				</div>
			</div>
 		)
 	}

}