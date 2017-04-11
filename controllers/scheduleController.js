'use strict';

require('rootpath')();
var sched_dict = require('res/schedule_dict');
var pg = require('pg');
nfl_teams = sched_dict.nfl_teams;

games = [];

function getRandomSchedule(req, res, next) {

  var teamIndex = 0;
  for (var game = 0; game < 256; game++) {
    team = nfl_teams[teamIndex];
    opponentNum = Math.floor((Math.random() * (31-teamIndex)) + teamIndex + 1);
    games.push([nfl_teams[teamIndex],nfl_teams[opponentNum]]);
    
    if(team.numGames == 16) {
      teamIndex++;
    }
  }
  
  res.send(games);
}

exports.getRandomSchedule = getRandomSchedule;
