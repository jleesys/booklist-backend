require('dotenv').config();

const PORT = 3003;
const MONGODB_URI = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI_PROD;
// url for db

module.exports = { PORT, MONGODB_URI };