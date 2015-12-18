import React from 'react';
import { Button } from 'react-bootstrap';
// import messageActions from 'actions/message/MessageActions';

export default class EditDeleteForTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _onEditAction() {
    this.props.editAction(this.props.id);
  }
  _onDeleteAction() {
    // messageActions.confirmationmessage('Confirm Delete', 'Are You Sure ! You want to delete the record of id ' + this.props.id, this._onDeleteConfirmation.bind(this), null);
    // now it directly delete instead needs to integrate messaging component here to redux
    this.props.deleteAction(this.props.id);
  }
  _onDeleteConfirmation() {
    this.props.deleteAction(this.props.id);
  }
  render() {
    return (
      <div>
        <Button bsSize="xsmall" bsStyle="primary" onClick={this._onEditAction.bind(this)}>Edit</Button>&nbsp;
        <Button bsSize="xsmall" bsStyle="primary" onClick={this._onDeleteAction.bind(this)}>Delete</Button>
      </div>
    );
  }
}

EditDeleteForTable.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  editAction: React.PropTypes.func,
  deleteAction: React.PropTypes.func
};
