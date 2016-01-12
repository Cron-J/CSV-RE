import request from 'request-promise';

const utils = {

  /**
  * @param searchAttribute provides a search attributes
  *      {
  *        attributeSectionId - String
  *        name  - String
  *        description - String
  *      }
  * @calls action on success or failure
  */
  searchAttributeSection: (searchAttributes) => {
    return request({
      url: SERVER_ADDR + 'api/attributeSections/search',
      method: 'POST',
      body: searchAttributes,
      json: true
    });
  },
  /**
   * @param id - number
   *
   * @call removeSearchData to update the state
   */
  deleteAttributeSection: (id) => {
    return request({
      url: SERVER_ADDR + 'api/attributeSections/' + id,
      method: 'DELETE'
    });
  }
};

export default utils;
