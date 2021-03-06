'use strict';

require('rootpath')();

// Required modules
var express = require('express');
var routes = require('routes/api');
var bodyParser = require('body-parser')

// Create our Express application & define port
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

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

