'use strict';

require('rootpath')();

module.exports = function(app, router) {
  router.get('/hello/', function(request, response) {
    response.send('Hi World!')
  });
  
  router.get('/', function(request, response) {
    response.send('Hello World!')
  });

  app.use(router);
};
