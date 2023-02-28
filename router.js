const express = require('express')
const books = require("./BooksController")
const router = express.Router()

//GET REQUESTS
router.get("/books", books.index)
router.get("/books/:id", books.show)

//POST REQUESTS
router.post("/books/create", books.create)

//UPDATE REQUESTS
router.put("/books/:id", books.update)

//DELETE REQUESTS
router.delete("/books/:id", books.delete)

module.exports = router