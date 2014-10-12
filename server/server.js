'use strict';

var path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    router = new express.Router(),
    morgan = require('morgan'),
    logger = require('./logger'),
    errorHandler = require('./middleware/errorHandler');

app.use(morgan('combined', { stream: logger.infoStream }));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use('/', router);

require('./routes')(router);

app.use(errorHandler);

module.exports = app;
