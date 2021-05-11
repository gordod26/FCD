const { response } = require("express");
const express = require("express");
const db = require("../db");

const dpostRouter = express.Router();
// ROUTER: dpostRouter
// TABLE: Dposts
// PARAM: dpostId

dpostRouter.param("dpostId", (req, res, next, dpostId) => {
  const sql = "SELECT * FROM Dposts WHERE Dposts.id = $1";
  const values = [dpostId];
  db.query(sql, values, (err, request) => {
    if (err) {
      next(err);
    } else if (request.rows) {
      req.dposts = request.rows;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

dpostRouter.get("/", (req, res, next) => {
  db.query(`SELECT * FROM Dposts`, (err, request) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(request.rows);
    }
  });
});

dpostRouter.get("/:dpostId", (req, res, next) => {
  db.query(
    `SELECT * FROM Dposts WHERE id = ${req.params.dpostId}`,
    (err, request) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ dpost: request.rows });
      }
    }
  );
});

// POST: SEND 400 BAD REQUEST if no user_id, title, or both/none url and text
dpostRouter.post("/", (req, res, next) => {
  const sql = `INSERT INTO Dposts (user_id, title, url, text)
                VALUES ($1, $2, $3, $4)`;
  const userId = req.body.userId,
    title = req.body.title,
    url = req.body.url ? req.body.dpost.url : "",
    text = req.body.text ? req.body.text : "";

  if (!userId || !title || (url && text) || (!url && !text)) {
    return res.sendStatus(400);
  }
  const values = [userId, title, url, text];
  db.query(sql, values, (err, response) => {
    if (err) {
      next(err);
    } else {
      res.status(201).json({ dpost: response.rows });
    }
  });
});

dpostRouter.put("/:dpostId", (req, res, next) => {
  const sql = `UPDATE Dposts SET user_id=$1, title=$2, url=$3, text=$4 WHERE id = $5`;
  const userId = req.body.dpost.userId,
    title = req.body.dpost.title,
    url = req.body.dpost.url ? req.body.dpost.url : "",
    text = req.body.dpost.text ? req.body.dpost.text : "",
    id = req.params.dpostId;
  const values = [userId, title, url, text, id];

  if (!userId || !title || (url && text) || (!url && !text)) {
    return res.sendStatus(400);
  }
  db.query(sql, values, (err, response) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ dpost: response });
    }
  });
});

dpostRouter.delete("/:dpostId", (req, res, next) => {
  const sql = "DELETE FROM Dposts WHERE id = $1";
  const values = [req.params.dpostId];
  db.query(sql, values, (err, response) => {
    if (err) {
      next(err);
    } else {
      return res.sendStatus(204);
    }
  });
});

module.exports = dpostRouter;
