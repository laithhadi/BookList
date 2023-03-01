const express = require('express')
const books = require("../Controllers/BooksController")
const router = express.Router()

//GET REQUESTS
router.get("/", books.index)
router.get("/:id", books.show)

//POST REQUESTS
router.post("/create", books.create)

//UPDATE REQUESTS
router.put("/:id", books.update)

//DELETE REQUESTS
router.delete("/:id", books.delete)

module.exports = router