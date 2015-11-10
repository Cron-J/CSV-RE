import * as types from 'constants/ActionTypes';
// import { createReducer } from 'utils';
import { createReducer } from 'redux-create-reducer';

const initialState = {
    mapId: null,
    next: false,
    edit: false,
    data: {},
    list: []
};
export default createReducer(initialState, {
  [types.HANDLESELECTEDMAP](state, action) {
    const { data } = action.payload;
    return {
      ...state,
      mapId: data.mapId,
      edit: data.mapId? true : false,
      next: false,
      data: ''
    };
  },
  [types.GETMAPINFOSUCCESS](state, action) {
    const { response } = action.payload;
    return {
      ...state,
      edit: false,
      next: true,
      data: response
    };
  },
  [types.SETPREVIEW](state, action) {
    return {
      ...state
    };
  },
  [types.LOADLISTSUCCESS](state, action) {
    const { response } = action.payload;
    return {
      ...state,
      list: response
    };
  }
});
