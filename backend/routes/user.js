const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/user");

// URL : localhost:5000/api/user/
router.get("/", auth, controller.getUser);

// URL : localhost:5000/api/user/signup
router.post("/signup", controller.signup);

// URL : localhost:5000/api/user/login
router.post("/login", controller.login);

module.exports = router;
