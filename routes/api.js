'use strict';

require('rootpath')();
var dbUtils = require('controllers/dbSetup')

module.exports = function(app, router) {
  router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', ' Access-Control-Allow-Origin: http://nfl-schedule-maker.herokuapp.com/', 'X-Requested-With, Authorization, Content-Type, Username, Password, Token');
    next();
  });
  
  router.get('/', function(request, response) {
    response.send('WELCOME COLE')
  });
  
  router.get('/createUsersTable',dbUtils.createUsersTable);
  
  router.get('/testUsersInsert', dbUtils.testUserInsert);
  
  router.get('/testUsersGet', dbUtils.testUserGet);
  
  router.post('/deleteUser', dbUtils.deleteUser);
  
  router.post('/insertUser', dbUtils.insertUser);

  router.post('/changePassword', dbUtils.changePassword);

  router.post('/getUser', dbUtils.getUser);  

  router.post('/updateUser', dbUtils.updateUser);
  
  router.get('/createTokenTable', dbUtils.createTokenTable);
  
  router.post('/login', dbUtils.login);
  
  router.post('/getUserType', dbUtils.getUserType);
  
  router.post('/logout', dbUtils.logout);
  
  app.use(router);
};
