"use strict";
const express = require("express");
const router = express.Router();

router.use(`/v1/api`, require("./access"));
router.use(`/v1/api`, require("./brand"));
router.use(`/v1/api`, require("./product"));
router.use(`/v1/api`, require("./review"));
router.use(`/v1/api`, require("./order"));
router.use(`/v1/api`, require("./user"));
router.use(`/v1/api`, require("./order"));
router.use(`/v1/api`, require("./summary"));
router.use(`/v1/api`, require("./upload"));
router.use(`/v1/api`, require("./report"));
router.use(`/v1/api`, require("./category"));
router.use(`/v1/api`, require("./train"));
router.use(`/v1/api`, require("./payment"));

module.exports = router;
