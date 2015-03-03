'use strict';

var app = require('./server'),
    mongo = require('./db/mongo'),
    config = require('config'),
    logger = require('./logger'),
    environment = process.env.NODE_ENV,
    dbConfig,
    port;

if (!environment) {
    throw new Error('Node environment not set (NODE_ENV).');
} else {
    logger.info('Running with environment:', environment);
}

port = config.get('server').port;
dbConfig = config.get('db');

if (!port) {
    throw new Error('Server configuration missing');
}

mongo.connect(dbConfig)
    .then(function () {
        app.listen(port);
        logger.info('Server started on port ' + port);
    })
    .catch(function (error) {
        if (error) {
            throw new Error('Error starting up: ' + error.message);
        }
    });
