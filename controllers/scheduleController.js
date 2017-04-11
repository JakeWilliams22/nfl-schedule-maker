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
  
  for(var teamNum = 0; teamNum < 31; teamNum = teamNum + Math.floor(Math.random() * 2)) {
    var team = nfl_teams[teamNum];
    for(var gamesPlayed = team.numGames; gamesPlayed < 16; gamesPlayed++) {
      var opponent = nfl_teams[(teamNum + 1) % 32];
      for(var possibleOpponentNum = Math.floor(Math.random()*32); possibleOpponentNum < 32; possibleOpponentNum++) {
        var potentialOpponent = nfl_teams[possibleOpponentNum];
        if (potentialOpponent.numGames < opponent.numGames && possibleOpponentNum != teamNum
              && team.opponentList.indexOf(potentialOpponent.mascot) == -1) {
          opponent = potentialOpponent;
        }
      }
      
      team.numGames = team.numGames + 1;
      opponent.numGames = opponent.numGames + 1;
      
      team.opponentList.push(opponent.mascot);
      opponent.opponentList.push(team.mascot);
      
      var game = [team, opponent];
      
      // team.gameList.push(game);
      // opponent.gameList.push(game);
      
      games.push(game);
    }
  }
  
  console.log("done");
  res.send(games);
}

exports.getRandomSchedule = getRandomSchedule;
