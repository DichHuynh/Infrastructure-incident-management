const express = require("express");
const router = express.Router();
const controller = require("../../controller/tech.controller.js");

router.get("/:id", controller.index);
router.get("/:id/setAccount", controller.setAccount);
router.get("/:id/work", controller.work);
router.get("/:id/work/assignedTask", controller.assignedTask);
router.get("/:id/work/history", controller.history);
router.get("/:id/work/schedule", controller.schedule);
router.get("/:id/work/leaveRequest", controller.leaveRequest);

module.exports = router;