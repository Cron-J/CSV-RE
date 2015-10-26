import * as types from 'constants/ActionTypes';
import api from 'utils/api/attributeSection';

export function handleChanges(data) {
  return { type: types.HANDLESEARCHATTRIBUTE, payload: { data } };
}

export function handleCustomHeader(data) {
  return { type: types.HANDLECUSTOMHEADER, payload: { data } };
}

export function previewFile() {
  return {
    type: types.RESETSEARCH
  };
}

export function redirectMapping() {
  return {
    type: types.RESETSEARCH,
    meta: {
      transition: () => ({
        path: '/mapping',
      })
    }
  };
}

export function redirectPreview(data) {
  return  {
    type: types.RESETSEARCH,
    meta: {
      transition: () => ({
        path: '/preview',
      })
    }
  };
}

export function redirectHome(data) {
  return  {
    type: types.RESETSEARCH,
    meta: {
      transition: () => ({
        path: '/',
      })
    }
  };
}


