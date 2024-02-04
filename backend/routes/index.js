const express = require("express");
const { registerUser, loginUser, logoutUser, addRun, getRuns } = require("../controllers/index")
const isAuthenticatedUser = require("../middlewares/auth")
const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/run").post(addRun)
router.route("/runs").get(getRuns)

module.exports = router;