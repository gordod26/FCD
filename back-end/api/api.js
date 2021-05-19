const express = require("express");
const dpostRouter = require("./dpostRouter");
const helperRouter = require("./helperRouter");
const commentRouter = require("./commentRouter");

const apiRouter = express.Router();

apiRouter.use("/dpost", dpostRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/helper", helperRouter);

module.exports = apiRouter;
