import * as types from 'constants/ActionTypes';

export function addAttributeSection(data) {
  return { type: types.ADD_ATTRIBUTESECTION, data };
}

export function deleteAttributeSection(id) {
  return { type: types.DELETE_ATTRIBUTESECTION, id };
}

export function editAttributeSection(id, data) {
  return { type: types.EDIT_ATTRIBUTESECTION, id, data };
}

export function findAttributeSection(data) {
  return { type: types.FIND_ATTRIBUTESECTION, data };
}

