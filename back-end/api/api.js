const express = require("express");
const dpostRouter = require("./dpostRouter");
const helperRouter = require("./helperRouter");
const commentRouter = require("./commentRouter");
const voteRouter = require("./voteRouter");

const apiRouter = express.Router();

apiRouter.use("/dpost", dpostRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/helper", helperRouter);
apiRouter.use("/vote", voteRouter);

module.exports = apiRouter;
