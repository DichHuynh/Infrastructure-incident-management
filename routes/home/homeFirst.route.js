const express = require("express");
const router = express.Router();

const homeFirst = require("../../controller/home/homeFirst.controller.js");
router.get("/", homeFirst.home);
router.get("/signIn", homeFirst.signIn);
router.post("/signIn", homeFirst.signInPost);
router.get("/signUp", homeFirst.signUp);

module.exports = router;
