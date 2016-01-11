'use strict';
var models = require('../../models'),
    async = require('async'),
    common = require('../../utils/common.js'),
    staticData = require('../../utils/staticData.js'),
    trans = require('../../utils/transformation.js'),
    cc = require('currency-codes'),
    fs = require('fs'),
    Converter = require("csvtojson").Converter;
    var csvConverter = new Converter({});

/*
  API to get the list of attribute.
*/
exports.uploadCSV = function(req,res){
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++');
    // This block is only relevant to users
    // interested in custom parameters - you
    // can delete/ignore it as you wish
    if (req.body) {
        var upload_path = 'uploads/'+req.files[0].filename;
        fs.readFile(upload_path, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            res.json(csvJSON(data, req.files[0].filename));
        });
    }
};
exports.index =  function(req,res){
  var str = '{"product": {"tenantId": {"index": true,"isRequired": true,"instance": "String","type" : 0},"productId": {"index": {"unique": true,"background": true},"isRequired": true,"instance": "String"},"attributeValues": {"attributes": {"variantId": {"index": null,"instance": "String"},"classificationId": {"variantId": {"index": null,"instance": "String"},"classificationId": {"index": null,"isRequired": true,"instance": "String"}}},"attributeSec": {"index": null,"isRequired": true,"instance": "String"}}}}';
  var obj = JSON.parse(str);
  res.status(200).json(obj);
};

exports.getMappingList = function(req,res){
  models.mapping.findAll({}).then(function(result){
    console.log(result);
    res.status(200).json(result);
  }).catch(function(error){
    console.log("==Error==", error);
  });
};
// Get Mapping
exports.getMapping = function(req, res) {
  models.mapping.find({where: {id: req.params.id}}).then(function(result){
    var upload_path = "uploads/"+result.fileName;
    fs.readFile(upload_path, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }      
      res.json({'mapping':result,'file': csvJSON(data, result.fileName)});
    });
  }).catch(function(error){
    console.log("==Error==", error);
  });
}
// Get csv file data for mapping
exports.getMappingCSVData = function(req, res) {
  models.mapping.find({where: {id: req.params.id, tenantId: req.params.tenantId}}).then(function(result){
    var path = 'uploads';
    var upload_path = path + '/' + result.dataValues.fileName;

    fs.readFile(upload_path, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.status(200).json(csvJSON(data, result.dataValues.fileName));
    });
  }).catch(function(error){
    console.log("==Error==", error);
  });
}
//format change
var changeFormat = function (item, format){
    if(isNaN(item)) {
        var d = new Date(item);
        if(d != "Invalid Date"){
            var date = d.getDate();
            if(date < 10) date = "0"+date;
            var month = d.getMonth()+1;
            if(month < 10) month = "0"+month;
            var year = d.getFullYear();
            if(format.dateFormat == "MM/dd/yyyy") {
                item = month+"/"+date+"/"+year;
            }
            else
                item = date+"-"+month+"-"+year;
        }
    }
    if(!isNaN(item)) {
        if(format.numberFormat == '#,##'){
            var str = item.slice(0, -2)+','+item.slice(-2);
            item = str;
        }
        else if(format.numberFormat == '#.##'){
            list[i] = (item / 100);
        }
        else if(format.numberFormat == '#,###.##'){
            if(item.toString().length > 5){
                item = (item / 100);
                var str = item.toString().split('.');
                if (str[0].length >= 4) {
                    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                }
                if (str[1] && str[1].length >= 4) {
                    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
                }
                item = str.join('.');
            }
        }
        else if(format.numberFormat == '#.###,##'){
            var str = item.toString();
            if(str.length > 5){
                str = list[i].slice(0, -5)+'.'+item.slice(-3)+','+item.slice(-2);
                item = str;
            }
        }
    }

    return item;
};

//checking duplicates
var checkAlDuplicate = function(name, arr) {
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].attributeId == name)
            return false;
    }
};
var checkPDuplicate = function(named, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].pricetype == name)
            return false;
    }

};
var tableschema = {'product': {
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
/*
  API to create the Mapping.
*/
/*exports.create =  function(req,res){
    console.log('mapping data', req.body);
}*/
exports.create =  function(req,res){
    let findTableInSchema = function(product,obj,mapper,schema){
        /* {
         "userFieldName": "Product No",
         "transformations": [],
         "table": "product",
         "field": "supplierId",
         "defaultValue": "",
         "index": true,
         "instance": "String"
         },*/
        var getparams =function (params, isempty) {
          let param = '';
          if(isempty !== '' && params.length > 0){
            param = ','
          }
          param += params[0] && params[0].value ? params[0].value : '';
          for(var i=1;i<params.length;i++){
            param += ','+params[i].value;
          }
          return param;
        };
        var getnexttransformation =function (tranformationarray,next){
          let tranfomationfunc = '';
          if(tranformationarray[next]){
            if(tranformationarray[next+1]){
              tranfomationfunc = getnexttransformation(tranformationarray,next+1);
            }
            return tranfomationfunc = tranformationarray[next].name + '('+tranfomationfunc+getparams(tranformationarray[next].params,tranfomationfunc)+')';
          }
        };
        var transformationsRefactor = function(transformations, value){
          let da;
          for(var i=0; i<transformations.length; i++){
            if(transformations[i].name === "upperCase"){
              da = trans.upperCase(value);
            }
            if(transformations[i].name === "lowerCase"){
              da = trans.lowerCase(value);
            }
            if(transformations[i].name === "substr"){
              da = trans.subString(value,transformations[i].params[0],transformations[i].params[1]);
            }        
          }
          return da;
        }
        let assign = function (product,tablename,mapperfield,mapperuserfieldname,defaultValue,schema,obj,transformations) {
            let t = getnexttransformation(transformations,0);
            for(let key in schema){
                if(key === tablename && schema[key][mapperfield]){
                    let value = obj[mapperuserfieldname];
                    value = transformationsRefactor(transformations, value);
                    if(value === '' && defaultValue && defaultValue.length > 0){
                        product[mapperfield] = defaultValue;
                        product[mapperfield] = transformationsRefactor(transformations, product[mapperfield]);
                    }else{
                        product[mapperfield] = obj[mapperuserfieldname];
                        product[mapperfield] = transformationsRefactor(transformations, product[mapperfield]);
                    }
                }
            }
            return product;
        };
        product = assign(product,mapper.table,mapper.field,mapper.userFieldName,mapper.defaultValue,schema,obj,mapper.transformations);
        for(let headtable in schema){
            let table = product[mapper.table];
            let mapperindex = mapper.index;
            if(table && table.length > 0 && table[mapperindex]){
                table[mapperindex] = assign(table[mapperindex],mapper.table,mapper.field,mapper.userFieldName,mapper.defaultValue,schema[headtable],obj,mapper.transformations);
            }else{
                let child = {};
                child = assign(child,mapper.table,mapper.field,mapper.userFieldName,mapper.defaultValue,schema[headtable],obj,mapper.transformations);
                if(Object.keys(child).length !== 0){
                    if(table === undefined){
                        product[mapper.table] = {};
                        product[mapper.table][mapperindex] = child;
                    }else{
                        table[mapperindex] = child;
                    }
                }}
        }
        return product;
    };
    
    let csv_mapping = function (obj,mappinginfo) {
        let product = {},schema = tableschema;
        for(let i=0;i<mappinginfo.length;i++){
            let mapper = mappinginfo[i];
            product = findTableInSchema(product,obj,mapper,schema);
        }
        return product;
    };
    /*models.mapping.create({
    attributeId: req.body.attributeId,
    tenantId: req.body.tenantId,
    fileName: req.body.fileName,
    mappingInfo: req.body.mappingInfo,
    delimeter: req.body.delimeter,
    mappingName : req.body.mappingName
  }).then(function(result){*/
  models.mapping.create({
    attributeId: '2',
    tenantId: '2',
    fileName: req.body.upload.fileName,
    mappingInfo: req.body.mapping.mappingData,
    delimeter: req.body.preview.delimeter,
    mappingName : req.body.mapping.mappingName
  }).then(function(result){
      models.mapping.find({tenantId:'2', mappingName: req.body.mapping.mappingName}).then(function(mappings, err) {
          if (!err) {
              var upload_path = 'uploads/' + req.body.upload.fileName;
              var fileStream = fs.createReadStream(upload_path);
              //new converter instance
              var csvConverter = new Converter({
                  constructResult: true
              });
              //res.send(mappings);
              //return;
              //end_parsed will be emitted once parsing finished
              csvConverter.on("end_parsed", function(jsonObj) {
                 var convertedJSON = [],error = {};
                 var times=0;
                  jsonObj && jsonObj.length < 2 ?times = jsonObj.length: times = 2;
                  if(jsonObj){
                      for(var i=0;i<times;i++){
                          convertedJSON.push(csv_mapping(jsonObj[i],req.body.mapping.mappingData));
                      }
                  }else{
                      error.message = "Error : Couldnot process the CSV file.";
                  }
                  res.send({'convertedJSON': convertedJSON,'error': error});
              });
              fileStream.pipe(csvConverter);
          }
          else {
              res.send(err);
          }
      }).catch(function (err) {
          console.log(err);
      });
  }).catch(function(error){
    res.status(500).json(error);
  });
};

// Edit Mapping
exports.update =  function(req,res){
  var data = req.body;
  models.mapping.find({
    where: {tenantId:req.params.tenantId, id: req.params.id}
  }).then(function(mapping){
    mapping.updateAttributes({
      tenantId: req.params.tenantId,
      mappingInfo: data.mapping.mappingData,
      mappingName : data.mapping.mappingName
    }).then(function(mapping){
      res.json(204)
    });
  }).catch(function(error){
    res.status(404).json(error)
  });
}

// Deprecated
exports.uploadFileData = function(req, res) {
  var data = req.body;

  if (data.length === undefined) {
      res.json('Please Upload the file');
  } else {
    var path = 'upload';
    fs.mkdir(path, function(e) {
        if (!e || (e && e.code === 'EEXIST')) {
            var fileName = req.body.file_name + new Date().getTime();
            var upload_path = path + '/' + req.body.file_name + new Date().getTime();
            fs.writeFileSync(upload_path, data);
            fs.readFile(upload_path, 'utf8', function(err, data) {
                if (err) {
                    return console.log(err);
                }
                res.status(200).json(csvJSON(data, fileName));
            });
        } else {
            res.status(500).json();
        }
    });
  }
};

exports.uploadFileData = function(req, res) {
  var fileName = req.body.name;
  fs.readFile(upload_path, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(csvJSON(data, fileName));
  });
}
function csvJSON(csv, fileName) {
    var lines = csv.split("\n");
    var result = {};
    result.fileName = fileName;
    if(lines[0])
        result.headers = lines[0].split("\r")[0];
    if(lines[1])
        result.rowOne = lines[1].split("\r")[0];
    if(lines[2])
        result.rowTwo = lines[2].split("\r")[0];
    return result; //JSON
}

exports.synonyms = function(req, res) {
    var synonyms = {
        'tenantId': {'tableName':'product','synonyms':['tenant','tenantid', 'tenantno', 'tenant no']},
        'productId': {'tableName':'product','synonyms':['product', 'productid', 'productno', 'product no']},
        'supplierId': {'tableName':'product','synonyms':['supplier', 'supplierid', 'supplierno', 'supplierno']},
        'mfgProductId': {'tableName':'product','synonyms':['mfgProduct', 'mfgproductid', 'mfgproductno', 'mfgproduct no']},
        'manufacturerId': {'tableName':'product','synonyms':['manufacturer', 'manufacturerid', 'manufacturerno', 'manufacturer no']},
        'extProductId': {'tableName':'product','synonyms':['extProduct', 'extProductid', 'extproductno', 'extproduct no']},
        'variantId': {'tableName':'variants','synonyms':['variant', 'variantid', 'variantno', 'variant no']},
        'languageId': {'tableName':'tableName','synonyms':['language', 'languageid', 'languageno', 'language no']},
        'classificationId': {'tableName':'classificationGroupAssociations','synonyms':['classification', 'classificationid', 'classificationno', 'classification no']},
        'classificationGroupId': {'tableName':'classificationGroupAssociations','synonyms':['classificationGroup', 'classificationGroupid', 'classificationGroupno', 'classificationGroup no']},
        'extClassificationId': {'tableName':'contractedProducts','synonyms':['extClassification', 'extClassificationid', 'extClassificationno', 'extClassification no']},
        'extClassificationGroupId': {'tableName':'contractedProducts','synonyms':['extClassificationGroup','extClassificationno', 'extClassificationGroupid', 'extClassification no']},
        'priceTypeId': {'tableName':'prices','synonyms':['priceType', 'priceTypeid', 'priceTypeno', 'priceType no']},
        'relatedProductId': {'tableName':'productRelations','synonyms':['relatedProduct', 'relatedProductid', 'relatedProductno', 'relatedProduct no']}
    }
    res.json({'result': synonyms});
}
