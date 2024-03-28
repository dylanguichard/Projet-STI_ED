const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/tests");

router.get("/", auth, controller.getTests);

router.post("/save", controller.saveTest);

module.exports = router;
