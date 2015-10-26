'use strict';
var models = require('../../models'),
    async = require('async'),
    common = require('../../utils/common.js'),
    staticData = require('../../utils/staticData.js'),
    cc = require('currency-codes'),
    fs = require('fs');
/*
  API to get the list of attribute.
*/
exports.index =  function(req,res){
  var str = '{"product": {"tenantId": {"index": true,"isRequired": true,"instance": "String","type" : 0},"productId": {"index": {"unique": true,"background": true},"isRequired": true,"instance": "String"},"attributeValues": {"attributes": {"variantId": {"index": null,"instance": "String"},"classificationId": {"variantId": {"index": null,"instance": "String"},"classificationId": {"index": null,"isRequired": true,"instance": "String"}}},"attributeSec": {"index": null,"isRequired": true,"instance": "String"}}}}';
  var obj = JSON.parse(str);
  res.status(200).json(obj);
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
    delimeter: req.body.delimeter
  }).then(function(result){
    res.status(200).json();        
  }).catch(function(error){
    res.status(500).json(error);
  });
};


exports.uploadFileData = function(req, res) {
  console.log("=====upload file======", req.body);
  var data = req.body.file;

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
}
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

    return JSON.stringify(result); //JSON
}
