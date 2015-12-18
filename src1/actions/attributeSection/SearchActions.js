
import * as types from 'constants/ActionTypes';
import api from 'utils/api/attributeSection';

export function handleChanges(data) {
  return { type: types.HANDLESEARCHATTRIBUTE, payload: { data } };
}

function _doSearch(data) {
  return {
    types: [types.HANDLESEARCH, types.HANDLESEARCHSUCCESS, types.HANDLESEARCHFAIL],
    payload: {
      response: api.searchAttributeSection(data).then(response => response),
      data
    }
  };
}

export function reset() {
  return {
    type: types.RESETSEARCH
  };
}

export function deleteId(id) {
  return {
    types: [types.HANDLEDELETE, types.HANDLEDELETESUCCESS, types.HANDLEDELETEFAIL],
    payload: {
      response: api.deleteAttributeSection(id).then(response => response),
      id
    }
  };
}

export function search(data) {
  return _doSearch(data);
}
