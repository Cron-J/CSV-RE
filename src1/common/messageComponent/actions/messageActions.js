import * as types from '../constants/constants';

export function showmessages(message, type) {
  return {
    type: types.HANDLEMESSAGESHOW,
    payload: {
      message,
      type
    }

  };
}

export function execute(func) {
  return func;
}

export function hidemessages() {
  return {
    type: types.HANDLEMESSAGEHIDE
  };
}

export function confirmationmessage(title, message, params, onSuccess, onFailure) {
  return {
    type: types.HANDLEMESSAGECONFIRMATION,
    payload: {
      title,
      message,
      onSuccess,
      onFailure,
      params
    }
  };
}

export function clear() {
  return {
    type: types.HANDLEMESSAGECLEAR
  };
}
