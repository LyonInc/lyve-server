'use strict';

const es = require('event-stream');
module.exports = function(app) {
  const QaModel = app.models.qa;
  QaModel.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });
};
