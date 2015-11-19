import * as types from 'constants/ActionTypes';
import api from 'utils/api/attributeSection';
import * as messageActions from '../../common/messageComponent/actions/messageActions';

export function handleChanges(data) {
  return { type: types.HANDLESEARCHATTRIBUTE, payload: data };
}

export function selectedFile(data) {
  return { type: types.HANDLESELECTEDFILE, payload: data };
}

export function showMessage(error,data){
  return {
    type: types.SHOWCSVERRMSG,
    meta: {
      transition: () => ({
        func: () =>{
          return messageActions.showmessages(error, 'error');
        }
      })
    }
  }
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


