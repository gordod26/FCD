const { Pool } = require("pg");

const pool = new Pool({
  user: "david",
  host: "localhost",
  database: "fellowshipdb",
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
