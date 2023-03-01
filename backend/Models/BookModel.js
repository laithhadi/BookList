const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    isRead: Boolean,
    publisher: String,
    datePublished: Date,
    price: String,
    rating: Number
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;