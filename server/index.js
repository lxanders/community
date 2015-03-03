'use strict';

var app = require('./server'),
    config = require('config'),
    logger = require('./logger'),
    environment = process.env.NODE_ENV,
    port;

if (!environment) {
    throw new Error('Node environment not set (NODE_ENV).');
} else {
    logger.info('Running with environment:', environment);
}

port = config.get('server.port');

if (!port) {
    throw new Error('Server configuration missing');
}

app.listen(config.server.port);
logger.info('Server started on port ' + config.server.port);
