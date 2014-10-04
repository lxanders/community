'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    environment = process.env.NODE_ENV,
    getConfig = require('./config/config').getConfig,
    configPath = path.join(__dirname, 'config'),
    mongo = require('./db/mongo'),
    config;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/build')));

if (!environment) {
    throw new Error('Node environment not set (NODE_ENV).');
} else {
    console.log('Running with environment:', environment);
}

config = getConfig(environment, configPath, require);

mongo.connect(config.db)
    .catch(function (error) {
        if (error) {
            throw new Error('Error connecting to the database: ' + error.message);
        }
    });

module.exports = app;
