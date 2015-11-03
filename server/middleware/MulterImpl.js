'use strict';
import multer from 'multer';
function MulterImpl(config) {
    var defaultDest = 'uploads/';
    this.init = function () {
        var uploadDir = !config.uplodaDir ? defaultDest : config.uplodaDir;
        var options = {
            dest: uploadDir,
            rename: function (fieldname, filename) {
                console.log('file rename',filename);
                return filename + Date.now();
            },
            onFileUploadStart: function (file) {
                console.log(file.originalname + ' is starting ...');
            },
            onFileUploadComplete: function (file) {
                console.log(file.fieldname + ' uploaded to  ' + file.path);
            }
        };

        return multer(options);
    }
}

module.exports = MulterImpl;