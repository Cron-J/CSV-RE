import request from 'request-promise';

const utils = {

  /**
  * @param getAttributeList provides List of attributes
  * 
  * @calls action on success or failure
  */
  getMappingList: () => {
    return request({
      url: 'http://localhost:4000/api/csv/getMappingList',
      method: 'GET',
      json: true
    });
  },
  getMapping: (id) => {
    return request({
      url: 'http://localhost:4000/api/csv/getMapping/' + id,
      method: 'GET',
      json: true
    });
  }

};

export default utils;
