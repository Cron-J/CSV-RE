'use strict';

var express = require('express'),
    controller = require('./csv.controller'),
    router = express.Router();

router.get('/', controller.index);
router.get('/getMappingList', controller.getMappingList);
router.post('/', controller.create);
router.post('/uploadfile', controller.uploadFileData);
module.exports = router;
