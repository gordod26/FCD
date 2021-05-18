import { Pool } from "pg";


//initiate and export pool so you don't have to remake pool object. just import
// this doc
const pool = new Pool({
  user: "david",
  host: "localhost",
  database: "fellowshipdb",
  port: 5432,
});

export default function (text, params, callback) => {
    return pool.query(text, params, callback);
  }

