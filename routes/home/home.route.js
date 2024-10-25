const express = require("express");
const router = express.Router();

const controller = require("../../controller/home/home.controller.js");
router.get("/", controller.index);

router.get("/signUp", controller.signUp);
router.get("/signIn", controller.signIn);
router.get("/reportIssue", controller.reportIssue);
router.get("/search", controller.search);
router.get("/evaluate", controller.evaluate);
router.get("/setAccount", controller.setAccount);

module.exports = router;