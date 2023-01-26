const express = require('express');
const app = express();
const mongoose = require('mongoose');
const booksRouter = require('./controller/books');
const config = require('./util/config');
const cors = require('cors');
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
app.use('/api/books/', booksRouter);

module.exports = app;