import * as types from 'constants/ActionTypes';
import * as messageActions from '../common/messagecomponent/actions/messageActions';
import api from 'utils/api/csv';

export function changeView(view) {
  return { type: types.HANDLECHANGEVIEW, payload: { view } };
}

export function startFileupload(file) {
  return {
    type: types.HANDLECSVUPLOAD,
    payload: {
      response: api.uploadCSV(file).then(response => response),
    }
  };
}

export function uploadFile(file) {
  return {
    types: [types.DUMMY, types.HANDLECSVUPLOADSUCCESS, types.HANDLECSVUPLOADFAIL],
    payload: {
      response: api.uploadCSV(data).then(response => response),
      data
    },
    meta: {
      transition: () => ({
        onPending: () => ({
          func: () => {
            return messageActions.showmessages('uploading file to server..', 'info');
          }
        }),
        onSuccess: (response) =>({
          func: () => {
            return messageActions.showmessages('File uploading success', 'success');
          }
        }),
        onFail: (response) =>({
          func: () => {
            return messageActions.showmessages('Failed to upload file', 'error');
          }
        })
      })
    }
  };
}
