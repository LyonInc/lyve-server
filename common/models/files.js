'use strict';

const CONTAINERS_URL = '/api/containers/';
module.exports = function(Files) {
  Files.upload = function(ctx, options, container, cb) {
    if (!options) options = {};
    ctx.req.params.container = container;
    Files.app.models.container.upload(ctx.req, ctx.result, options, function(err, fileObj) {
      if (err) {
        cb(err);
      } else {
        const fileInfo = fileObj.files.file[0];
        Files.create({
          name: fileInfo.name,
          type: fileInfo.type,
          container: fileInfo.container,
          url: CONTAINERS_URL + fileInfo.container + '/download/' + fileInfo.name,
        }, function(err, obj) {
          if (err !== null) {
            cb(err);
          } else {
            cb(null, obj);
          }
        });
      }
    });
  };

  Files.observe('before delete', (context, next) => {
    const container = Files.app.models.container;

    Files.findOne({where: context.where}, (error, asset) => {
      if (error) return next(error);

      const fileName = asset.name;
      const containerName = asset.url.slice((asset.url.indexOf('containers/') + 11), (asset.url.indexOf('/download')));
      console.log(containerName);
      container.removeFile(containerName, fileName, (error, reply) => {
        if (error) {
          console.log(asset);
          return next(new Error(error));
        }

        next();
      });
    });
  });

  Files.remoteMethod(
    'upload',
    {
      description: 'Uploads a file',
      accepts: [
        {arg: 'ctx', type: 'object', http: {source: 'context'}},
        {arg: 'options', type: 'object', http: {source: 'query'}},
        {arg: 'container', type: 'string', required: true},
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true,
      },
      http: {verb: 'post'},
    }
  );

};
