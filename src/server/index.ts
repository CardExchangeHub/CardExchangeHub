import express, { Request, Response } from 'express';
import { Client } from 'pg';

// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
const port = 3000;

const db = new Client(
  'postgres://opwlobos:OqX_0FRKl6jbRTbtUdaRKZyx1x1ctHHI@drona.db.elephantsql.com/opwlobosg'
);

db.connect();
// this will allow us to grab all users from the database on the root route
app.use('/auth', require());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
