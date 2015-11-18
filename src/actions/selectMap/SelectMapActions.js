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

export function editMapping(id) {
  return  {
    type: types.SETPREVIEW,
    meta: {
      transition: () => ({
          path: '/mapping/edit/' + id,
      })
    }
  };
}

export function redirectToHome(id) {
  return  {
    type: types.SETHOME,
    meta: {
      transition: () => ({
          path: '/',
      })
    }
  };
}
