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

function insertUser(req, res, next) {
  var iQuery = "INSERT INTO users VALUES ('" + 
                              req.body.fName + "','" + 
                              req.body.lName + "','" + 
                              req.body.email + "','" + 
                              req.body.username + "','" + 
                              req.body.password + "','" + 
                              req.body.type + "')"
  console.log(iQuery)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(iQuery , function(err, result) {
      done();
      if(err) return res.send(err);
      res.send("Insertion Success");
    }); 
  });
}

function deleteUser(req, res, next) {
  console.log("HERE")
  console.log(String(req.body.username))
  var dQuery = "DELETE FROM users WHERE username = '" + String(req.body.username) + "'"
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(dQuery , function(err, result) {
      done();
      if(err) return res.send(err);
      res.send("Deletion Success");
    }); 
  });
}

function changePassword(req, res, next) {
  var iQuery = "UPDATE users" + 
               " SET password = " + req.body.password +
               " WHERE username = " + req.body.username + ";"
  console.log(iQuery)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(iQuery, function(err, result) {
      done();
      if(err) return res.send(err);
      res.send("Password change success");
    });
  });
}

exports.createUsersTable = createUsersTable;
exports.testUserInsert = testUserInsert;
exports.testUserGet = testUserGet;
exports.deleteUser = deleteUser;
exports.insertUser = insertUser;
exports.changePassword = changePassword;