const express = require("express");
const db = require("../db");

const voteRouter = express.Router();

///////////////////////////////////////////////////////////////////////////////
//GET REQUEST/////////////////////////////
///////////////////////////////////////////////////////////////////////////////
voteRouter.get("/:userId/:postId", (req, res, next) => {
  db.query(
    `SELECT * FROM votes WHERE user_id = $1 AND post_id = $2`,
    [req.params.userId, req.params.postId],
    (err, r) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ vote: r.rows });
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////
//POST: SEND 400 BAD REQUEST if !userId or !postId/////////////////////////////
///////////////////////////////////////////////////////////////////////////////
voteRouter.post("/", (req, res, next) => {
  const sql = `INSERT INTO votes (user_id, post_id )
                VALUES ($1, $2)`;
  const userId = req.body.userId;
  const postId = req.body.postId;

  if (!userId || !postId) {
    return res.sendStatus(400);
  }
  db.query(sql, [userId, postId], (err) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(201);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////
//DELETE VOTE//////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
voteRouter.delete("/", (req, res, next) => {
  const sql = "DELETE FROM votes WHERE user_id = $1 AND post_id = $2";
  const userId = req.body.userId;
  const postId = req.body.postId;
  db.query(sql, [userId, postId], (err) => {
    if (err) {
      next(err);
    } else {
      return res.sendStatus(204);
    }
  });
});

module.exports = voteRouter;
