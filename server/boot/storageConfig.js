'use strict';

const getFileExtension = require('file-extension');
const path = require('path');
const uuid = require('uuid/v4');

module.exports = function(app) {
  app.dataSources.storage.connector.getFilename = function(uploadingFile, req, res) {
    const fileExtension = getFileExtension(uploadingFile.name);
    const fileName = path.parse(uploadingFile.name).name;
    return `${uuid()}-${fileName}.${fileExtension}`;
  };
};
