'use strict';

require('rootpath')();
var pg = require('pg');

function createPreferencesTable() {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("CREATE TABLE IF NOT EXISTS preferences(id SERIAL PRIMARY KEY, name TEXT NOT NULL, priority INT, team TEXT, scheduleYear INT)", function(err, result) {
      done();
      if(err) return console.error(err);
      console.log("Success");
    }); 
  });
}

function testPreferenceInsert() {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("INSERT INTO preferences VALUES (2, 'test', 1, 'panthers', 2017);", function(err, result) {
      done();
      if(err) return console.error(err);
    });
  });
}

function testPreferenceGet(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM preferences;", function(err, result) {
      done();
      if(err) return console.error(err);
      res.send(result.rows)
    });
  });
}

exports.createPreferencesTable = createPreferencesTable;
exports.testPreferenceInsert = testPreferenceInsert;
exports.testPreferenceGet = testPreferenceGet;