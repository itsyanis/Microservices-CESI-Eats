const express = require("express");
const AuthController = require("../controllers/auth");

const router = express.Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
