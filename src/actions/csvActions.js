import * as types from 'constants/ActionTypes';
import * as messageActions from '../common/messagecomponent/actions/messageActions';
import api from 'utils/api/csv';

export function changeView(view) {
  return { type: types.HANDLECHANGEVIEW, payload: { view } };
}

export function startFileupload(file) {
  return {
    type: types.HANDLECSVUPLOAD,
    payload: {
      file
    }
  };
}

export function handleMappingName(mappingName) {
  return {
    type: types.HANDLEMAPPINGNAME,
    payload: {
      mappingName
    }
  };
}
export function nextview() {
  return {
    type: types.HANDLECSVNEXTVIEW
  };
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

export function autoMapping() {
  return {
    type: types.HANDLEAUTOMAPPING
  };
}
export function handleSynonymsList() {
  return {
    types: [types.GETSYNONYMSLIST, types.GETSYNONYMSLISTSUCCESS, types.GETSYNONYMSLISTERROR],
    payload: {
      response: api.synonymsList().then(response => response)
    }
  };
}

export function attributeMapping() {
  return {
    type: types.HANDLEATTRIBUTEMAPPING
  };
}

export function defaultValueChange(defaultValue) {
  return {
    type: types.HANDLEDEFAULTVALUECHANGE,
    payload: {
      defaultValue
    }
  };
}
export function dataMapping() {
  return {
    type: types.HANDLECSVMAPPING
  };
}

export function addMapping() {
  return {
    type: types.HANDLECSVMAPADD
  }
}

export function removeMapping() {
  return {
    type: types.HANDLECSVMAPREMOVE
  }
}

export function removeMapData(rowid) {
  return {
    type: types.HANDLECSVMAPDATAREMOVE,
    payload: {
      rowid
    }
  }
}

export function updateMapTransformation(rowid, transition) {
  return {
    type: types.HANDLECSVMAPTRANSFORMATION,
    payload: {
      rowid,
      transition
    }
  }
}

export function previousview() {
  return {
    type: types.HANDLECSVPREVIOUSVIEW
  };
}

export function changeTableIndex(table) {
  return {
    type: types.HANDLECSVMAPTABLEINDEXCHANGE,
    payload: {
      table
    }
  };
}

export function uploadFile(file, uploaded) {
  if (uploaded) {
    return nextview();
  } else {
    return _uploadFile(file);
  }
}

export function loadTables() {
  return {
    type: types.HANDLECSVLOADTABLES
  };
}

export function changeColumn(column) {
  return {
    type: types.HANDLECSVMAPCOLUMNCHANGE,
    payload: {
      column
    }
  };
}

export function changeTable(table) {
  return {
    type: types.HANDLECSVMAPTABLECHANGE,
    payload: {
      table
    }
  };
}

export function changeProperty(property) {
  return {
    type: types.HANDLECSVMAPPROPERTYCHANGE,
    payload: {
      property
    }
  };
}

export function changeHeader(check) {
  return {
    type: types.HANDLECSVPREVIEWHEADERCHANGE,
    payload: {
      check
    }
  };
}

export function changeDelimiter(delimiter) {
  return {
    type: types.HANDLECSVPREVIEWDELIMITER,
    payload: {
      delimiter
    }
  };
}

export function changeNumber(numberformat) {
  return {
    type: types.HANDLECSVPREVIEWNUMBER,
    payload: {
      numberformat
    }
  };
}

export function changeDate(dateformat) {
  return {
    type: types.HANDLECSVPREVIEWDATE,
    payload: {
      dateformat
    }
  };
}

export function resetPreviewSetting() {
  return {
    type: types.HANDLEPREVIEWSETTING
  };
}

export function _uploadFile(file) {
  return {
    types: [types.DUMMY, types.HANDLECSVUPLOADSUCCESS, types.HANDLECSVUPLOADFAIL],
    payload: {
      response: api.uploadCSV(file).then(response => response),
      file
    },
    meta: {
      transition: () => ({
        onPending: () => ({
          func: () => {
            return messageActions.showmessages('uploading file to server..', 'info');
          }
        }),
        onSuccess: (response) =>({
          func: () => {
            return nextview();
          }
        }),
        onFail: (response) =>({
          func: () => {
            return messageActions.showmessages('Failed to upload file', 'error');
          }
        })
      })
    }
  };
}
