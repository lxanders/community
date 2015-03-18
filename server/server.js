'use strict';

var path = require('path'),
    navigateAction = require('flux-router-component').navigateAction,
    bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    morgan = require('morgan'),
    logger = require('./logger'),
    renderOnServer = require('./lib/renderOnServer'),
    errorHandler = require('./middleware/errorHandler'),
    IsomorphicApp = require('../shared/IsomorphicApp'),
    isomorphicApp;

isomorphicApp = IsomorphicApp.createIsomorphicApp();

server.use(morgan('dev'));
server.use('/public', express.static(path.join(__dirname, '../build/')));
server.use(bodyParser.json());
server.use(errorHandler);

server.get('*', applicationRouteHandler);

function applicationRouteHandler(req, res, next) {
    var context = isomorphicApp.createContext();

    context.executeAction(navigateAction, { url: req.url }, function (error) {
        var html;

        if (error) {
            return next(error);
        }

        html = renderOnServer(isomorphicApp);

        res.write('<!DOCTYPE html>');
        res.write(html);
        res.end();
    });
}

module.exports = server;
