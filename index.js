const express = require('express')
const db = require('./DBConnection')
const app = express()
const port = process.env.PORT || 3000
const router = require("./router")
const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)


app.listen(port, () => {
    console.log(`My app is listening on localhost:${port}`)
})