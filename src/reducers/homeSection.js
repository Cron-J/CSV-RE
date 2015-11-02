import * as types from 'constants/ActionTypes';
// import { createReducer } from 'utils';
import { createReducer } from 'redux-create-reducer';

const initialState = {
  fileSelected: ''
};
export default createReducer(initialState, {
  [types.HANDLESELECTEDFILE](state, action) {
    const { data } = action.payload;
    return {
      ...state,
      fileSelected: data
    };
  }
});
