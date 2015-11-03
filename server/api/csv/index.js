'use strict';

var express = require('express'),
    controller = require('./csv.controller'),
    router = express.Router(),
    MulterImpl = require('../../middleware/MulterImpl.js'),
    csvImporter = new MulterImpl({}).init();

router.get('/', controller.index);
router.get('/getMappingList', controller.getMappingList);
router.post('/', controller.create);
router.post('/uploadfile', controller.uploadFileData);
router.post('/uploadCSV',csvImporter.any(), controller.uploadCSV);
module.exports = router;
