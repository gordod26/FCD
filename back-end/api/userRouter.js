const express = require("express");
const db = require("../db");

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  pool.query(`SELECT * FROM "user"`, (err, resp) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(resp.rows);
    }
  });
});

module.exports = userRouter;
