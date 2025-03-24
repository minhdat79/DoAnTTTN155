"use strict";
const express = require("express");
const { asynchandler } = require("../helpers/asynchandler");
const trainController = require("../controller/train.controller");
const router = express.Router();

router.get("/gerate-data", asynchandler(trainController.gerateData));
router.get("/train", asynchandler(trainController.trainNewData));
router.get("/check-modal", asynchandler(trainController.checkModal));
router.post("/chat", asynchandler(trainController.chatWithAi));

module.exports = router;
