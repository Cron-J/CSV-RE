import * as types from 'constants/ActionTypes';
// import { createReducer } from 'utils';
import { createReducer } from 'redux-create-reducer';

const initialState = {
  attributeSectionId: '',
  // name
  name: '',
  // description
  description: '',
  // final data
  finaldata: [],
  // record count
  recordCount: '',
  // hide/show table
  showSearchResult: 'hidden',
  noFormat : '#,###.##',
  dFormat : 'MM/dd/yyyy',
  delimiter : ',',
  noHeader : true,
  customHeader:[],
  showModal: false,
  synonymsList: ''
};
export default createReducer(initialState, {
  [types.STOREPREVIEW](state, action) {
    const response = action.payload;
    return {
      ...state,
      delimiter : response[0],
      dFormat : response[1],
      noFormat : response[2],
      noHeader : response[3]
    }
    },
  [types.HANDLESEARCH](state, action) {
    const { data } = action.payload;
    return {
      data
    };
  },
  [types.RESETSEARCH](state) {
    return {
      ...state,
      attributeSectionId: '',
      name: '',
      description: '',
      finaldata: [],
      recordCount: '',
      showSearchResult: 'hidden',
      customHeader: []
    };
  },
  [types.HANDLESEARCHATTRIBUTE](state, action) {
    const { data } = action.payload;
    return {
      ...state,
      attributeSectionId: data.attributeSectionId,
      name: data.name,
      description: data.description
    };
  },
  [types.HANDLESEARCHSUCCESS](state, action) {
    const { response, data } = action.payload;
    return {
      ...state,
      attributeSectionId: data.attributeSectionId,
      name: data.name,
      description: data.description,
      finaldata: response,
      recordCount: 'Found ' + response.length + ' Entries',
      showSearchResult: response.length > 0 ? '' : 'hidden'
    };
  },
  [types.HANDLESEARCHFAIL](state) {
    return {
      ...state
    };
  },
  [types.GETSYNONYMSLISTSUCCESS](state, action) {
    const { data } = action.payload.response;
    return {
      ...state,
      synonymsList: action.payload.response.result
    };
  },
  [types.HANDLEDELETESUCCESS](state, action) {
    const { response, id } = action.payload;
    const finaldata = state.finaldata;
    for (let i = 0; i < finaldata.length; i++) {
      if (finaldata[i].id === id) {
        finaldata.splice(i, 1);
      }
    }
    return {
      ...state,
      finaldata: finaldata
    };
  },
  [types.HANDLEDELETEFAIL](state) {
    return {
      ...state
    };
  },
});
