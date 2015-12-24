import * as types from 'constants/ActionTypes';
import { createReducer } from 'redux-create-reducer';
import moment from 'moment';
import tables from '../utils/appfunc/tablelist';
import _ from 'underscore';

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
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '#,###.##',
    noHeader: true,
    setters: {
      dateformat: [
        {value: 'DD-MM-YYYY', label: 'DD-MM-YYYY'}, 
        {value: 'MM/DD/YYYY', label: 'MM/DD/YYYY'}
      ],
      numberformat: [
        {value: '#,###.##', label: '#,###.##'},
        {value: '#.##', label: '#.##'},
        {value: '#,##', label: '#,##'},
        {value: '#.###,##', label: '#.###,##'}
      ],
      delimiterformat: [
        {value: ',', label: 'Comma(,)'},
        {value: ';', label: 'Semicolumn(;)'},
        {value: '|', label: 'Pipe(|)'}
      ]
    }
  },
  mapping: {
    mappingName: '',
    childTables: [],
    remove: false,
    columns: [],
    tables: [],
    properties: [],
    tableObject: '',
    currentColumn: '',
    currentTable: '',
    currentProperty: '',
    defaultValue: '',
    mappingData: [],
    mappedColumn: [],
    mappedProperty: [],
    requiredProperty: [],
  },
  synonymsList: [],
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
      if (state.preview.resultdata.data || state.order.indexOf(currentview) > state.order.indexOf(view)) {
        return true;
      }
      return false;
      break;
    default:
      return false;
      break;
  }
}

function formatDate(data, fromdateformat, todateformat) {
  const momentdate = moment(data, fromdateformat);
  if (momentdate.format(fromdateformat) === data) {
    return momentdate.format(todateformat);
  }
  return data;
}

function formatNumber(data, numberformat) {
  switch(numberformat) {
  case '#,##':
    if(data.indexOf(',')<0) {
      data = data + ',00';
    }
    break;
  case '#.##':
    if(numberformat.indexOf('.')<0)
      data = data + '.00';
    break;
  case '#,###.##':
    if (data.toString().length > 5) {
      data = (data*100 / 100);
      var str = data.toString().split('.');  
      if (str[0].length >= 4) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 4) {
          str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      data = str.join('.');
      if(data.indexOf('.') < 0) {
          data = data + '.00';
      }
    }
    break;
  case '#.###,##':
    let str = data.toString();
    if (str.length > 5) {
      str = data.slice(0, -5) + '.' + data.slice(-3) + '.' + data.slice(-3); 
      data = str;
      if(data.indexOf(',') < 0) {
        data = data + ',00';
      }
    }
    break;
  default:
    break;
  }
  return data;
}

function formatPreviewData(responsedata, delimiter, numberformat, fromdateformat, todateformat) {
  const dataarray = [];
  const headers = responsedata['headers'].split(delimiter);
  for (let key in responsedata) {
    if (key !== 'headers' && key !== 'fileName') {
      const object = {};
      let keyCount = 0;
      const data  = responsedata[key].split(delimiter);
      for (let i = 0; i < data.length; i++) {
        let finaldata = formatDate(data[i], fromdateformat, todateformat);
        if (!isNaN(data[i])) {
          finaldata = formatNumber(data[i], numberformat);
        }
        object[headers[keyCount]] = finaldata;
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

  if (!check) {
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

function formatPreview (data, delimiter, headercheck, numberformat, fromdateformat, todateformat) {
  const previewdata = formatPreviewData(data, delimiter, numberformat, fromdateformat, todateformat);
  return formatPreviewHeader(previewdata, headercheck);
}

function getProps (table, tablename, callback) {
  let found = false;
  if (table) {
    for (let key in table) {
      if (key === tablename) {
        callback(table[key]);
      }
      getProps(table[key].children, tablename, callback);
    }
  }
}

function getPropertiesoftable(tablename, mapping) {
  let table = {};
  let props = [];
  let required = [];
  getProps(tables, tablename, function(tableObject){
    table = tableObject
  });
  
  _.each(table, function(val, key){
    if (val.isRequired) {
      required.push(key);
    }
    if (key != 'children') {
      props.push({label: key, value: key});
    }
  });
  mapping.properties = props;
  mapping.requiredProperty = required;
}

function getTableName (childTables, tablename) {
  for (let i = 0; i < childTables.length; i++) {
    for (let j = 0; j < childTables[i].children.length; j++) {
      if (childTables[i].children[j].value === tablename) {
        return childTables[i].value;
      }
    }
  }
  return null;
}

function mapData(mapping){
  mapping.mappedColumn.push(mapping.currentColumn);
  mapping.mappedProperty.push(mapping.currentProperty);

  mapping.mappingData.push({
      "userFieldName": mapping.currentColumn,
      "transformations": [],
      "table": mapping.currentTable,
      "field": mapping.currentProperty,
      "defaultValue": mapping.defaultValue,
      "index": mapping.mappingData.length + 1,
      "instance": '',
      "isRequired": ''
    });
  return mapping;
}

function attributeMapping(mapping) {
  const mapField1 = {
    "userFieldName": mapping.currentColumn,
    "transformations": [],
    "field": 'value',
    "defaultValue": mapping.defaultValue,
    "index": mapping.mappingData.length + 1,
    "instance": '',
    "table": 'attributeValues',
    "isRequired": true
  };
  const mapField2 = {
    "userFieldName": '"'+mapping.currentColumn+'"',
    "transformations": [],
    "field": 'attribute',
    "defaultValue": mapping.defaultValue,
    "index": mapping.mappingData.length + 2,
    "instance": '',
    "table": 'attributeValues',
    "isRequired": true
  };
  mapping.mappingData.push(mapField1);
  mapping.mappingData.push(mapField2);
  return mapping;
}

function autoMapping(currentState) {
  let synonymsList = currentState.synonymsList;
    for(let i in currentState.mapping.columns){
      for( let index in synonymsList){
        for(let indx in synonymsList[index].synonyms){
          let column =  currentState.mapping.columns[i].value;
          if(synonymsList[index].synonyms[indx] === column.toLowerCase()){
            currentState.mapping.mappingData.push({
              "userFieldName": column,
              "transformations": [],
              "table": synonymsList[index].tableName,
              "field": index,
              "defaultValue": currentState.mapping.defaultValue,
              "index": currentState.mapping.mappingData.length + 1,
              "instance": '',
              "isRequired": ''
            });
          }
        }
      }
      break;
    }
  return currentState.mapping;
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
      block: blockers(view, state[view])
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
    preview.resultdata = formatPreview(response.body, preview.delimiter, preview.noHeader, preview.numberFormat, preview.dateFormat, preview.dateFormat);
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
    preview.resultdata = formatPreview(preview.originaldata, preview.delimiter, check, preview.numberFormat, preview.dateFormat, preview.dateFormat);
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
    preview.resultdata = formatPreview(preview.originaldata, delimiter, preview.noHeader, preview.numberFormat, preview.dateFormat, preview.dateFormat);
    return {
      ...state,
      preview: preview
    }
  },
  [types.HANDLECSVPREVIEWDATE] (state, action) {
    const {dateformat} = action.payload;
    const preview = state.preview;
    preview.resultdata = formatPreview(preview.originaldata, preview.delimiter, preview.noHeader, preview.numberFormat, preview.dateFormat, dateformat);
    preview.dateFormat = dateformat;
    return {
      ...state,
      preview
    };
  },
  [types.HANDLECSVPREVIEWNUMBER] (state, action) {
    const {numberformat} = action.payload;
    const preview = state.preview;
    preview.numberFormat = numberformat;
    preview.resultdata = formatPreview(preview.originaldata, preview.delimiter, preview.noHeader, numberformat, preview.dateFormat, preview.dateFormat);
    return {
      ...state,
      preview
    };
  },
  [types.HANDLEPREVIEWSETTING] (state, action) {
    const preview = state.preview;
    preview.numberFormat = '#,###.##';
    preview.dateFormat = 'MM/DD/YYYY';
    preview.delimiter = ',';
    preview.noHeader= true;
    preview.resultdata = formatPreview(preview.originaldata, preview.delimiter, preview.noHeader, preview.numberFormat, preview.dateFormat, preview.dateFormat);
    return {
      ...state,
      preview
    };
  },
  [types.HANDLECSVLOADTABLES] (state) {
    const mapping = state.mapping;
    const tableData = [];
    mapping.columns = _.map(state.preview.resultdata.headers, function(val){
      return {label: val, value: val};
    });
    let firsttable = '';
    for (firsttable in tables) break;

    const children = _.map(tables[firsttable].children, function(val, key) {
      return {label: key, value: key, children: []};
    });

    tableData.push({label: firsttable, value: firsttable, children: children});
    
    mapping.tables = tableData;
    mapping.childTables = children;

    state.currentview = state.order[state.order.indexOf(state.currentview) + 1];
    
    mapping.currentTable = firsttable;
    getPropertiesoftable(firsttable, mapping);
    return {
      ...state,
      mapping
    }
  },
  [types.HANDLECSVMAPCOLUMNCHANGE] (state, action) {
    const {column} = action.payload;
    const mapping = state.mapping;
    mapping.currentColumn = column;
    return {
        ...state,
        mapping
    };
  },
  [types.HANDLECSVMAPTABLECHANGE] (state, action) {
    const {table} = action.payload;
    const mapping = state.mapping;
    mapping.currentTable = table;
    mapping.tableObject = '';
    mapping.currentProperty = '';
    mapping.remove = false;
    getPropertiesoftable(table, mapping);
    return {
        ...state,
        mapping
    };
  },
  [types.HANDLECSVMAPPROPERTYCHANGE] (state, action) {
    const {property} = action.payload;
    const mapping = state.mapping;
    mapping.currentProperty = property;
    return {
        ...state,
        mapping
    };
  },
  [types.HANDLECSVMAPADD] (state) {
    const mapping = state.mapping;
    let index = -1;
    let valueobject = {};
    for (let i = 0; i < mapping.childTables.length; i++) {
      if (mapping.childTables[i].value === mapping.currentTable) {
        index = i;
        valueobject = mapping.childTables[i];
        break;
      }
    }
    if (index > -1) {
      const length = mapping.childTables[index].children.length;
      const tablename = mapping.currentTable + '(' + length + ')';
      valueobject.children.push({label: tablename, value: tablename});
      mapping.childTables[index] = valueobject;
      mapping.tableObject = tablename;
      mapping.remove = true;
    }
    return {
      ...state,
      mapping
    };
  },
  [types.HANDLECSVMAPREMOVE] (state) {
    const mapping = state.mapping;
    for (let i = 0; i < mapping.childTables.length; i++) {
      for (let j = 0; j < mapping.childTables[i].children.length; j++) {
        if (mapping.childTables[i].children[j].value === mapping.tableObject) {
          mapping.childTables[i].children.splice(j, 1);
          break;
        }
      }
    }
    mapping.properties = [];
    mapping.tableObject = '';
    mapping.remove = false;
    return {
      ...state,
      mapping
    };
  },
  [types.HANDLECSVMAPTABLEINDEXCHANGE] (state, action) {
    const {table} = action.payload;
    const mapping = state.mapping;
    let isPrimarytable = false;
    for (let i = 0; i < mapping.tables.length; i++) {
      if (mapping.tables[i].value === table) {
        isPrimarytable = true;
        break;
      }
    }
    mapping.currentProperty='';
    if (!isPrimarytable) {
      mapping.tableObject = table;
      const tableName = getTableName(mapping.childTables, table);
      getPropertiesoftable(tableName, mapping);
      mapping.remove = true;
    } else {
      mapping.tableObject = mapping.tables[0].value;
      getPropertiesoftable(mapping.tableObject, mapping);
      mapping.remove = false;
    }
    
    return {
      ...state,
      mapping
    };
  },
  [types.HANDLECSVMAPPING] (state, action) {
    let mapping = state.mapping;
    mapping = mapData(mapping);
    mapping.currentColumn=''; 
    mapping.currentProperty='';
    mapping.defaultValue = '';
    return {
      ...state,
      mapping
    }
  },
  [types.HANDLEATTRIBUTEMAPPING] (state, action) {
    let mapping = state.mapping;
    mapping = attributeMapping(mapping);
    mapping.currentColumn=''; 
    mapping.currentProperty='';
    return {
      ...state,
      mapping
    }
  },
  [types.HANDLEDEFAULTVALUECHANGE] (state, action) {
    const mapping = state.mapping;
    mapping.defaultValue = action.payload.defaultValue;
    return {
      ...state,
      mapping
    }
  },
  [types.HANDLECSVMAPDATAREMOVE] (state, action) {
    const { rowid } = action.payload;
    const mapping = state.mapping;
    mapping.mappingData.splice(rowid-1, 1);
    for (let i = 0; i < mapping.mappingData.length; i++) {
      mapping.mappingData[i].index = i+1;
    }
    return {
      ...state,
      mapping
    }
  },
  [types.GETSYNONYMSLISTSUCCESS] (state, action) {
    const { data } = action.payload.response;
    return {
      ...state,
      synonymsList: action.payload.response.result
    };
  },
  [types.HANDLEAUTOMAPPING] (state, action) {
    const mapping = autoMapping(state);
    return {
      ...state,
      mapping
    };
  },
  [types.SAVEMAPPEDDATASUCCESS] (state, action) {
    console.log('data saved');
  },
  [types.HANDLEMAPPINGNAME] (state, action) {
    const mapping = state.mapping;
    mapping.mappingName = action.payload.mappingName;
    return {
      ...state,
      mapping
    };
  }
  [types.HANDLECSVMAPTRANSFORMATION] (state, action) {
    const {rowid, transformation} = action.payload;
    const mapping = state.mapping;
    mapping.mappingData[rowid].transformations = transformation;
    return {
      ...state,
      mapping
    }
  }
});
