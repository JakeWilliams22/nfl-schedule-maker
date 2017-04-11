'use strict';

require('rootpath')();
var sched_dict = require('res/schedule_dict');
var pg = require('pg');
var nfl_teams = sched_dict.nfl_teams;

var games = [];

function getRandomSchedule(req, res, next) {
//  res.send(sched_dict.nfl_teams[1].city);
  var teamIndex = 0;
  for (var game = 0; game < 256; game++) {
    var team = nfl_teams[teamIndex];
    var opponent;
    do {
      opponent = nfl_teams[Math.floor((Math.random() * (31-teamIndex)) + teamIndex + 1)];
    } while (opponent.numGames >= 16);
    
    if (opponent.mascot == team.mascot) {
      console.log("OPPONENT BAD ");
    }
    
    games.push([team,opponent]);
    
    team.numGames = team.numGames + 1;
    opponent.numGames = opponent.numGames + 1;
    if(team.numGames >= 16) {
      teamIndex++;
    }
  }
  
  res.send(games);
}

exports.getRandomSchedule = getRandomSchedule;
