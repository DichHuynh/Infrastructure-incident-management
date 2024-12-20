const express = require("express");
const router = express.Router();
const controller = require("../../controller/tech.controller.js");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dy3gsgb0j",
  api_key: "612567661831846",
  api_secret: "itGMjSDdsvw1Wa_gNHkhAY_N6Yo"
});

const upload = multer();
const middleware = require("../../middlewares/uploadImage.middleware.js");

router.get("/:id", controller.index);
router.get("/:id/setAccount", controller.setAccount);

router.get("/:id/work/assignedTask", controller.assignedTask);
router.post("/assignedTask/:issue_id/update", controller.updateTask);
router.post("/assignedTask/:issue_id/report",
  upload.single("resolved_image"),
  middleware.uploadFile,
  controller.reportTask);

router.get("/:id/work/history", controller.history);
router.get("/:id/work/schedule", controller.schedule);
router.get("/:id/work/leaveRequest", controller.leaveRequest);

module.exports = router;