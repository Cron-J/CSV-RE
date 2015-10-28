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
  fileName: 'example.csv1443526192857',
  headers: 'productId,product,quantity,price,date',
  rowOne: 'P1,pen,18880,599990,12-05-12',
  rowTwo: 'P2,pencil, 5, 15, 12-10-10',
  customHeader:[]
};
export default createReducer(initialState, {
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
      fileName: 'example.csv1443526192857',
      headers: 'productId,product,quantity,price,date',
      rowOne: 'P1,pen,100000,50,09/09/2009',
      rowTwo: 'P2,pencil, 555555, 15,09/09/2009',
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
  [types.HANDLECUSTOMHEADER](state, action) {
    const { data } = action.payload;
    console.log("=====Custom Header=====",data.customHeader);
    return {
      ...state,
      customHeader: data.customHeader
    };
  }
});
