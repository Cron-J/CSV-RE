import React, { Component, PropTypes } from 'react';
import CustomTable from './customTable.react';
import {Button, Glyphicon} from 'react-bootstrap';

class MappingTable extends Component {
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
	}
	removeRow = (rowid) => {
		if(this.props.onRemove) {
			this.props.onRemove(rowid);
		}
	}
	tabledataFormat = (data, row) => {
		return row.table + '.' + row.field;
	}
	transformationsFormat = (data, row) => {
		return '';
	}
	actionFormat = (data, row) => {
		return <Button bsStyle="danger" bsSize="xsmall" onClick={this.removeRow.bind(this, row.index)}>Remove <Glyphicon glyph="remove"/></Button>;
	}
	render() {
		return (
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
              {value: 'defaultValue', label: 'Default value'},
              {value: 'index', label: 'Index'},
              {value: 'action', label: 'Actions'}
              // 'instance',
              // 'isRequired',
            ]}  data={this.props.data} />
		)
	}
}

MappingTable.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onRemove: React.PropTypes.func
}

export default MappingTable;