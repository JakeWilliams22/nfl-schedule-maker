'use strict';

require('rootpath')();
require(pg);

function createPreferencesTable() {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("CREATE TABLE IF NOT EXISTS preferences(id SERIAL PRIMARY KEY, name TEXT NOT NULL, priority INT, team TEXT, scheduleYear INT)", function(err, result) {
      done();
      if(err) return console.error(err);
      console.log(result.rows);
    }); 
  });
}

exports.createPreferencesTable = createPreferencesTable;