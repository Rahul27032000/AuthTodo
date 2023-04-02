const express = require("express");
const { register, login } = require("../controller/auth");
const router = express.Router();

router.get("", register);
router.get("/login", login);

module.exports = router;
