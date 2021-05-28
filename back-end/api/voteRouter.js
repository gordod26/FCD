const express = require("express");
const db = require("../db");

const voteRouter = express.Router();

///////////////////////////////////////////////////////////////////////////////
//GET REQUEST PREVENTS DOUBLE VOTE/////////////////////////////////////////////
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
// PUT: UPDATES DPOST VOTES COLUMN /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
voteRouter.get("/:postId", (req, res, next) => {
  const postId = req.params.postId;
  db.query(
    `SELECT post_id, count(*) AS vote_count FROM votes 
    WHERE post_id = ${postId}
    GROUP BY post_id`,
    (err, r) => {
      if (err) {
        next(err);
      } else {
        if (r.rows) {
          const postLikes = parseInt(r.rows[0].vote_count);
          db.query(
            `UPDATE dposts SET votes = $1 WHERE id = $2`,
            [postLikes, postId],
            (err, r) => {
              if (err) {
                next(err);
              } else {
                console.log(`dpost(${postId}) put votes(${postLikes})`);
                res.sendStatus(200);
              }
            }
          );
        }
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////
//DELETE VOTE//////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
voteRouter.delete("/", (req, res, next) => {
  const deletesql = "DELETE FROM votes WHERE user_id = $1 AND post_id = $2";
  const checksql =
    "SELECT post_id, count(*) as count FROM votes WHERE post_id = $1 GROUP BY post_id";
  const userId = req.body.userId;
  const postId = req.body.postId;
  db.query(checksql, [postId], (err, r) => {
    if (err) {
      next(err);
    } else if (parseInt(r.rows[0].count) <= 1) {
      return res.status(200).json("can't remove vote if only 1 vote exists");
    } else if (parseInt(r.rows[0].count) > 1) {
      console.log(parseInt(r.rows[0].count));
      db.query(deletesql, [userId, postId], (err, r) => {
        if (err) {
          next(err);
        } else {
          return res.sendStatus(204);
        }
      });
    }
  });
  //db.query(deletesql, [userId, postId], (err) => {
  //if (err) {
  //next(err);
  //} else {
  //return res.sendStatus(204);
  //}
  //});
});

module.exports = voteRouter;
