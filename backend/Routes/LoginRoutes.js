const express = require('express')
const login = require("../Controllers/LoginController")
const router = express.Router()

router.post("/auth", login.index)

module.exports = router