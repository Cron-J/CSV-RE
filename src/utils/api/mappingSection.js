import request from 'request-promise';

const utils = {

  /**
  * @param getAttributeList provides List of attributes
  * 
  * @calls action on success or failure
  */
  getAttributeList: () => {
    return request({
      url: 'http://localhost:4000/api/csv/',
      method: 'GET',
      json: true
    });
  },

  saveMappedData: (data) => {
    console.log("mapping data to save", data);
    return request({
      url: "http://localhost:4000/api/csv",
      method: 'POST',
      json: true,
      body: data
    });
  }

};

export default utils;
