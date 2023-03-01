const createError = require('http-errors')
const googleAPIClient = require("./GoogleBooksAPIClient");
const BookModel = require('./BookModel');

async function getBookName(bookName) {
    const bookClient = new googleAPIClient();
    try {
        const data = await bookClient.fetchBookByName(bookName);
        return data.items[0];
    } catch (error) {
        console.log(error);
    }
}

exports.index = async function (req, res) {
    try {
        const books = await BookModel.find({});
        res.send(books);
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' });
    }
}

exports.create = async function (req, res, next) {
    const request = req.body;

    if (!request.name) return (next(createError(400, "Name is required.")))
    if (!request.author) return (next(createError(400, "Author is required.")))

    if (
        !request.isRead ||
        !(request.isRead === "true" || request.isRead === "false")
    ) {
        return (next(createError(400, "Read status is required or it needs to be set to true or false")))
    }

    const bookData = await getBookName(request.name);

    const bookInstance = new BookModel({
        name: request.name,
        author: request.author,
        isRead: request.isRead,
        publisher: bookData.volumeInfo.publisher,
        datePublished: bookData.volumeInfo.publishedDate,
        price: bookData.saleInfo.saleability,
        rating: bookData.volumeInfo.averageRating
    });

    try {
        bookInstance.save();
    } catch (error) {
        console.log(error);
    }

    res.send(bookInstance);
}

exports.show = async function (req, res, next) {
    const bookId = req.params.id;

    try {
        const book = await BookModel.findById(bookId, req.body, { new: true });
        return res.send(book);
    } catch (error) {
        return next(createError(500, "Error finding book."));
    }
}

exports.delete = async function (req, res, next) {
    const bookId = req.params.id;

    try {
        const book = await BookModel.findByIdAndDelete(bookId, req.body, { new: true });
        return res.send(book);
    } catch (error) {
        return next(createError(500, "Error deleting book"));
    }
}

exports.update = async function (req, res, next) {
    if (!req.body.name) {
        return (next(createError(400, "Name is required.")))
    }

    try {
        const bookId = req.params.id;
        const book = await BookModel.findByIdAndUpdate(bookId, req.body, { new: true });
        if (!book) {
            return next(createError(404, 'Book not found'));
        }
        console.log('Book updated:', book);
        res.send(book);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong' });
    }
}