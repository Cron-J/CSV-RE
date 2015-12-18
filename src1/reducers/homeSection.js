import * as types from 'constants/ActionTypes';
// import { createReducer } from 'utils';
import { createReducer } from 'redux-create-reducer';

const initialState = {
    fileSelected: undefined,
    filedata : {},
    showNextButton : undefined,
    properties : {}
};
export default createReducer(initialState, {
    [types.HANDLESELECTEDFILE](state, action) {
        console.log('handle selected file reducer',action.payload);
        const data = action.payload.response;
        this.isFile = function(data){
            return data ? true : false;
        };
        return {
        ...state,
            properties : action.payload.properties,
            fileSelected : this.isFile(data),
            filedata : data,
            showNextButton : this.isFile(data)
        }
    },
    [types.SHOWCSVERRMSG](state,action) {
        return {
            ...state
        }
    }
});
