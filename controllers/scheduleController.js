'use strict';

require('rootpath')();
var sched_dict = require('res/schedule_dict');
var pg = require('pg');

var gamesPerTeam = 16;
var numGames = 256;

function getRandomSchedule(req, res, next) {
  var nfl_teams = sched_dict.nfl_teams;
  nfl_teams.resetNumGames();
  var games = [];
  var teamIndex = 0;
  for (var game = 0; game < numGames; game++) {
    var team = nfl_teams[teamIndex];
    var opponent;
    do {
      var opponentNum = Math.floor((Math.random() * 32));
      opponent = nfl_teams[opponentNum];
    } while (opponent.numGames >= gamesPerTeam);
        
    games.push([team,opponent]);
    
    team.numGames = team.numGames + 1;
    opponent.numGames = opponent.numGames + 1;
    var start = teamIndex;
    while(teamIndex < 32 && nfl_teams[teamIndex].numGames >= gamesPerTeam) {
      teamIndex = (teamIndex + 1) % 32;
      if (teamIndex == start) {
        break;
      }
    }
  }
  console.log("done");
  res.send(games);
}

exports.getRandomSchedule = getRandomSchedule;
