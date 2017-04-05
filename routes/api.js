'use strict';

require('rootpath')();
var pg = require('pg');

module.exports = function(app, router) {
  router.get('/hello/', function(request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      // client.query("CREATE TABLE test(id SERIAL PRIMARY KEY)", function(err, result) {
      client.query("SELECT * FROM TABLE test", function(err, result) {
        done();
        if(err) return console.error(err);
        console.log(result.rows);
      }); 
    });
    response.send('Hi World!')
  });
  
  router.get('/', function(request, response) {
    response.send('Hello World!')
  });

  app.use(router);
};
