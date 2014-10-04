'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    environment = process.env.NODE_ENV,
    getConfig = require('./config/config').getConfig,
    relativeConfigPath = './',
    config;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/build')));

config = getConfig(environment, relativeConfigPath, require);

module.exports = app;
