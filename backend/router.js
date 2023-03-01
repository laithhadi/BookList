const express = require('express')
const router = express.Router()

const booksRouter = require('./Routes/BookRoutes')
const usersRouter = require('./Routes/UserRoutes')
const loginRoutes = require('./Routes/LoginRoutes')

router.use('/books', booksRouter)
router.use('/users', usersRouter)
router.use('/login', loginRoutes)

module.exports = router