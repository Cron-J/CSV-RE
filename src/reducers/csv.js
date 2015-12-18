import * as types from 'constants/ActionTypes';
import { createReducer } from 'redux-create-reducer';

const initialState = {
  upload: {
    fileFormats: ['.csv', '.txt'],
    name: '',
    type: '',
    size: 0,
    error: ''
  },
  block: ['next', 'prev'],
  preview: {},
  map: {},
  importer: {},
  currentview: 'upload'
};
export default createReducer(initialState, {
  [types.HANDLECHANGEVIEW](state, action) {
    const { view } = action.payload;
    return {
      ...state,
      currentview: view
    };
  },
  [types.HANDLECSVUPLOAD] (state, action) {
    return {
      ...state,
      block: ['prev']
    };
  },
  [types.HANDLECSVUPLOADSUCCESS] (state, action) {
    return {
      ...state,
      block: ['prev']
    };
  },
  [types.HANDLECSVUPLOADFAIL] (state, action) {
    return {
      ...state,
      block: ['next', 'prev']
    };
  }
});
