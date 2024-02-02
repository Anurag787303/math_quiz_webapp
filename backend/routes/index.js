const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/index")
const isAuthenticatedUser = require("../middlewares/auth")
const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/").get(isAuthenticatedUser, (req, res, next) => {
    res.send("dummy data")
})

module.exports = router;