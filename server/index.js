'use strict';

var app = require('./server'),
    environment = process.env.NODE_ENV,
    getConfig = require('./config/config').getConfig,
    configPath = './config',
    mongo = require('./db/mongo'),
    config,
    logger = require('./logger');

if (!environment) {
    throw new Error('Node environment not set (NODE_ENV).');
} else {
    logger.info('Running with environment:', environment);
}

config = getConfig(environment, configPath, require);

if (!config.server || !config.server.port) {
    throw new Error('Server configuration missing');
}

mongo.connect(config)
    .then(function () {
        app.listen(config.server.port);
        logger.info('Server started on port ' + config.server.port);
    })
    .catch(function (error) {
        if (error) {
            throw new Error('Error starting up: ' + error.message);
        }
    });
