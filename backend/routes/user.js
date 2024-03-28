const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/user");

router.get("/", auth, controller.getUser);

router.post("/signup", controller.signup);

router.post("/login", controller.login);

module.exports = router;
