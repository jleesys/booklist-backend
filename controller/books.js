const booksRouter = require('express').Router();
const mongoose = require('mongoose');
const Book = require('../model/Book');

booksRouter.get('/', async (request, response, next) => {
    try {
        const books = await Book.find({});
        response.json(books);
    } catch(exception) {
        next(exception);
    }
});
booksRouter.post('/', async (request, response, next) => {
    try {
        const { title, author, isbn, progress } = request.body;
        const book = new Book({
            title: title,
            author: author,
            isbn: isbn,
            progress: progress
        });
        const savedBook = await book.save();
        response.status(201).json(savedBook);
    } catch(exception) {
        next(exception);
    }
});


// booksRouter.post();
// booksRouter.put();
// booksRouter.delete();

module.exports = booksRouter;