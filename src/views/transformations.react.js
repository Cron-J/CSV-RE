import React, { Component, PropTypes } from 'react';
import {Button, Input, Glyphicon} from 'react-bootstrap';

class Transformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transformations: {
				subString: {
					name: 'subString',
					params : [{type : 'text', value : '',pattern :  /^\d+$/, isvalid : false},
                    {type : 'text', value : '',pattern :  /^\d+$/, isvalid : false}]
        },
        upperCase: {
        	name: 'upperCase',
        	params: []
        },
        lowerCase: {
        	name: 'lowerCase',
        	params: []
        }
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
	}
	substringStartedit = (e) => {
		const transformation = this.props.transformation;
		transformation.params[0].value = e.target.value;
		this.props.onEdit(transformation, this.props.id);
	}
	substringEndedit = (e) => {
		const transformation = this.props.transformation;
		transformation.params[1].value = e.target.value;	
		this.props.onEdit(transformation, this.props.id);
	}
	onItemSelect = (e) => {
		if (this.props.onEdit) {
			const transformation = this.state.transformations[e.target.value];
			if (transformation) {
				this.props.onEdit(transformation, this.props.id);
			} else {
				this.props.onRemove(this.props.id);
			}
		}
	}
	renderComponents = (name, params) => {
		let comp = [];
		switch (name) {
		case 'subString':
			comp.push(<div><Input label="Start" type="text" onChange={this.substringStartedit} value={params[0].value} /><Input label="End" onChange={this.substringEndedit}  type="text" value={params[1].value} /></div>);
		case 'upperCase':
			break;
		case 'lowerCase':
			break;
		default:
			break;
		}
		return comp;
	}
	rendervalue = () => {
		if (Object.keys(this.props.transformation).length > 0) {
			return this.props.transformation.name;
		}
		return '';
	}
	remove = () => {
		if (this.props.onRemove) {
			this.props.onRemove(this.props.id);
		}
	}
	renderOptions = () => {
		const options = [];
		options.push(<option value={null}>select</option>);
		for (let key in this.state.transformations) {
			options.push(<option value={key}>{key}</option>);
		}
		return options;
	}
	renderconstraints = () => {
		if (this.props.transformation && Object.keys(this.props.transformation).length > 0) {
			return this.renderComponents(this.props.transformation.name, this.props.transformation.params);
		}
		return '';
	}
	renderRemove = () => {
		if (this.props.id > -1) {
			return <Button onClick={this.remove}><Glyphicon glyph="remove"/></Button>;
		}
		return '';
	}
	render() {
		return (
			<div className="row">
        <div className="col-md-4">
					<Input type="select" onChange={this.onItemSelect} value={this.rendervalue()}>
			      {this.renderOptions()}
		    	</Input>
		    </div>
		    <div className="col-md-2">
	    		{this.renderRemove()}
	    	</div>
	    	<div className="col-md-4">
	    		{this.renderconstraints()}
	    	</div>
    	</div>
		)
	}
}

Transformation.propTypes = {
	transformation: React.PropTypes.object,
	id: React.PropTypes.number,
	onEdit: React.PropTypes.func
}

export default Transformation;