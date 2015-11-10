import * as types from 'constants/ActionTypes';
import api from 'utils/api/setMap';

export function handleChanges(data) {
  return { type: types.HANDLESELECTEDMAP, payload: { data } };
}

export function loadMappingList() {
  return  {
    types: [types.LOADLIST, types.LOADLISTSUCCESS, types.LOADLISTFAIL],
    payload: {
      response: api.getMappingList().then(response => response)
    }
  };
}

export function getMapInfo(id) {
  return  {
    types: [types.GETMAPINFO, types.GETMAPINFOSUCCESS, types.GETMAPINFOFAIL],
    payload: {
      response: api.getMapping(id).then(response => response),
      id
    }
  };
}
export function redirectPreview(id) {
  return  {
    type: types.SETPREVIEW,
    meta: {
      transition: () => ({
          path: '/preview',
      })
    }
  };
}
