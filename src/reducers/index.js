import { combineReducers } from 'redux';
import message from '../common/messageComponent/reducers/message';
import csv from './csv';
export default combineReducers({
  csv,
  message
});
