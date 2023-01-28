const booksRouter = require('express').Router();
const mongoose = require('mongoose');
const Book = require('../model/Book');

booksRouter.get('/', async (request, response, next) => {
    try {
        const books = await Book.find({});
        response.json(books);
    } catch (exception) {
        next(exception);
    }
});
booksRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const foundBook = await Book.findById(id);
        if (foundBook) {
            response.json(foundBook);
        } else {
            response.status(404).json({ error: 'not found' });
        }
    } catch (exception) {
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
    } catch (exception) {
        next(exception);
    }
});
booksRouter.put('/:id', async (request, response, next) => {
    try {
        // console.log('hit', request.body);
        const id = request.params.id;
        const progressReplace = request.body.progress;
        const foundBook = await Book.findById(id);
        if (foundBook) {
            foundBook.progress = progressReplace;
            // console.log('replacement book', foundBook);
            // console.log('be: finding book of id ', id);
            const newBook = await Book.findByIdAndUpdate(id, foundBook, { new: true });
            // console.log('response', response);
            // console.log('updated book', response);
            if (newBook) {
                return response.status(200).json(newBook);
            } else {
                return response.status(400).end();
            }
        } else {
            return response.status(404).json({ error: 'not found' });
        }
        // console.log('finished save', response.body);
    } catch (exception) {
        next(exception);
    }
});


// booksRouter.post();
// booksRouter.put();
// booksRouter.delete();

module.exports = booksRouter;