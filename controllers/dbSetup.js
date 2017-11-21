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

function createTokenTable(req, res, next) {
  console.log(process.env.DATABASE_URL)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("CREATE TABLE IF NOT EXISTS tokens(\
                    token TEXT PRIMARY KEY, \
                    user_type TEXT NOT NULL)", function(err, result) {
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
               " SET password = '" + req.body.password +
               "' WHERE username = '" + req.body.username + "';"
  console.log(iQuery)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(iQuery, function(err, result) {
      done();
      if(err) return res.send(err);
      res.send("Password change success");
    });
  });
}

function getUser(req, res, next) {
  var iQuery = "SELECT fname, lname, email" + 
               " FROM users" +
               " WHERE username = '" + req.body.username + "';"
  console.log(iQuery)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(iQuery, function(err, result) {
      done();
      if(err) return res.send(err);
      res.send(result.rows)
    });
  });
}

// Sets all fields except password
function updateUser(req, res, next) {
  var iQuery = "UPDATE users " + 
               "SET fname = '" + req.body.fname + "', " +
               "lname = '" + req.body.lname + "', " +
               "email = '" + req.body.email + "' " +
               "WHERE username = '" + req.body.username + "';"
  console.log(iQuery)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(iQuery, function(err, result) {
      done();
      if(err) return res.send(err);
      res.send("Update user success");
    });
  });
}

function login(req, res, next) {
  var sQuery = " SELECT * FROM users " +
                " WHERE username = '" + req.body.username + "' " + 
                " AND password = '" + req.body.password + "';"
  console.log(sQuery)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(sQuery, function(err, result) {
      done();
      if(err) return res.send(err)
      if(results.length > 0) {
        var user_type = results[0]['type']
        var token = generateToken()
        insertToken(token, user_type)
        return res.send(token)
      }
      res.send("0") 
    })
  })
}

function generateToken() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function insertToken(token, user_type) {
  var iQuery = "INSERT INTO tokens VALUES ('" +
                token + "','" + user_type + "';";
  console.log(iQuery)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(iQuery, function(err, result) {
      done()
      if(err) return res.send(err)
      res.send("Token Insert Success")
    })
  })
}

function getUserType(req, res, next) {
  var sQuery = "SELECT user_type FROM tokens " +
                " WHERE token = '" + req.body.token + "'; "
  console.log(sQuery)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(sQuery, function(err, result) {
      done();
      if (err) return res.send(err)
      res.send(result.rows)
    })
  }) 
}

exports.createUsersTable = createUsersTable;
exports.testUserInsert = testUserInsert;
exports.testUserGet = testUserGet;
exports.deleteUser = deleteUser;
exports.insertUser = insertUser;
exports.changePassword = changePassword;
exports.getUser = getUser;
exports.updateUser = updateUser;

exports.login = login
exports.getUserType = getUserType
exports.createTokenTable = createTokenTable
