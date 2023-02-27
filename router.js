// where I store all of my routes for handling todo operations

const express = require('express')
const todos = require("./todosController")
const router = express.Router()

router.get("/todo", todos.index)
router.get("/todo/:id", todos.show)
router.post("/create", todos.create)
router.delete("/delete/:id", todos.delete)
router.put("/todo/:id", todos.update)

module.exports = router