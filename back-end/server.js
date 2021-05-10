const express = require("express");
const db = require("./db/index");
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const cors = require("cors");
const apiRouter = require("./api/api");

const app = express();
const port = 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);

app.use(errorhandler());

app.listen(port, () => {
  console.log(`app listening for requests at http://localhost:${port}`);
});
