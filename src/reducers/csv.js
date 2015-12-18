import * as types from 'constants/ActionTypes';
import { createReducer } from 'redux-create-reducer';

const initialState = {
  upload: {
    fileFormats: ['.csv', '.txt'],
    fileinfo: {
      name: '',
      type: '',
      size: 0
    },
    uploaded: false,
    error: ''
  },
  block: ['next', 'prev'],
  preview: {},
  map: {},
  importer: {},
  currentview: 'upload',
  order: ['upload', 'preview', 'mapping', 'import']
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
    const { file } = action.payload;
    const upload = state.upload;
    upload.fileinfo = file;
    return {
      ...state,
      block: ['prev'],
      upload: upload
    };
  },
  [types.HANDLECSVUPLOADSUCCESS] (state, action) {
    const upload = state.upload;
    upload.uploaded = true;
    return {
      ...state,
      currentview: 'preview',
      block: [],
      upload: upload
    };
  },
  [types.HANDLECSVUPLOADFAIL] (state, action) {
    return {
      ...state,
      block: ['next', 'prev']
    };
  },
  [types.HANDLECSVNEXTVIEW] (state, action) {
    const index = state.order.indexOf(state.currentview);
    const view = state.order[index+1];
    return {
      ...state,
      currentview: view
    };
  },
  [types.HANDLECSVPREVIOUSVIEW] (state, action) {
    const index = state.order.indexOf(state.currentview);
    const view = state.order[index-1];
    return {
      ...state,
      currentview: view
    };
  }
});
