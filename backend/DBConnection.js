require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
    console.log("Database connected!");
});