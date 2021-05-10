const db = require("./index.js");

// Dposts Dummy Data
// USERID TITLE URL/TEXT VOTES
const query = `INSERT INTO Dposts (
          user_id, title, url, text, votes)
          VALUES ($1, $2,
          $3, $4, $5)`;

const values1 = [
  1,
  "CS LEWIS COMPLETE COLLECTION",
  "https://www.cslewis.com/uk/",
  "",
  3,
];
const values2 = [
  1,
  "Jordan Peterson Biblical Lectures",
  "https://www.youtube.com/watch?v=f-wWBGo6a2w",
  "",
  26,
];

const values3 = [
  1,
  "Dallas Megachurch Pastor Todd Wagner Resigns,",
  "https://churchleaders.com/news/395546-dallas-megachurch-pastor-todd-wagner-announces-resignation.html",
  "",
  8,
];

const values4 = [
  1,
  "Question on Jesus' ancestry in a historical, rather than a religious context",
  "",
  `Both books consider Jesus a grandson of Herod the Great`,
  1,
];

db.query(query, values1, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
db.query(query, values2, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
db.query(query, values3, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
db.query(query, values4, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
