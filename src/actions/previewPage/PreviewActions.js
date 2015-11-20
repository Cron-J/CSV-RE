import * as types from 'constants/ActionTypes';
import api from 'utils/api/attributeSection';
import {handleChanges as mappingSectionhandlechanges}  from '../mappingPage/MappingActions';

export function handleChanges(data) {
  return { type: types.HANDLESEARCHATTRIBUTE, payload: { data } };
}

export function handleCustomHeader(data) {
  return { type: types.STOREPREVIEW, payload: { data } };
}

export function handleResetMappingData(data,mappingsectionobject){
  return {
    type: types.STOREPREVIEW,
    payload: {data},
    meta: {
      transition: () =>({
        func: () =>{
         return mappingSectionhandlechanges(mappingsectionobject)
        }
      })
    }
  };
}

export function previewFile() {
  return {
    type: types.RESETSEARCH
  };
}

export function redirectMapping(data) {
  return {
    type: types.STOREPREVIEW,
    payload : data,
    meta: {
      transition: () => ({
        path: '/mapping'
      })
    }
  };
}

export function redirectPreview(data) {
  return  {
    type: types.RESETSEARCH,
    meta: {
      transition: () => ({
        path: '/preview'
      })
    }
  };
}

export function redirectHome(data) {
  return  {
    type: types.STOREPREVIEW,
    payload : data,
    meta: {
      transition: () => ({
        path: '/'
      })
    }
  };
}


