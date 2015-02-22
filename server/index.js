'use strict';

var app = require('./server'),
    environment = process.env.NODE_ENV,
    getConfig = require('./config/config').getConfig,
    configPath = './config',
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

app.listen(config.server.port);
logger.info('Server started on port ' + config.server.port);
