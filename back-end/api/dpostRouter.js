const express = require("express");
const db = require("../db");

const dpostRouter = express.Router();
// ROUTER: dpostRouter
// TABLE: Dposts
// PARAM: dpostId

dpostRouter.param("dpostId", (req, res, next, dpostId) => {
  const sql = "SELECT * FROM dposts WHERE dposts.id = $1";
  const values = [dpostId];
  db.query(sql, values, (err, r) => {
    if (err) {
      next(err);
    } else if (r.rows) {
      req.dposts = r.rows;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////
// GET DPOSTS SORTED BY NEW/VOTES //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
dpostRouter.get("/sort/:sortMethod/:sortGroup", (req, res, next) => {
  const sortGroup = req.params.sortGroup;
  if (req.params.sortMethod === "new" && sortGroup === "discussion") {
    db.query(
      `SELECT dposts.*, name, email, image 
     FROM Dposts, users 
     WHERE dposts.user_id = users.id AND dposts.post_type = 'discussion'
      ORDER BY dposts.created_at DESC`,
      (err, r) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json(r.rows);
          console.log("sort NEW");
        }
      }
    );
  } else if (req.params.sortMethod === "votes" && sortGroup === "discussion") {
    db.query(
      `SELECT dposts.*, name, email, image 
     FROM Dposts, users 
     WHERE dposts.user_id = users.id AND post_type = 'discussion'
      ORDER BY dposts.votes DESC`,
      (err, r) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json(r.rows);
          console.log("sort VOTES");
        }
      }
    );
  } else if (req.params.sortMethod === "new" && sortGroup === "project") {
    db.query(
      `SELECT dposts.*, name, email, image 
     FROM Dposts, users 
     WHERE dposts.user_id = users.id AND dposts.post_type = 'project'
      ORDER BY dposts.created_at DESC`,
      (err, r) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json(r.rows);
          console.log("sort NEW");
        }
      }
    );
  } else if (req.params.sortMethod === "votes" && sortGroup === "project") {
    db.query(
      `SELECT dposts.*, name, email, image 
     FROM Dposts, users 
     WHERE dposts.user_id = users.id AND dposts.post_type = 'project'
      ORDER BY dposts.votes DESC`,
      (err, r) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json(r.rows);
          console.log("sort NEW");
        }
      }
    );
  }
});

///////////////////////////////////////////////////////////////////////////////
// GET ALL DPOST IDs for GETSTATICPATHS in ////////////////////////////////////
// ~./fcd/front-end/pages/posts/[index] ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
dpostRouter.get("/dpostids", (req, res, next) => {
  db.query(`SELECT id FROM Dposts`, (err, r) => {
    if (err) {
      next(err);
    } else {
      const mappedids = r.rows.map((row) => {
        const index = row.id.toString();
        return { params: { index } };
      });
      res.status(200).json(mappedids);
    }
  });
});
///////////////////////////////////////////////////////////////////////////////
//GET DPOST BY USERID /userposts/:userId to a users posts their own posts//////
///////////////////////////////////////////////////////////////////////////////
dpostRouter.get("/userposts/:userId", (req, res, next) => {
  db.query(
    `SELECT dposts.*, name, email, image 
     FROM Dposts, users
     WHERE dposts.user_id = users.id AND user_id = ${req.params.userId}
     ORDER BY dposts.created_at DESC`,
    (err, r) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(r.rows);
      }
    }
  );
});
//GET SPECIFIC DPOST
dpostRouter.get("/:dpostId", (req, res, next) => {
  db.query(
    `SELECT * FROM Dposts WHERE id = ${req.params.dpostId}`,
    (err, r) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ dpost: r.rows });
      }
    }
  );
});
///////////////////////////////////////////////////////////////////////////////
// POST: SEND 400 BAD REQUEST if no user_id, title, or both/none url and text//
///////////////////////////////////////////////////////////////////////////////
dpostRouter.post("/", (req, res, next) => {
  const sql = `INSERT INTO Dposts (user_id, title, url, text, post_type)
                VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  const userId = req.body.userId,
    postType = req.body.postType,
    title = req.body.title,
    url = req.body.url ? req.body.url : "",
    text = req.body.text ? req.body.text : "";

  if (!userId || !title || (url && text) || (!url && !text) || !postType) {
    return res.sendStatus(400);
  } else {
    const values = [userId, title, url, text, postType];
    db.query(sql, values, (err, r) => {
      if (err) {
        next(err);
      } else {
        const lastId = r.rows[0].id;
        db.query(`INSERT INTO votes VALUES (${userId}, ${lastId})`);
        res.status(201).json({ dpost: r.rows });
      }
    });
  }
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
