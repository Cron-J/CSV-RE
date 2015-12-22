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
      file
    }
  };
}

export function nextview() {
  return {
    type: types.HANDLECSVNEXTVIEW
  };
}

export function previousview() {
  return {
    type: types.HANDLECSVPREVIOUSVIEW
  };
}

export function uploadFile(file, uploaded) {
  if (uploaded) {
    return nextview();
  } else {
    return _uploadFile(file);
  }
}

export function changeHeader(check) {
  return {
    type: types.HANDLECSVPREVIEWHEADERCHANGE,
    payload: {
      check
    }
  };
}

export function changeDelimiter(delimiter) {
  return {
    type: types.HANDLECSVPREVIEWDELIMITER,
    payload: {
      delimiter
    }
  };
}

export function changeNumber(numberformat) {
  return {
    type: types.HANDLECSVPREVIEWNUMBER,
    payload: {
      numberformat
    }
  };
}

export function changeDate(dateformat) {
  return {
    type: types.HANDLECSVPREVIEWDATE,
    payload: {
      dateformat
    }
  };
}

export function resetPreviewSetting() {
  console.log('---action---');
  return {
    type: types.HANDLEPREVIEWSETTING
  };
}

export function _uploadFile(file) {
  return {
    types: [types.DUMMY, types.HANDLECSVUPLOADSUCCESS, types.HANDLECSVUPLOADFAIL],
    payload: {
      response: api.uploadCSV(file).then(response => response),
      file
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
            return nextview();
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
