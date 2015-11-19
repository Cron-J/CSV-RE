import React from 'react';
import * as MessageAction from '../actions/messageActions';
import NotificationSystem from 'react-notification-system';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Message extends React.Component {
  constructor(props) {
    super(props);
    const { message, dispatch } = this.props;
    this.state = message;
    this.actions = bindActionCreators(MessageAction, dispatch);
    this._notificationSystem = null;
    this.style = {
      Containers: {
        DefaultStyle: {
          width: '60%'
        },
        tc: {
          left: '20%',
          marginLeft: '20%'
        }
      }
    };
  }
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    if (!this.props.message.confirmation) {
      if (this.props.message.showmessages) {
        this._addNotification();
      } else {
        this._removeNotification();
      }
    } else {
      this._removeNotification();
    }
  }
  _onConfirmation = () => {
    if (this.props.message.onSuccess !== null) {
      this.actions.execute(this.props.message.onSuccess(this.props.message.confirmationParameters));
    } else {
      this._close();
    }
  }
  _onConfirmationCancel = () => {
    if (this.props.message.onFailure !== null) {
      this.actions.execute(this.props.message.onFailure());
    }
    this._close();
  }
  _addNotification = () => {
    this._notificationSystem.addNotification({
      message: this.props.message.message,
      title: this.props.message.title,
      position: 'tc',
      uid: this.props.message.messageType,
      autoDismiss: 3,
      onRemove: this._hidemessage,
      dismissible: true,
      level: this.props.message.messageType
    });
  }
  _removeNotification = () => {
    this._notificationSystem.removeNotification(this.props.message.messageType);
  }
  _close = () => {
    this.actions.clear();
  }
  _hidemessage = () => {
    this.actions.hidemessages();
  }
  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" style={this.style} />
        <Modal show={this.props.message.confirmation}>
          <Modal.Header>
            <Modal.Title>{this.props.message.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.message.message}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this._onConfirmation}>Yes</Button>
            <Button onClick={this._onConfirmationCancel}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state;
  return {
    message
  };
}

Message.propTypes = {
  message: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Message);
