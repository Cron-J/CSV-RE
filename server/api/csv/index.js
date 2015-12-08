'use strict';

var express = require('express'),
    controller = require('./csv.controller'),
    router = express.Router(),
    MulterImpl = require('../../middleware/MulterImpl.js'),
    csvImporter = new MulterImpl({}).init();

router.get('/', controller.index);
router.get('/getMappingList', controller.getMappingList);
router.get('/getMapping/:id', controller.getMapping);
router.get('/getSynonyms', controller.synonyms);
router.post('/', controller.create);
router.post('/uploadfile', controller.uploadFileData);
router.post('/uploadCSV',csvImporter.any(), controller.uploadCSV);
router.get('/getCSVdata/:id/:tenantId', controller.getMappingCSVData);
router.put('/updateMapping/:id/:tenantId', controller.update);

module.exports = router;
