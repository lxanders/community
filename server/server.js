'use strict';

var path = require('path'),
    express = require('express'),
    app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

module.exports = app;
