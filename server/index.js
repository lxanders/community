'use strict';

var path = require('path'),
    app = require('./server'),
    port = 3000,
    environment = process.env.NODE_ENV,
    getConfig = require('./config/config').getConfig,
    configPath = path.join(__dirname, 'config'),
    mongo = require('./db/mongo'),
    config;

if (!environment) {
    throw new Error('Node environment not set (NODE_ENV).');
} else {
    console.log('Running with environment:', environment);
}

config = getConfig(environment, configPath, require);

mongo.connect(config.db)
    .then(function () {
        app.listen(port);
        console.log('Server started on port ' + port);
    })
    .catch(function (error) {
        if (error) {
            throw new Error('Error starting up: ' + error.message);
        }
    });
