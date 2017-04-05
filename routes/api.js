'use strict';

require('rootpath')();
var pg = require('pg');
var dbUtils = require('controllers/dbSetup')

module.exports = function(app, router) {
  router.get('/dbTest/', function(request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      client.query("SELECT * FROM test", function(err, result) {
        done();
        if(err) return console.error(err);
        console.log('success');
      }); 
    });
    response.send('Hi World!')
  });
  
  router.get('/', function(request, response) {
    response.send('WELCOME COLE')
  });
  
  router.get('/createPreferencesTable', function() {
    dbUtils.createPreferencesTable();
  });

  app.use(router);
};
