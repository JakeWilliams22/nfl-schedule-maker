'use strict';

require('rootpath')();

var nfl_teams = {
  1: new NFL_TEAM('Arizona', 'Cardinals'),
  2: new NFL_TEAM('Atlanta', 'Falcons'),
  3: new NFL_TEAM('Baltimore', 'Ravens'),
  4: new NFL_TEAM('Bufalo', 'Bills'),
  5: new NFL_TEAM('Carolina', 'Panthers'),
  6: new NFL_TEAM('Chicago', 'Bears'),
  7: new NFL_TEAM('Cincinnati', 'Bengals'),
  8: new NFL_TEAM('Cleveland', 'Browns'),
  9: new NFL_TEAM('Dallas', 'Cowboys'),
  10: new NFL_TEAM('Denver', 'Broncos'),
  11: new NFL_TEAM('Detroit', 'Lions'),
  12: new NFL_TEAM('Green Bay', 'Packers'),
  13: new NFL_TEAM('Houston', 'Texans'),
  14: new NFL_TEAM('Indianapolis', 'Colts'),
  15: new NFL_TEAM('Jacksonville', 'Jaguars'),
  16: new NFL_TEAM('Kansas City', 'Chiefs'),
  17: new NFL_TEAM('Miami', 'Dolphins'),
  18: new NFL_TEAM('Minnesota', 'Vikings'),
  19: new NFL_TEAM('New England', 'Patriots'),
  20: new NFL_TEAM('New Orleans', 'Saints'),
  21: new NFL_TEAM('New York', 'Giants'),
  22: new NFL_TEAM('New York', 'Jets'),
  23: new NFL_TEAM('Oakland', 'Raiders'),
  24: new NFL_TEAM('Philadelpia', 'Eagles'),
  25: new NFL_TEAM('Pittsburgh', 'Steelers'),
  26: new NFL_TEAM('San Diego', 'Chargers'),
  27: new NFL_TEAM('San Francisco', '49ers'),
  28: new NFL_TEAM('Seattle', 'Seahawks'),
  29: new NFL_TEAM('St. Louis', 'Rams'),
  30: new NFL_TEAM('Tampa Bay', 'Buccaneers'),
  31: new NFL_TEAM('Tennessee', 'Titans'),
  32: new NFL_TEAM('Washington', 'Redskins')
}

function NFL_TEAM(city, mascot) {
  this.city = city;
  this.mascot = mascot;
}

exports.NFL_TEAM = NFL_TEAM;
exports.nfl_teams = nfl_teams;