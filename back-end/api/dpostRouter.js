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

//GET ALL DPOSTS
dpostRouter.get("/", (req, res, next) => {
  db.query(
    `SELECT dposts.*, name, email, image FROM Dposts, users WHERE dposts.user_id = users.id`,
    (err, r) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(r.rows);
      }
    }
  );
});

// GET ALL DPOST IDs for GETSTATICPATHS
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

//GET DPOST BY USERID /userposts/:userId
dpostRouter.get("/userposts/:userId", (req, res, next) => {
  db.query(
    `SELECT * FROM Dposts WHERE user_id = ${req.params.userId}`,
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

// POST: SEND 400 BAD REQUEST if no user_id, title, or both/none url and text
dpostRouter.post("/", (req, res, next) => {
  const sql = `INSERT INTO Dposts (user_id, title, url, text)
                VALUES ($1, $2, $3, $4)`;
  const userId = req.body.userId,
    title = req.body.title,
    url = req.body.url ? req.body.url : "",
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
