import * as types from 'constants/ActionTypes';
// import { createReducer } from 'utils';
import { createReducer } from 'redux-create-reducer';

const initialState = {
  id: '',
  tables: {},
  properties: [],
  mappingData: {},
  headers : [],
  headSelect : '',
  propertySelect : '',
  defaultValue : '',
  selectedHeaders : [],
  selectedTables : [],
  selectedProperties : [],
  mappedFields : [],
  mappedData : [],
  selectedTab : '',
  mappingName : '',
  tenantId: '',
  mappingInfo: [],
  mapped: false,
  autoMappedOnce: false
};


export default createReducer(initialState, {
  [types.HANDLESELECTEDDEFAULTVALUE](state, action) {
      const data = action.payload.response;
      return {
      ...state,
          fileproperties : action.payload.properties,
          defaultValue:''
      }
  },
  [types.HANDLETABLEINLIST](state, action) {
      const data = action.payload.data;
      return {
      ...state,
      tables: data.tables
      }
  },
  [types.SHOWMESSAGE](state,action){
    return {
        ...state
    }
  },
  [types.PERSISTMAPPINGDATA](state, action){
    const {response} = action.payload;
    if(response){
        return {
            ...state,
            tables: response[0].tables,
            properties: response[0].properties,
            attributeList: response[0].attributeList,
            pickedTable: response[0].pickedTable,
            mappedData: response[0].mappedData,
            mappedFields: response[0].mappedFields,
            selectedTable: response[0].selectedTable,
            mappingData: response[0].mappingData,
            headers : response[1],
            headSelect : response[0].headSelect,
            propertySelect : response[0].propertySelect,
            defaultValue : response[0].defaultValue,
            selectedHeaders : response[0].selectedHeaders,
            selectedTables : response[0].selectedTables,
            selectedProperties : response[0].selectedProperties,
            selectedTab : response[0].selectedTab,
            mappingName : response[0].mappingName,
            mappingInfo : response[0].mappingInfo
        }
    }else{
        return{
            ...state
        }
    }
  },
  [types.HANDLEATTRIBUTELIST](state, action) {
    const { response } = action.payload;
    return {
      ...state,
      id: '',
      tables: {},
      properties: [],
      attributeList: {},
      pickedTable: 'Select',
      mappedData: [],
      mappedFields: [],
      selectedTable: ''
    };
  },
  [types.HANDLEATTRIBUTELISTSUCCESS](state, action) {
    const { response } = action.payload;
    let product = {'product': {
        "tenantId": {
            "index": true,
            "isRequired": true,
            "instance": "String"
        },
        "productId": {
            "index": {
                "unique": true,
                "background": true
            },
            "isRequired": true,
            "instance": "String"
        },
        "supplierId": {
            "index": true,
            "instance": "String"
        },
        "statusId": {
            "index": null,
            "instance": "String"
        },
        "mfgProductId": {
            "index": null,
            "instance": "String"
        },
        "mfgProductName": {
            "index": null,
            "instance": "String"
        },
        "manufacturerId": {
            "index": null,
            "instance": "String"
        },
        "manufacturerName": {
            "index": null,
            "instance": "String"
        },
        "extProductId": {
            "index": null,
            "instance": "String"
        },
        "productIdExtension": {
            "index": null,
            "instance": "String"
        },
        "unitOfMeasureId": {
            "index": null,
            "instance": "String"
        },
        "salesUnitOfMeasureId": {
            "index": null,
            "instance": "String"
        },
        "keywords": {
            "index": null,
            "instance": "String"
        },
        "ean": {
            "index": null,
            "instance": "String"
        },
        "isMainProdLine": {
            "index": null
        },
        "isForSales": {
            "index": null,
            "instance": "Boolean"
        },
        "isSpecialOffer": {
            "index": null,
            "instance": "Boolean"
        },
        "isStocked": {
            "index": null,
            "instance": "Boolean"
        },
        "isPunchout": {
            "index": null,
            "instance": "Boolean"
        },
        "isConfigurable": {
            "index": null,
            "instance": "Boolean"
        },
        "validFrom": {
            "index": null,
            "instance": "Date"
        },
        "validTo": {
            "index": null,
            "instance": "Date"
        },
        "classificationGroupAssociations": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "classificationId": {
                "index": null,
                "isRequired": true,
                "instance": "String"
            },
            "classificationGroupId": {
                "index": null,
                "isRequired": true,
                "instance": "String"
            },
            "orderNo": {
                "index": null,
                "instance": "Number"
            }
        },
        "attributeValues": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "attribute": {
                "index": null,
                "isRequired": true,
                "instance": "String"
            },
            "value": {
                "index": null,
                "instance": "String"
            },
            "valueExpression": {
                "index": null,
                "instance": "String"
            },
            "languageId": {
                "index": null,
                "instance": "String"
            },
            "orderNo": {
                "index": null,
                "instance": "Number"
            },
            "statusId": {
                "index": null,
                "instance": "String"
            },
            "channels": {
                "index": null,
                "instance": "String"
            }
        },
        "contractedProducts": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "altExtProductId": {
                "index": null,
                "instance": "String"
            },
            "extClassificationId": {
                "index": null,
                "instance": "String"
            },
            "extClassificationGroupId": {
                "index": null,
                "instance": "String"
            },
            "descShort": {
                "index": null,
                "instance": "String"
            },
            "descLong": {
                "index": null,
                "instance": "String"
            },
            "extGLAccountId": {
                "index": null,
                "instance": "String"
            },
            "priceQuantity": {
                "index": null,
                "instance": "Number"
            },
            "quantityInterval": {
                "index": null,
                "instance": "Number"
            },
            "maxQuantity": {
                "index": null,
                "instance": "Number"
            },
            "minQuantity": {
                "index": null,
                "instance": "Number"
            },
            "leadtimeInDays": {
                "index": null,
                "instance": "Number"
            },
            "salesUnitOfMeasureId": {
                "index": null,
                "instance": "String"
            },
            "timePeriod": {
                "index": null,
                "instance": "String"
            },
            "visibility": {
                "index": null,
                "instance": "Number"
            },
            "unitOfMeasureId": {
                "index": null,
                "instance": "String"
            },
            "cost": {
                "index": null,
                "instance": "Number"
            },
            "currencyId": {
                "index": null,
                "instance": "String"
            },
            "ammount": {
                "index": null,
                "instance": "Number"
            },
            "statusDate": {
                "index": null,
                "instance": "Date"
            },
            "discount": {
                "index": null,
                "instance": "Number"
            }
        },
        "prices": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "statusId": {
                "index": null,
                "instance": "String"
            },
            "currencyId": {
                "index": null,
                "isRequired": true,
                "instance": "String"
            },
            "priceTypeId": {
                "index": null,
                "instance": "String"
            },
            "netPrice": {
                "index": null,
                "isRequired": true,
                "instance": "Number"
            },
            "grossPrice": {
                "index": null,
                "instance": "Number"
            },
            "fixNetPrice": {
                "index": null,
                "instance": "Number"
            },
            "listPrice": {
                "index": null,
                "instance": "Number"
            },
            "validFromQuantity": {
                "index": null,
                "isRequired": true,
                "instance": "Number"
            },
            "validFrom": {
                "index": null,
                "instance": "Date"
            },
            "validTo": {
                "index": null,
                "instance": "Date"
            },
            "unitOfMeasureId": {
                "index": null,
                "instance": "String"
            },
            "productIdExtensionForUoM": {
                "index": null,
                "instance": "String"
            },
            "priceUnit": {
                "index": null,
                "instance": "Number"
            },
            "description": {
                "index": null,
                "instance": "String"
            },
            "vatPercentage": {
                "index": null,
                "instance": "Number"
            },
            "isPreferred": {
                "index": null,
                "isRequired": true,
                "instance": "Boolean"
            }
        },
        "productRelations": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "relatedProductId": {
                "index": null,
                "instance": "String"
            },
            "descriptions": {
                "index": null,
                "instance": "String"
            },
            "typeId": {
                "index": null,
                "instance": "String"
            },
            "validFrom": {
                "index": null,
                "instance": "Date"
            },
            "validTo": {
                "index": null,
                "instance": "Date"
            },
            "quantity": {
                "index": null,
                "instance": "Number"
            },
            "statusId": {
                "index": null,
                "instance": "String"
            },
            "seqNo": {
                "index": null,
                "instance": "String"
            },
            "udxText1": {
                "index": null,
                "instance": "String"
            },
            "udxText2": {
                "index": null,
                "instance": "String"
            },
            "udxText3": {
                "index": null,
                "instance": "String"
            },
            "udxNum1": {
                "index": null,
                "instance": "Number"
            },
            "udxNum2": {
                "index": null,
                "instance": "Number"
            },
            "udxNum3": {
                "index": null,
                "instance": "Number"
            },
            "udxSortKey1": {
                "index": null,
                "instance": "String"
            },
            "udxSortKey2": {
                "index": null,
                "instance": "String"
            },
            "udxSortKey3": {
                "index": null,
                "instance": "String"
            },
            "syncTypeId": {
                "index": null,
                "instance": "String"
            },
            "isMandatory": {
                "index": null,
                "instance": "Boolean"
            },
            "selectionGroupId": {
                "index": null,
                "instance": "String"
            },
            "isDefaultSelected": {
                "index": null,
                "instance": "Boolean"
            }
        },
        "documents": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "path": {
                "index": null,
                "instance": "String"
            },
            "documentViewTypeId": {
                "index": null,
                "instance": "String"
            },
            "orderNo": {
                "index": null,
                "instance": "Number"
            },
            "languageId": {
                "index": null,
                "instance": "String"
            },
            "description": {
                "index": null,
                "instance": "String"
            },
            "validFrom": {
                "index": null,
                "instance": "Date"
            },
            "validTo": {
                "index": null,
                "instance": "Date"
            }
        },
        "variants": {
            "variantId": {
                "index": {
                    "unique": true,
                    "sparse": true,
                    "background": true
                },
                "isRequired": true,
                "instance": "String"
            },
            "attributes": {
                "index": null,
                "instance": "String"
            },
            "hasVariantClassificationGroupAssociations": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantPrices": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantDocAssociation": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantProductRelation": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantContractedProducts": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantAttributeValues": {
                "index": null,
                "instance": "Boolean"
            }
        }
    }};
    let tst = {};
    function fn(table,product) {
      for (let key in product) {
        if (product.hasOwnProperty(key)) {
          if(product[key].hasOwnProperty('index')) {
            product[key]['field'] = key;
            tst[table].push(product[key]);
          }else {
            tst[key] = [];
            fn(key,product[key]);
          }
        }
      }
    };
    fn('',product);

    let tables = {};
    for(let k in tst){
      tables[k] = [];
    }
    let properties = tst['product'];
    console.log('tables_____ properties ',tables,properties);
    return {
      ...state,
      tables: tables,
      properties: properties,
      attributeList: tst,
      pickedTable: 'Select',
      mappedData: [],
      mappedFields: [],
      selectedTable: '',
      mappingName: ''
    };
  },
  [types.HANDLEATTRIBUTELISTCHANGES](state, action) {
    const { data } = action.payload;
    return {
      ...state,
      tables: data.tables,
      properties: data.properties,
      attributeList: data.attributeList,
      pickedTable: data.pickedTable,
      mappedData: data.mappedData,
      mappedFields: data.mappedFields,
      selectedTable: data.selectedTable,
      mappingData: data.mappingData,
      headers : data.headers,
      headSelect : data.headSelect,
      propertySelect : data.propertySelect,
      defaultValue : data.defaultValue,
      selectedHeaders : data.selectedHeaders,
      selectedTables : data.selectedTables,
      selectedProperties : data.selectedProperties,
      selectedTab : data.selectedTab,
      mappingName : data.mappingName,
      mappingInfo : data.mappingInfo
    }
  },
  [types.HANDLEMAPPEDCHNAGES](state, action) {
    const { data } = action.payload;
    return {
      ...state,
      tables: data.tables,
      properties: data.properties,
      attributeList: data.attributeList,
      pickedTable: data.pickedTable,
      mappedData: data.mappedData,
      mappedFields: data.mappedFields,
      selectedTable: data.selectedTable,
      headers: data.headers,
      defaultValue: data.defaultValue,
      mapped: data.mapped
    }
  },
  [types.SAVEMAPPEDDATA](state,action) {
    const data = action.payload;
    return {
        ...state
    }
  },
  [types.SAVEMAPPEDDATASUCCESS](state,action) {
      const {response} = action.payload;
      return {
          ...state,
          mappingData: response
      }
  },
  [types.HANDLEMAPPEDINFOSUCCESS](state, action) {
    const { response } = action.payload;
    return {
    ...state,
        mappingInfo: response,
        mappingDataPreview: true
    }
  },
  [types.GETCSVDATASUCCESS](state, action) {
    const { response } = action.payload;
    var arr = response.headers.split(',');
    return {
    ...state,
        headers: arr
    }
  },
  [types.GETMAPINFOSUCCESS](state, action) {
    const { response } = action.payload;
    var arr = [];
    for (var i = 0; i < response.mappingInfo.length; i++) {
      arr[i] = {};
      arr[i].transformations = response.mappingInfo[i].transformations;
      if (response.mappingInfo[i].defaultValue) {
        if (response.mappingInfo[i].table === 'attributeValues') {
          if (response.mappingInfo[i].field === 'value' && response.mappingInfo[i+1].field === 'attribute') {
            arr[i].column = response.mappingInfo[i].userFieldName;
          } else {
            arr[i].column = '"'+response.mappingInfo[i].defaultValue+'"';
          }
        } else {
          arr[i].column = '"'+response.mappingInfo[i].defaultValue+'"';
        }
      } else {
        if (response.mappingInfo[i].table === 'attributeValues') {
          if (response.mappingInfo[i].field === 'attribute') {
            arr[i].column = '"'+response.mappingInfo[i].userFieldName+'"';
          } else {
            arr[i].column = response.mappingInfo[i].userFieldName;
          }
        } else {
          arr[i].column = response.mappingInfo[i].userFieldName;
        }
      }
      if (response.mappingInfo[i].table === 'product') {
        arr[i].propertyname = 'product.' + response.mappingInfo[i].field;
      } else {
        if (response.mappingInfo[i].index >= 0) {
          arr[i].propertyname = 'product.' + response.mappingInfo[i].table + response.mappingInfo[i].index + '.' + response.mappingInfo[i].field;
        } else {
          arr[i].propertyname = 'product.' + response.mappingInfo[i].table+ '.' + response.mappingInfo[i].field;
        }
      }
      arr[i].propertydec = response.mappingInfo[i].field;
    };
    var res = [];
    for (var i = 0; i < response.mappingInfo.length; i++) {
        res[i] = {};
        res[i].userFieldName = response.mappingInfo[i].userFieldName;
        res[i].transformations = response.mappingInfo[i].transformations;
        res[i].table = response.mappingInfo[i].table;
        res[i].field = response.mappingInfo[i].field;
        res[i].defaultValue = response.mappingInfo[i].defaultValue;
        res[i].index = response.mappingInfo[i].index;
        res[i].instance = response.mappingInfo[i].instance;
        res[i].isRequired = response.mappingInfo[i].isRequired;
        res[i].rowId = response.mappingInfo[i].rowId;
    };
    return {
      ...state,
      id: response.id,
      mappingName: response.mappingName,
      mappedFields: arr,
      mappedData: res,
      tenantId: response.tenantId,
      selectedTab: 'product',
      pickedTable: ''
    };
  },
  [types.UPDATEMAPPINGSUCCESS](state, action) {
    const { data } = action.payload;
    return {
      ...state
    }
  },
  [types.UPDATEMAPPINGSUCCESS](state, action) {
    const { data } = action.payload;
    return {
      ...state
    }
  }

});
