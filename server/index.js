'use strict';

var app = require('./server'),
    environment = process.env.NODE_ENV,
    getConfig = require('./config/config').getConfig,
    configPath = './config',
    mongo = require('./db/mongo'),
    config;

if (!environment) {
    throw new Error('Node environment not set (NODE_ENV).');
} else {
    console.log('Running with environment:', environment);
}

config = getConfig(environment, configPath, require);

if(!config.server || !config.server.port) {
    throw new Error('Server configuration missing');
}

mongo.connect(config)
    .then(function () {
        app.listen(config.server.port);
        console.log('Server started on port ' + config.server.port);
    })
    .catch(function (error) {
        if (error) {
            throw new Error('Error starting up: ' + error.message);
        }
    });
