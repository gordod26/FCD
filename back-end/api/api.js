const express = require("express");
const dpostRouter = require("./dpostRouter");

const apiRouter = express.Router();

apiRouter.use("/dpost", dpostRouter);

module.exports = apiRouter;
