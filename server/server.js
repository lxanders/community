'use strict';

var path = require('path'),
    navigateAction = require('flux-router-component').navigateAction,
    bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    morgan = require('morgan'),
    logger = require('./logger'),
    renderToHtml = require('./lib/renderToHtml'),
    errorHandler = require('./middleware/errorHandler'),
    IsomorphicApp = require('../shared/IsomorphicApp'),
    isomorphicApp;

function renderOnServer(anyIsomorphicApp, res) {
    var html = renderToHtml(anyIsomorphicApp);

    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
}

function applicationRouteHandler(req, res, next) {
    var context = isomorphicApp.createContext();

    context.executeAction(navigateAction, { url: req.url }, function (error) {
        if (error) {
            return next(error);
        }

        renderOnServer(isomorphicApp, res);
    });
}

isomorphicApp = IsomorphicApp.createIsomorphicApp();

server.use(morgan('dev'));
server.use('/public', express.static(path.join(__dirname, '../build/')));
server.use(bodyParser.json());
server.use(errorHandler);

server.get('*', applicationRouteHandler);

module.exports = server;
