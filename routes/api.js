'use strict';

require('rootpath')();
var pg = require('pg');
var dbUtils = require('controllers/dbSetup')
var scheduleController = require('controllers/scheduleController');

module.exports = function(app, router) {
  router.get('/', function(request, response) {
    response.send('WELCOME COLE')
  });
  
  router.get('/createPreferencesTable',dbUtils.createPreferencesTable)
  
  router.get('/testPreferenceInsert', dbUtils.testPreferenceInsert)
  
  router.get('/testPreferenceGet', dbUtils.testPreferenceGet);

  router.get('/getRandomSchedule', scheduleController.getRandomSchedule);

  router.get('/dummySchedule',scheduleController.fakeSchedule);
  
  app.use(router);
};
