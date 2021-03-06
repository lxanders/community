'use strict';

var server,
    config = require('config'),
    logger = require('./logger'),
    environment,
    port;

require('node-jsx').install({ extension: '.jsx' });

/* eslint-disable no-process-env */
environment = process.env.NODE_ENV;
/* eslint-ensable no-process-env */

if (!environment) {
    throw new Error('Node environment not set (NODE_ENV).');
} else {
    logger.info('Running with environment:', environment);
}

port = config.get('server.port');

if (!port) {
    throw new Error('Server configuration missing');
}

server = require('./server');

server.listen(config.server.port);

logger.info('Server started on port ' + config.server.port);
