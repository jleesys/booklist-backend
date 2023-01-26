const mongoose = require('mongoose');
const supertest = require('supertest');
const Book = require('../model/Book');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
    await Book.deleteMany({});
    // implement User model
    // User.deleteMany({});
});

describe('Blog API', function () {
    beforeEach(async () => {
        const books = [
            {
                title: 'Title 1',
                author: 'Author 1',
                isbn: '1'
            },
            {
                title: 'Title 2',
                author: 'Author 2',
                isbn: '2'
            },
            {
                title: 'Title 3',
                author: 'Author 3',
                isbn: '3'
            },
        ];
        for (const i of books) {
            const book = new Book(i);
            await book.save();
        }
    });
    test('gets all books', async () => {
        // const response = await Book.find({});
        const response =
            await api
                .get('/api/books');
        expect(response.body).toHaveLength(3);
    });
    test('able to submit a book', async () => {
        const newBook = {
            title: 'The World of Wasps',
            author: 'Wasp B. Mad',
            isbn: '9999999'
        };
        // const response = await newBook.save();
        // const getAll = await Book.find({});
        const response = await api
            .post('/api/books')
            .send(newBook)
            .expect(201);
        const getAll = await api
            .get('/api/books');
        expect(getAll.body).toHaveLength(4);
        expect(response.body.title).toBe('The World of Wasps');
    });
    test('able to book by id', async () => {
        const newBook = new Book({
            title: 'The World of Wasps',
            author: 'Wasp B. Mad',
            isbn: '9999999'
        });
        const response = await newBook.save();
        const id = response.id;
        const getById = await api
            .get(`/api/books/${id}`)
            .expect(200);
        expect(getById.body.id).toBe(id);
        expect(getById.body.title).toBe('The World of Wasps');
    });
});