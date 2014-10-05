'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    morgan = require('morgan');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/build')));

module.exports = app;
