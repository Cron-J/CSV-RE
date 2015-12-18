import * as types from 'constants/ActionTypes';
// import { createReducer } from 'utils';
import { createReducer } from 'redux-create-reducer';

const initialState = {
    mapId: null,
    edit: false,
    list: []
};
export default createReducer(initialState, {
  [types.HANDLESELECTEDMAP](state, action) {
    const { data } = action.payload;
    return {
      ...state,
      mapId: data.mapId,
      edit: data.mapId? true : false
    };
  },
  [types.SETPREVIEW](state, action) {
    return {
      ...state
    };
  },
  [types.SETHOME](state, action) {
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
