import * as types from '../constants/constants';
// import { createReducer } from 'utils';
import { createReducer } from 'redux-create-reducer';

const initialState = {
  // id of the message
  messageId: '',
  // message string
  message: '',
  // show or hide all messages
  showmessages: false,
  // message type
  messageType: 'info',
  // message title
  title: 'jCatalog Says',
  // to show confirmation dialogue
  confirmation: false,
  // confirmation on success call
  onSuccess: null,
  // confirmation on failure call
  onFailure: null,
  // close Button
  closeButton: false,
  // confirmation parameter
  confirmationParameters: {}
};

function formatErrorMessage(error) {
  if (typeof error.error !== 'undefined' && typeof error.error.errors !== 'undefined' && error.error.errors.length > 0 && typeof error.error.errors[0].message !== 'undefined') {
    return error.error.errors[0].message;
  } else if (typeof error.error !== 'undefined' && typeof error.error.message !== 'undefined') {
    return error.error.message;
  } else if (typeof error.message !== 'undefined') {
    return error.message;
  } else if (error.length > 0) {
    return error;
  }
  return 'Oops! somthing went wrong please check at your entries';
}

export default createReducer(initialState, {
  [types.HANDLEMESSAGESHOW](state, action) {
    const { message, type } = action.payload;
    const finalmessage = formatErrorMessage(message);
    return {
      ...state,
      showmessages: true,
      confirmation: false,
      message: finalmessage,
      messageType: type,
      messageId: type,
      title: 'jCatalog Says'
    };
  },
  [types.HANDLEMESSAGEHIDE](state) {
    return {
      ...state,
      showmessages: false
    };
  },
  [types.HANDLEMESSAGECONFIRMATION](state, action) {
    const { title, message, onSuccess, params, onFailure } = action.payload;
    return {
      ...state,
      confirmation: true,
      showmessages: false,
      title: title,
      message: message,
      onSuccess: onSuccess,
      confirmationParameters: params,
      onFailure: onFailure !== null && typeof onFailure !== 'undefined' ? onFailure : null
    };
  },
  [types.HANDLEMESSAGECLEAR](state) {
    return {
      ...state,
      message: '',
      showmessages: false,
      messageType: 'info',
      title: 'jCatalog Says',
      confirmation: false,
      onSuccess: null,
      onFailure: null,
      closeButton: false,
      confirmationParameters: {}
    };
  }
});
