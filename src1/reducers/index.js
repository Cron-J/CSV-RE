import { combineReducers } from 'redux';
import attributesectionsearch from './attributeSectionSearch';
import mappingsection from './mappingSection';
import homesection from './homeSection';
import importsection from './importSection';
import editmappingsection from './editmappingsection';
import selectmapping from './selectMapping';
import message from '../common/messageComponent/reducers/message';
export default combineReducers({
  attributesectionsearch,
  homesection,
  mappingsection,
  importsection,
  editmappingsection,
  selectmapping,
  message
});
