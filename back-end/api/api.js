const express = require("express");
const dpostRouter = require("./dpostRouter");
const helperRouter = require("./helperRouter");

const apiRouter = express.Router();

apiRouter.use("/dpost", dpostRouter);
apiRouter.use("/helper", helperRouter);

module.exports = apiRouter;
