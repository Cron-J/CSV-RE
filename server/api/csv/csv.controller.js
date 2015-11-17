'use strict';
var models = require('../../models'),
    async = require('async'),
    common = require('../../utils/common.js'),
    staticData = require('../../utils/staticData.js'),
    cc = require('currency-codes'),
    fs = require('fs'),
    Converter = require("csvtojson").Converter;
    var csvConverter = new Converter({});

/*
  API to get the list of attribute.
*/
exports.uploadCSV = function(req,res){
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
    console.log('==Result==', result);
    res.status(200).json(result);
  }).catch(function(error){
    console.log("==Error==", error);
  });
};
// Get Mapping
exports.getMapping = function(req, res) {
  models.mapping.find({where: {id: req.params.id}}).then(function(result){
    console.log('==Result==', result);
    res.status(200).json(result);
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
        console.log('data', data);
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
var checkPDuplicate = function(name, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].pricetype == name)
            return false;
    }

};

/*
  API to create the Mapping.
*/
exports.create =  function(req,res){
  models.mapping.create({
    attributeId: req.body.attributeId,
    tenantId: req.body.tenantId,
    fileName: req.body.fileName,
    mappingInfo: req.body.mappingInfo,
    delimeter: req.body.delimeter,
    mappingName : req.body.mappingName
  }).then(function(result){
      models.mapping.find({tenantId:req.body.tenantId, mappingName: req.body.mappingName}).then(function(mappings, err) {
          if (!err) {
              var upload_path = 'uploads/' + mappings.fileName;
              var fileStream = fs.createReadStream(upload_path);
              //new converter instance
              var csvConverter = new Converter({
                  constructResult: true
              });
              //end_parsed will be emitted once parsing finished
              csvConverter.on("end_parsed", function(jsonObj) {
                  var convertedJson = [],
                      key = 0,
                      check;
                  for (var g = 0; g < jsonObj.length; g++) {
                      for (var i = 0; i < mappings.mappingInfo.length; i++) {
                          var obj = {};
                          if (!convertedJson[key])
                              convertedJson[key] = {};

                          if (mappings.mappingInfo[i].userFieldName) {
                              if(mappings.mappingInfo[i].defaultValue != undefined) {
                                  convertedJson[key][mappings.mappingInfo[i].userFieldName] =
                                      mappings.mappingInfo[i].defaultValue;
                              } else {
                                  convertedJson[key][mappings.mappingInfo[i].userFieldName] =
                                      changeFormat(jsonObj[g][mappings.mappingInfo[i].userFieldName], mappings.delimeter);
                              }
                          } else {
                              for (var j = 0; j < mappings.mappingInfo[i].values.length; j++) {
                                  switch (mappings.mappingInfo[i].field) {
                                      case "attributeValues":
                                          if (!convertedJson[key].attributeValues)
                                              convertedJson[key].attributeValues = [];
                                          check = checkAlDuplicate(mappings.mappingInfo[i].values[j].userFieldName, convertedJson[key].attributeValues);
                                          if (check != false) {
                                              if(mappings.mappingInfo[i].values[j].defaultValue) {
                                                  obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                                      mappings.mappingInfo[i].values[j].defaultValue;
                                                  convertedJson[key].attributeValues.push(obj);
                                              } else {
                                                  convertedJson[key].attributeValues.push({
                                                      "attributeId": mappings.mappingInfo[i].values[j].userFieldName,
                                                      "attributeValue":changeFormat(jsonObj[g][mappings.mappingInfo[i].values[j].userFieldName], mappings.delimeter)
                                                  });
                                              }
                                          }
                                          // else {
                                          //     if(mappings.mappingInfo[i].values[j].defaultValue) {
                                          //         obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                          //         mappings.mappingInfo[i].values[j].defaultValue;
                                          //     } else {
                                          //         obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                          //         changeFormat(jsonObj[g][mappings.mappingInfo[i].values[j].userFieldName], mappings.delimeter);
                                          //     }
                                          //     convertedJson[key].attributeValues.push(obj);
                                          // }
                                          break;

                                      case "prices":
                                          if (!convertedJson[key].prices)
                                              convertedJson[key].prices = [];
                                          check = checkPDuplicate(mappings.mappingInfo[i].values[j].userFieldName.split('_')[0], convertedJson[key].prices);
                                          if (check != false) {
                                              if(mappings.mappingInfo[i].values[j].userFieldName == "gross_price" ||
                                                  mappings.mappingInfo[i].values[j].userFieldName == "retail_price" ||
                                                  mappings.mappingInfo[i].values[j].userFieldName == "grossprice" ||
                                                  mappings.mappingInfo[i].values[j].userFieldName == "retailprice") {
                                                  convertedJson[key].prices.push({
                                                      "pricetype": mappings.mappingInfo[i].values[j].userFieldName.split('_')[0],
                                                      "price": jsonObj[g][mappings.mappingInfo[i].values[j].userFieldName]
                                                  });
                                              }
                                              else {
                                                  if(mappings.mappingInfo[i].values[j].defaultValue) {
                                                      obj[mappings.mappingInfo[i].values[j].userFieldName] = mappings.mappingInfo[i].values[j].defaultValue
                                                  } else {
                                                      obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                                          changeFormat(jsonObj[g][mappings.mappingInfo[i].values[j].userFieldName], mappings.delimeter);
                                                  }
                                                  convertedJson[key].prices.push(obj);
                                              }
                                          }
                                          break;

                                      case "productRelations":
                                          if (!convertedJson[key].productRelations)
                                              convertedJson[key].productRelations = [];
                                          if(mappings.mappingInfo[i].values[j].defaultValue) {
                                              obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                                  mappings.mappingInfo[i].values[j].defaultValue;
                                          } else {
                                              obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                                  changeFormat(jsonObj[g][mappings.mappingInfo[i].values[j].userFieldName], mappings.delimeter);
                                          }
                                          convertedJson[key].productRelations.push(obj);
                                          break;

                                      case "contractedProducts":
                                          if (!convertedJson[key].contractedProducts)
                                              convertedJson[key].contractedProducts = [];

                                          if(mappings.mappingInfo[i].values[j].defaultValue){
                                              obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                                  mappings.mappingInfo[i].values[j].defaultValue;
                                          }else{
                                              obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                                  changeFormat(jsonObj[g][mappings.mappingInfo[i].values[j].userFieldName], mappings.delimeter);
                                          }
                                          convertedJson[key].contractedProducts.push(obj);
                                          break;

                                      case "classificationGroupAssociations":
                                          if (!convertedJson[key].classificationGroupAssociations)
                                              convertedJson[key].classificationGroupAssociations = [];
                                          if(mappings.mappingInfo[i].values[j].defaultValue) {
                                              obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                                  mappings.mappingInfo[i].values[j].defaultValue;
                                          } else {
                                              obj[mappings.mappingInfo[i].values[j].userFieldName] =
                                                  changeFormat(jsonObj[g][mappings.mappingInfo[i].values[j].userFieldName], mappings.delimeter);
                                          }
                                          convertedJson[key].classificationGroupAssociations.push(obj);
                                          break;

                                  }
                              }
                          }
                      }
                      key++;
                  }
                  res.send(convertedJson);
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
      tenantId: data.tenantId,
      mappingInfo: data.mappingInfo,
      delimeter: data.delimeter,
      mappingName : data.mappingName
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
function csvJSON(csv, fileName) {
    var lines = csv.split("\n");
    var result = {};
    result.fileName = fileName;
    if(lines[0])
        result.headers = lines[0].split("\r")[0]
    if(lines[1])
        result.rowOne = lines[1].split("\r")[0]
    if(lines[2])
        result.rowTwo = lines[2].split("\r")[0]
    return result; //JSON
}
