// eslint-disable-next-line @typescript-eslint/no-var-requires
import pg from 'pg';

const { Pool } = pg;


const PG_URI = 'postgres://xxxnxtap:UTgcZo9f1658YnvDpHpYDhY0MvC4gWbA@rajje.db.elephantsql.com/xxxnxtap'
// create a new pool here using the connection string above...pools all querys together so you can credit a single connection
const pool = new Pool({
  connectionString: PG_URI,
});

// Adding some notes about the database here will be helpful for future you or other developers.

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
export default pool;