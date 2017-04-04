'use strict';

require('rootpath')();

// Required modules
var express = require('express');
var routes = require('routes/api');
var pg = require('pg');

// Create our Express application & define port
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))

// Connect the API routes with our router and app
routes(app, express.Router());

// Catch unused requests
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler, has to take in 4 params
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port, function () {
  console.log('Server is running on port', port);
});
console.log(process.env.DATABASE_URL);
// pg.connect('http://ec2-23-21-220-23.compute-1.amazonaws.com', function(err, client, done) {
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  // client.query("CREATE TABLE test(id SERIAL PRIMARY KEY)", function(err, result) {
    // done();
    // if(err) return console.error(err);
  // }); 
  console.log("EY");
});