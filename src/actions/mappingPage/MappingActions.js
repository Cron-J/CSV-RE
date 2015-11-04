import * as types from 'constants/ActionTypes';
import api from 'utils/api/mappingSection';

export function handleChanges(data) {
  console.log('data in action',data);
  return { type: types.HANDLEATTRIBUTELISTCHANGES, payload: { data } };
}

export function handleMappedChnages(data) {
  return {type: types.HANDLEMAPPEDCHNAGES, payload: { data }};
}

export function saveMappedData(data) {
  console.log("mapped data 1", data);
  return {
    types: [types.SAVEMAPPEDDATA, types.SAVEMAPPEDDATASUCCESS, types.SAVEMAPPEDDATAERROR],
    payload: {
      response: api.saveMappedData(data).then(response => response)
    }
  };
}
export function mappinginfo(data) {
  return {
    types: [types.HANDLEMAPPEDINFO, types.HANDLEMAPPEDINFOSUCCESS, types.HANDLEMAPPEDINFOERROR],
    payload: {
      response: api.getMappingList().then(response => response)
    }
  };
}
export function attributeList() {
  return {
    types: [types.HANDLEATTRIBUTELIST, types.HANDLEATTRIBUTELISTSUCCESS, types.HANDLEATTRIBUTELISTERROR],
    payload: {
      response: api.getAttributeList().then(response => response)
    }
  };
}

export function selectedDefaultValue(data) {
  return { type: types.HANDLESELECTEDDEFAULTVALUE, payload: { data } };
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
export function redirectImport(data) {
  return  {
    type: types.RESETSEARCH,
    meta: {
      transition: () => ({
        path: '/import'
      })
    }
  };
}


