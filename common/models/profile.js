'use strict';

const uuidV4 = require('uuid/v4');

module.exports = function(Profile) {
  Profile.observe('before save', function(ctx, cb) {
    if (ctx.instance) {
      ctx.instance.id = uuidV4();
    } else {
      ctx.data.id = uuidV4();
    }
    cb();
  });
};
