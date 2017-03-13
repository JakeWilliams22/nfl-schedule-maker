'use strict';

require('rootpath')();

module.exports = function(app, router) {
  // CORS
  router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', ' Access-Control-Allow-Origin: https://moola-api-staging.herokuapp.com', 'X-Requested-With, Authorization, Content-Type, Username, Password, Token');
    next();
  });

  // AUTH
  router.get('/hello/', function(request, response) {
    response.send('Hi World!')
  });
  
  router.get('/', function(request, response) {
    response.send('Hello World!')
  });

  // APP now using router
  app.use(router);
};
