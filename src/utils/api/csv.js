import request from 'request-promise';
import promise from 'promise';
import superagent from 'superagent';
import superagentpromise from 'superagent-promise';
const request1 = superagentpromise(superagent, promise);

const utils = {
  test: () => {
    return request({
      url: SERVER_ADDR + 'api/csv/uploadCSV',
      method: 'POST',
      body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
    });
  },
  /**
  * @param upload csv file
  *
  * @calls action on success or failure
  */
  uploadCSV: (file) => {
    let req = request1.post(SERVER_ADDR + 'api/csv/uploadCSV');
    req.attach(file.name, file);
    return req.end();
  },
  synonymsList: () => {
    return request({
      url: SERVER_ADDR + 'api/csv/getSynonyms',
      method: 'GET',
      json: true
    })
  },
  saveMappedData: (data) => {
    return request({
      url: "http://localhost:4000/api/csv",
      method: 'POST',
      json: true,
      body: data
    });
  },
  getMappingList: () => {
    return request({
      url: SERVER_ADDR + 'api/csv/getMappingList',
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
  updateMapping: (data, id) => {
    return request({
      url: SERVER_ADDR + 'api/csv/updateMapping/' + id + '/' + 1,
      method: 'PUT',
      json: true,
      body: data
    })
  }
}
export default utils;
