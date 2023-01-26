const app = require('./app');
const http = require('http');
const config = require('./util/config');
const logger = require('./util/logger');

const server = http.createServer(app);
server.listen(config.PORT, (error) => {
    if (!error) {
        // console.log('Server running on port ', config.PORT);
        logger.info('Server running on port ', config.PORT);
    } else {
        // console.log('error starting app on port ', config.PORT);
        logger.error('error starting app on port ', config.PORT);
    }
});