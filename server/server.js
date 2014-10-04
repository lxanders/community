'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    environment = process.env.NODE_ENV,
    getConfig = require('./config/config').getConfig,
    configPath = path.join(__dirname, 'config'),
    config;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/build')));

if (!environment) {
    throw new Error('Node environment not set (NODE_ENV).');
} else {
    console.log('Running with environment:', environment);
}

config = getConfig(environment, configPath, require);


module.exports = app;
