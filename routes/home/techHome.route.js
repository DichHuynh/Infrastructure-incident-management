const express = require("express");
const router = express.Router();
const controller = require("../../controller/tech.controller.js");

router.get("/:id", controller.index);

module.exports = router;