'use strict';

require('rootpath')();
var pg = require('pg');

function createUsersTable(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("CREATE TABLE IF NOT EXISTS users( fName TEXT NOT NULL, \
                                                    lName TEXT NOT NULL, \
                                                    email TEXT NOT NULL, \
                                                    username TEXT PRIMARY KEY, \
                                                    password TEXT NOT NULL, \
                                                    type TEXT NOT NULL)", function(err, result) {
      done();
      if(err) return res.send(err);
      res.send("Creation Success");
    }); 
  });
}

function testUserInsert(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("INSERT INTO users VALUES ('kelly', 'fitzpatrick', 'kfitz@gatech.edu', 'kfitz', 'ilovegroup7100', 'admin');", function(err, result) {
      done();
      if(err) return res.send(err);
      res.send("Insert Success");
    });
  });
}

function testUserGet(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM users;", function(err, result) {
      done();
      if(err) return console.error(err);
      res.send(result.rows)
    });
  });
}

function deleteUser(req, res, next) {
  console.log(req.username)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("DELETE FROM users WHERE\
                      username = " + req.body.username, function(err, result) {
      done();
      if(err) return res.send(err);
      res.send("Creation Success");
    }); 
  });
}

exports.createUsersTable = createUsersTable;
exports.testUserInsert = testUserInsert;
exports.testUserGet = testUserGet;
exports.deleteUser = deleteUser;