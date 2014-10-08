'use strict';

var path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    morgan = require('morgan');

require('./routes')(router);

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use('/', router);

module.exports = app;
