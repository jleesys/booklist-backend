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
    describe('get', function () {
        test('gets all books', async () => {
            // const response = await Book.find({});
            const response =
                await api
                    .get('/api/books');
            expect(response.body).toHaveLength(3);
        });
        test('able to get book by id', async () => {
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
    describe('post', function () {
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
    });
    // for future: response.body vs response.data?
    describe('put', function () {
        let idForTestBook;
        beforeEach(async () => {
            const testBook = {
                title: 'Le Test Book 2',
                author: 'Mr Test',
                isbn: '69696969',
            }
            const response = await api
                .post('/api/books')
                .send(testBook)
                .expect(201);
            idForTestBook = response.body.id;
            // console.log(idForTestBook);
        });
        test('able to update book progress', async () => {
            const updatedBook = {
                title: 'Le Test Book 2',
                author: 'Mr Test',
                isbn: '69696969',
                progress: 1000
            };
            const response = await api
                .put(`/api/books/${idForTestBook}`)
                .send(updatedBook)
                .expect(200);
            const booksAtEnd = await Book.find({});
            const newBook = booksAtEnd.filter(book => book.id === idForTestBook)[0];
            expect(response.body.progress).toBe(1000);
            expect(newBook.progress).toBe(1000);
        });
    });
    describe('delete', function () {
        let idForTestBook;
        beforeEach(async () => {
            const testBook = {
                title: 'Deleted Book',
                author: 'Mr Test',
                isbn: '69696969',
            }
            const response = await api
                .post('/api/books')
                .send(testBook)
                .expect(201);
            idForTestBook = response.body.id;
        });
        test('able to delete a book', async function () {
            const response = await api
                .delete(`/api/books/${idForTestBook}`)
                .expect(200);
            const booksAtEnd = await api.get('/api/books');
            const bookNamesEnd = booksAtEnd.body.map(book => book.title);
            expect(bookNamesEnd).not.toContain('Deleted Book');
        });
    });
});