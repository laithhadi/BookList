const express = require('express')
const users = require("../Controllers/UserController")
const router = express.Router()

//GET REQUESTS
router.get("/", users.index)
router.get("/:id", users.show)

//POST REQUESTS
router.post("/create", users.create)

//UPDATE REQUESTS
router.put("/:id", users.update)

//DELETE REQUESTS
router.delete("/:id", users.delete)

module.exports = router