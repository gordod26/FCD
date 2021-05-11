const express = require("express");
const db = require("../db");

const helperRouter = express.Router();

//get userId by email
helperRouter.get("/getidbyemail/:email", (req, res, next) => {
  const sql = `SELECT id FROM users WHERE email=$1`;
  const values = [req.params.email];
  db.query(sql, values, (err, r) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(r.rows[0].id);
    }
  });
});

helperRouter.get("/getnamebyid/:id", (req, res, next) => {
  const sql = `SELECT name FROM users WHERE id=$1`;
  const values = [req.params.id];
  db.query(sql, values, (err, r) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(r.rows[0].name);
    }
  });
});

module.exports = helperRouter;
