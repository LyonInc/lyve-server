'use strict';

const es = require('event-stream');
module.exports = function(app) {
  const ChatModel = app.models.chat;
  ChatModel.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });
};
