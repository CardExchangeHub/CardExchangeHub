// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require('pg');

const PG_URI =
  'postgres://opwlobos:OqX_0FRKl6jbRTbtUdaRKZyx1x1ctHHI@drona.db.elephantsql.com/opwlobosg';

// create a new pool here using the connection string above...pools all querys together so you can credit a single connection
const pool = new Pool({
  connectionString: PG_URI,
});

// Adding some notes about the database here will be helpful for future you or other developers.

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
