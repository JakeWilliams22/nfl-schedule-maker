'use strict';

require('rootpath')();
var sched_dict = require('res/schedule_dict');
var pg = require('pg');

function getRandomSchedule(req, res, next) {
  res.send(sched_dict.nfl_teams[1].city);
}

exports.getRandomSchedule = getRandomSchedule;
