'use strict';

require('rootpath')();
require('res/schedule_dict');
var pg = require('pg');

function getRandomSchedule(req, res, next) {
  res.send(nfl_teams[0]);
}

exports.getRandomSchedule = getRandomSchedule;
