import React, { Component, PropTypes } from 'react';
import CustomTable from './customTable.react';
import {Button, Glyphicon} from 'react-bootstrap';
import TransformationModal from './transformationModal.react.js';

class MappingTable extends Component {
	constructor(props) {
		super(props);
		this.state = {transformations: [], showtransformations: false};
	}
	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
	}
	removeRow = (rowid) => {
		if(this.props.onRemove) {
			this.props.onRemove(rowid);
		}
	}
	onTransformation = (transformations, transformationid) => {
		this.setState({showtransformations: true, transformations: transformations, transformationid: transformationid});
	}
	onTransformationSave = (rowid, transformations) => {
		if (this.props.onsaveTranformation) {
			this.props.onsaveTranformation(rowid, transformations);
			this.setState({showtransformations: false, transformations: []});
		}
	}
	onTransformationClose = () => {
		this.setState({showtransformations: false, transformations: []});
	}
	tabledataFormat = (data, row) => {
		return row.table + '.' + row.field;
	}
	transformationsFormat = (data, row) => {
		return <Button bsStyle="default" bsSize="xsmall" onClick={this.onTransformation.bind(this, row.transformations, row.index)}><Glyphicon glyph="edit"/></Button>;;
	}
	actionFormat = (data, row) => {
		return <Button bsStyle="danger" bsSize="xsmall" onClick={this.removeRow.bind(this, row.index)}>Remove <Glyphicon glyph="remove"/></Button>;
	}
	render() {
		return (
			<div>
				<TransformationModal transformationid={this.state.transformationid} onTransformationSave={this.onTransformationSave} onTransformationClose={this.onTransformationClose}  show={this.state.showtransformations} transformations={this.state.transformations} />
				<CustomTable customFunctions={{
				 	table: this.tabledataFormat,
				 	transformations: this.transformationsFormat,
				 	action: this.actionFormat
				 }}
				 headers={[
		              {value: 'userFieldName', label: 'Imported column'},
		              {value: 'transformations', label: 'Transformation'},
		              {value: 'table', label: 'Property name'},
		              {value: 'field', label: 'Property description'},
		              {value: 'index', label: 'Index'},
		              {value: 'action', label: 'Actions'}
		              // 'instance',
		              // 'isRequired',
		            ]}  data={this.props.data} />
    	</div>
		)
	}
}

MappingTable.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onRemove: React.PropTypes.func,
  onsaveTranformation: React.PropTypes.func
}

export default MappingTable;