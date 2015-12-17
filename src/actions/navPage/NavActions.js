import * as types from 'constants/ActionTypes';
import * as messageActions from '../../common/messageComponent/actions/messageActions';

export function redirectNext(data) {
  return  {
    type: types.RESETSEARCH,
    meta: {
      transition: () => ({
        path: '/next'
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


