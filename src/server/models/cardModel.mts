import pg from 'pg';
const { Pool } = pg;

//use PROD_DB for main database
const PG_URI = process.env.PROD_DB;

const pool = new Pool({
  connectionString: PG_URI,
});

export default pool;
