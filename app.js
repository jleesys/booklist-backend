const express = require('express');
const app = express();
const mongoose = require('mongoose');
const booksRouter = require('./controller/books');
const config = require('./util/config');
const cors = require('cors');
require('dotenv').config();
const middleware = require('./util/middleware');
const logger = require('./util/logger');

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Successfully conneted to DB');
    })
    .catch(error => {
        logger(error);
    });

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
    app.use(middleware.requestLogger);
}
app.use('/api/books/', booksRouter);

module.exports = app;