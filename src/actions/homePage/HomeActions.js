import * as types from 'constants/ActionTypes';
import api from 'utils/api/attributeSection';

export function handleChanges(data) {
  return { type: types.HANDLESEARCHATTRIBUTE, payload: data };
}

export function selectedFile(data) {
  return { type: types.HANDLESELECTEDFILE, payload: data };
}

export function redirectPreview(data) {
  return  {
    type: types.RESETSEARCH,
    meta: {
      transition: () => ({
        path: '/preview'
      })
    }
  };
}


