import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';
import Transformations from './transformations.react';

class TransformationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {transformations: props.transformations};
	}
	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
	}
	onTransformationSave = () => {
		if (this.props.onTransformationSave) {
			this.props.onTransformationSave(this.props.transformationid, this.state.transformations);
		}
	}
	onTransformationClose = () => {
		if (this.props.onTransformationClose) {
			this.props.onTransformationClose();
		}
	}
	onTransformation = (transformationdata, transformationid) => {
		const change = this.state;
		if (transformationid > -1) {
			change.transformations[transformationid] = transformationdata;
		} else {
			change.transformations.push(transformationdata);
		}
		this.setState(change);
	}
	onTransformationRemove = (id) => {
		const change = this.state;
		if (id > -1) {
			change.transformations.splice(id, 1);
		}
		this.setState(change);
	}
	renderTransformation = () => {
		let transformationsComp = [];
		for (let i = 0; i < this.state.transformations.length; i++) {
			transformationsComp.push(<Transformations id={i} onRemove={this.onTransformationRemove} onEdit={this.onTransformation} transformation={this.state.transformations[i]}/>);
		}
		transformationsComp.push(<Transformations onRemove={this.onTransformationRemove} onEdit={this.onTransformation} transformation={{}}/>);
		return transformationsComp;
	}
	render() {
		return (
			<Modal show={this.props.show} onHide={this.onTransformationClose}>
        <Modal.Header>
          <Modal.Title>Add/Edit Transformation</Modal.Title>
        </Modal.Header>
       	<Modal.Body>
       		{this.renderTransformation()}
       	</Modal.Body>
       	<Modal.Footer>
       		<Button bsStyle="primary" onClick={this.onTransformationSave}>Save</Button>
          <Button onClick={this.onTransformationClose}>Close</Button>
        </Modal.Footer>
      </Modal>
		)
	}
}

TransformationModal.propTypes = {
	transformations: React.PropTypes.arrayOf(React.PropTypes.object),
	transformationid: React.PropTypes.number,
	onTransformationSave: React.PropTypes.func,
	onTransformationClose: React.PropTypes.func,
	show: React.PropTypes.boolean
}

export default TransformationModal;