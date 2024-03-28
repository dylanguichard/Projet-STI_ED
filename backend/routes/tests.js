const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/tests");

// URL : localhost:5000/api/tests/
// On appel la fonction getTests contenu dans le controller
router.get("/", auth, controller.getTests);

module.exports = router;
