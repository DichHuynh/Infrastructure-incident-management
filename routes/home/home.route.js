const express = require("express");
const router = express.Router();

const controller = require("../../controller/home/home.controller.js");
router.get("/:id", controller.index);

router.get("/:id/issue", controller.issue);
router.get("/:id/reportIssue", controller.reportIssue);
router.get("/:id/warehouse", controller.warehouse);
router.get("/:id/evaluate", controller.evaluate);
router.get("/:id/setAccount", controller.setAccount);

module.exports = router;