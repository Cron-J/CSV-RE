import { combineReducers } from 'redux';
import attributesectionsearch from './attributeSectionSearch';
import mappingsection from './mappingSection';
import homesection from './homeSection';

export default combineReducers({
  attributesectionsearch,
  homesection,
  mappingsection
});
