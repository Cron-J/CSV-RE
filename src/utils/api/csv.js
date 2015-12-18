import request from 'request-promise';

const utils = {
  test: () => {
    return request({
      url: 'http://localhost:4000/api/csv/uploadCSV',
      method: 'POST',
      body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
    });
  },
  /**
  * @param upload csv file
  *
  * @calls action on success or failure
  */
  getAttributeList: (file) => {
    return request({
      url: 'http://localhost:4000/api/csv/uploadCSV',
      method: 'POST',

    });
  }
}
export default utils;
