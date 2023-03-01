require('./DBConnection')
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const router = require("./router")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const helmet = require("helmet")

app.use(cors())
app.use(helmet())
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//TODO: move into router.js
// const unprotectedRoutes = ['login/auth'];

// app.use((req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     if (unprotectedRoutes.includes(req.url) || authHeader === "secretstring") {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

app.use(router)

app.listen(port, () => {
    console.log(`My app is listening on localhost:${port}`)
})