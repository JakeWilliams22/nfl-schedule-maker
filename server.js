Skip to content
This repository
Search
Pull requests
Issues
Gist
 @JakeWilliams22
 Sign out
 Unwatch 7
  Unstar 4
  Fork 0 moola-engineering/Moola-Backend Private
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Pulse  Graphs
Branch: master Find file Copy pathMoola-Backend/server.js
d870818  18 days ago
 Bradford Ware more changes
3 contributors @rbro112 @JakeWilliams22 @bradware
RawBlameHistory     
79 lines (66 sloc)  1.91 KB
'use strict';

require('rootpath')();

// Required modules
var express = require('express');
var mongoose = require('mongoose');
var helmet = require('helmet');
var logger = require('morgan');
var config = require('config')();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('routes/api');

// Create our Express application & define port
var app = express();
var port = process.env.PORT || 3000;

// MongoDB setup
mongoose.connect(config.mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', function (err) {
  console.error('Connection error to Moola DB:', err);
});

// Middleware setup
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Session & Token management setup
var sess = {
  secret: 'moola-secret-key',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: db}),
  cookie: {maxAge: 900000} // 15 minute expiration for session TODO: Figure out session management
};
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userID;
  next();
});

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
Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help