import * as types from 'constants/ActionTypes';
import api from 'utils/api/mappingSection';
import * as messageActions from '../../common/messageComponent/actions/messageActions';

export function handleChanges(data) {
  return { type: types.HANDLEATTRIBUTELISTCHANGES, payload: { data } };
}

export function removeInList(data){
  return { type: types.HANDLETABLEINLIST, payload: { data }};
}

export function handleMappedChnages(data) {
  return {type: types.HANDLEMAPPEDCHNAGES, payload: { data }};
}

export function saveMappedData(data) {
  if(data.id) {
    return updateMappedData(data);
  } else {
    return createMappedData(data);
  }
}

function createMappedData(data) {
  return {
    types: [types.SAVEMAPPEDDATA, types.SAVEMAPPEDDATASUCCESS, types.SAVEMAPPEDDATAERROR],
    payload: {
      response: api.saveMappedData(data).then(response => response)
    }
  };
}
function updateMappedData(data) {
  return {
    types: [types.UPDATEMAPPING, types.UPDATEMAPPINGSUCCESS, types.UPDATEMAPPINGFAIL],
    payload: {
      response: api.updateMapping(data).then(response => response),
      data
    },
    meta: {
      transition: () => ({
        onSuccess: (response) =>({
          func: () =>{
            return messageActions.showmessages('sucessfully mapping has updated', 'success');
          }
        }),
        onFail: (error) =>({
          func: () =>{
            return messageActions.showmessages(error, 'error');
          }
        })
      })
    }
  };
}

export function redirectEdit() {
  return {
    type: types.HANDLEREDIRECT,
    meta: {
      transition: () => ({
          path: '/editmapping'
      })
    }
  }
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

export function showAddMappingMessage(error){
  return {
    type: types.SHOWMESSAGE,
    meta: {
      transition: () =>({
        func: () =>{
          return messageActions.showmessages(error, 'error');
        }
      })
    }
  }
}


export function redirectPreview(data) {
  return  {
    type: types.PERSISTMAPPINGDATA,
    payload : {
      response : data
    },
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
export function getCSVfileData(id, tenantId) {
  return  {
    types: [types.GETCSVDATA, types.GETCSVDATASUCCESS, types.GETCSVDATAFAIL],
    payload: {
      response: api.getCSVData(id, tenantId).then(response => response),
      id, tenantId
    }
  };
}

export function getMapInfo(id) {
  return  {
    types: [types.GETMAPINFO, types.GETMAPINFOSUCCESS, types.GETMAPINFOFAIL],
    payload: {
      response: api.getMapping(id).then(response => response),
      id
    }
  };
}



