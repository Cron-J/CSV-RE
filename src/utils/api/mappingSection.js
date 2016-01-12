import request from 'request-promise';

const utils = {

  /**
  * @param getAttributeList provides List of attributes
  * 
  * @calls action on success or failure
  */
  getAttributeList: () => {
    return request({
      url: SERVER_ADDR + 'api/csv/',
      method: 'GET',
      json: true
    });
  },

  saveMappedData: (data) => {
    return request({
      url: "http://localhost:4000/api/csv",
      method: 'POST',
      json: true,
      body: data
    });
  },

  getCSVData: (id, tenantId) => {
    return request({
      url: "http://localhost:4000/api/csv/getCSVdata/" + id + '/' + tenantId,
      method: 'GET',
      json: true
    });
  },
  
  getMapping: (id) => {
    return request({
      url: SERVER_ADDR + 'api/csv/getMapping/' + id,
      method: 'GET',
      json: true
    });
  },

  updateMapping: (data) => {
    return request({
      url: SERVER_ADDR + 'api/csv/updateMapping/' + data.id + '/' + data.tenantId,
      method: 'PUT',
      json: true,
      body: data
    })
  },

  synonymsList: () => {
    return request({
      url: SERVER_ADDR + 'api/csv/getSynonyms',
      method: 'GET',
      json: true
    })
  }

};

export default utils;
