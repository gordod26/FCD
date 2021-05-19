const express = require("express");
const db = require("../db");

const commentRouter = express.Router();

//PARAM Router for dpostId
//GET ALL COMMENTS
//GET COMMENT BY comment id
//GET Comments by DpostId
//

//GET ALL COMMENTS
commentRouter.get("/", (req, res, next) => {
  const sql = `SELECT * FROM cmmts `;
  db.query(sql, (err, r) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(r.rows);
    }
  });
});

//GET COMMENT BY comment id
commentRouter.get("/comment/:commentid", (req, res, next) => {
  const sql = `SELECT * FROM cmmts WHERE id = ${req.params.commentid}`;
  db.query(sql, (err, r) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(r.rows);
    }
  });
});

//GET Comments by dpost_id
//commentRouter.get("/dpost/:dpost_id", (req, res, next) => {
//const sql = `SELECT cmmts.* FROM cmmts WHERE dpost_id = ${req.params.dpost_id}`;
//db.query(sql, (err, r) => {
//if (err) {
//next(err);
//} else {
//res.status(200).json(r.rows);
//}
//});
//});
//GET Comments by dpost_id with INNERJOIN
commentRouter.get("/dpost/:dpost_id", (req, res, next) => {
  const sql = `SELECT cmmts.*, name, email, image FROM cmmts,users WHERE cmmts.user_id = users.id AND cmmts.dpost_id = ${req.params.dpost_id}`;
  db.query(sql, (err, r) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(r.rows);
    }
  });
});

//GET Comments by userid
commentRouter.get("/user/:user_id", (req, res, next) => {
  const sql = `SELECT * FROM cmmts WHERE user_id = ${req.params.user_id}`;
  db.query(sql, (err, r) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(r.rows);
    }
  });
});

//POST comment to DpostId
commentRouter.post("/dpost/:dpost_id", (req, res, next) => {
  const sql = `INSERT INTO cmmts (user_id, dpost_id, cmmt, path)
                VALUES ($1, $2, $3, $4)`;
  const user_id = req.body.userId,
    dpost_id = req.body.dpostId,
    cmmt = req.body.cmmt,
    path = req.body.path;

  if (!user_id || !dpost_id || !cmmt || !path) {
    return res.sendStatus(400);
  }
  const values = [user_id, dpost_id, cmmt, path];
  db.query(sql, values, (err, r) => {
    if (err) {
      next(err);
    } else {
      res.status(201).json(r.rows);
    }
  });
});

//POST reply to comment
commentRouter.post("/reply/:parentCommentId", (req, res, next) => {
  const sql = `INSERT INTO cmmts (user_id, dpost_id, parent_comment_id, cmmt)
                VALUES ($1, $2, $3, $4 ) RETURNING id`;
  const user_id = req.body.userId,
    dpost_id = req.body.dpostId,
    parent_comment_id = req.params.parentCommentId,
    cmmt = req.body.cmmt;

  if (!user_id || !dpost_id || !parent_comment_id || !cmmt) {
    return res.sendStatus(400);
  }
  const values = [user_id, dpost_id, parent_comment_id, cmmt];
  db.query(sql, values, (err, r) => {
    if (err) {
      next(err);
    } else {
      const lastId = r.rows[0].id;
      const newPath = req.body.parentPath;
      db.query(`INSERT INTO cmmts (path) VALUES($1)`, [
        `${req.body.parentPath}`,
      ]);
    }
  });
});

module.exports = commentRouter;
