const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin.controller.js");

router.get("/:id", controller.index);
router.get("/:id/setAccount", controller.setAccount);

module.exports = router;