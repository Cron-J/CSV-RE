import * as types from 'constants/ActionTypes';
import { createReducer } from 'redux-create-reducer';

const initialState = {
  upload: {
    fileFormats: ['.csv', '.txt'],
    fileinfo: {
      name: '',
      type: '',
      size: 0
    },
    uploaded: false,
    error: ''
  },
  block: ['next', 'prev'],
  preview: {
    resultdata: {},
    originaldata: {},
    delimiter: ',',
    dateFormat: 'MM/dd/yyyy',
    numberFormat: '#,###.##',
    noHeader: false,
    setters: {
      dateformat: [
        {value: 'dd-MM-yyyy', label: 'dd-MM-yyyy'}, 
        {value: 'MM/dd/yyyy', label: 'MM/dd/yyyy'}
      ],
      numberformat: [
        {value: '#,###.##', label: '#,###.##'},
        {value: '#.##', label: '#.##'},
        {value: '#,##', label: '#,##'}
      ],
      delimiterformat: [
        {value: ',', label: 'Comma(,)'},
        {value: ';', label: 'Semicolumn(;)'},
        {value: '|', label: 'Pipe(|)'}
      ]
    }
  },
  map: {},
  importer: {},
  currentview: 'upload',
  order: ['upload', 'preview', 'mapping', 'import']
};

function blockers(view, data) {
  switch (view) {
  case 'upload':
    if (data.uploaded === true || data.fileinfo.name.length > 0) {
      return ['prev'];
    }
    return ['prev', 'next'];
    break;
  default:
    return [];
    break;
  }
}

function isSuccess(currentview, view, state) {
  switch (view) {
    case 'upload':
      return true;
      break;
    case 'preview':
      if (state.upload.uploaded === true || state.order.indexOf(currentview) > state.order.indexOf(view)) {
        return true;
      }
      return false;
      break;
    case 'mapping':
      if (state.preview.id || state.order.indexOf(currentview) > state.order.indexOf(view)) {
        return true;
      }
      return false;
      break;
    default:
      return false;
      break;
  }
}

function formatPreviewData(responsedata, delimiter) {
  const dataarray = [];
  const headers = responsedata['headers'].split(delimiter);
  for (let key in responsedata) {
    if (key !== 'headers' && key !== 'fileName') {
      const object = {};
      let keyCount = 0;
      const data  = responsedata[key].split(delimiter);
      for (let i = 0; i < data.length; i++) {
        object[headers[keyCount]] = data[i];
        keyCount++;  
      }
      dataarray.push(object);
    }
  }
  return {headers: headers, data: dataarray};
}

function formatPreviewHeader(previewdata, check) {
  const newpreviewdata = JSON.parse(JSON.stringify(previewdata));
  let headers = [];
  const newdata = [];

  if (check) {
    const headerdataobject = {};

    for (let i = 0; i < newpreviewdata.headers.length; i++) {
      const columnname = 'Column' + (i + 1);
      headers.push(columnname);
      headerdataobject[columnname] = newpreviewdata.headers[i];
    }
    newdata.push(headerdataobject);
    for (let i = 0; i < newpreviewdata.data.length; i++) {
      const newObject = {};
      let keyCount = 0;
      for (let key in newpreviewdata.data[i]) {
        if (key) {
          newObject[headers[keyCount]] = newpreviewdata.data[i][key];
          keyCount++;
        }
      }
      newdata.push(newObject);
    }
    newpreviewdata.headers = headers;
    newpreviewdata.data = newdata;
  } else {
    headers = newpreviewdata.headers;

    for (let i = 0; i < newpreviewdata.data.length; i++) {
      const newObject = {};
      let keyCount = 0;
      for (let key in newpreviewdata.data[i]) {
        if (key) {
          newObject[headers[keyCount]] = newpreviewdata.data[i][key];
          keyCount++;
        }
      }
      newdata.push(newObject);
    }
    newpreviewdata.headers = headers;
    newpreviewdata.data = newdata;
  }
  return newpreviewdata;
}

function formatPreview (data, delimiter, headercheck) {
  const previewdata = formatPreviewData(data, delimiter);
  return formatPreviewHeader(previewdata, headercheck);
}

export default createReducer(initialState, {
  [types.HANDLECHANGEVIEW](state, action) {
    let { view } = action.payload;
    if (!isSuccess(state.currentview, view, state)){
      view = state.currentview;
    }
    return {
      ...state,
      currentview: view,
      block: blockers(view, state.upload)
    };
  },
  [types.HANDLECSVUPLOAD] (state, action) {
    const { file } = action.payload;
    const upload = state.upload;
    upload.fileinfo = file;
    return {
      ...state,
      block: blockers(state.currentview, upload),
      upload: upload
    };
  },
  [types.HANDLECSVUPLOADSUCCESS] (state, action) {
    const {response} = action.payload;
    const preview = state.preview;
    const upload = state.upload;
    const index = state.order.indexOf(state.currentview);
    let view = state.currentview;
    preview.originaldata = response.body;
    preview.resultdata = formatPreview(response.body, preview.delimiter, preview.noHeader);
    upload.uploaded = true;
    if (index > -1) {
      view = state.order[index+1];
    }
    return {
      ...state,
      preview: preview,
      currentview: view,
      block: blockers(view, state.preview),
      upload: upload
    };
  },
  [types.HANDLECSVUPLOADFAIL] (state, action) {
    return {
      ...state,
      block: ['next', 'prev']
    };
  },
  [types.HANDLECSVNEXTVIEW] (state, action) {
    const index = state.order.indexOf(state.currentview);
    let view = state.currentview;
    if (index > -1) {
      view = state.order[index+1];
    }
    return {
      ...state,
      currentview: view,
      block: blockers(view, state[view])
    };
  },
  [types.HANDLECSVPREVIOUSVIEW] (state, action) {
    const index = state.order.indexOf(state.currentview);
    let view = state.currentview;
    if (index > -1) {
      view = state.order[index-1];
    }
    return {
      ...state,
      currentview: view,
      block: blockers(view, state[view])
    };
  },
  [types.HANDLECSVPREVIEWHEADERCHANGE] (state, action) {
    const {check} = action.payload;
    const preview = state.preview;
    preview.resultdata = formatPreview(preview.originaldata, preview.delimiter, check);
    preview.noHeader = check;
    return {
      ...state,
      preview: preview
    }
  },
  [types.HANDLECSVPREVIEWDELIMITER] (state, action) {
    const {delimiter} = action.payload;
    const preview = state.preview;
    preview.delimiter = delimiter;
    preview.resultdata = formatPreview(preview.originaldata, delimiter, preview.noHeader);
    return {
      ...state,
      preview: preview
    }
  }
});