const express = require("express");
const { loginUser } = require("../controllers");

const router = express.Router();

router.route("/").get(loginUser)

module.exports = router;