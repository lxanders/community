'use strict';

var path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    routes;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

routes = require('./routes')(app);

module.exports = app;
