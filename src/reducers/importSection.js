import * as types from 'constants/ActionTypes';
// import { createReducer } from 'utils';
import { createReducer } from 'redux-create-reducer';

const initialState = {
 	mappedJson:[
 					{
 						"product":"pen",
 						"ProductId":100,
 						"price":100
 					},
 					{
 						"product":"pencile",
 						"ProductId":101,
 						"price":101
 					},
 					{
 						"product":"ink",
 						"ProductId":102,
 						"price":102
 					}

 			]
};
