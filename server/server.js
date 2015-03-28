'use strict';

var path = require('path'),
    navigateAction = require('flux-router-component').navigateAction,
    bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    morgan = require('morgan'),
    renderToHtmlWithDoctype = require('./lib/render').renderToHtmlWithDoctype,
    errorHandler = require('./middleware/errorHandler'),
    IsomorphicApp = require('../shared/IsomorphicApp'),
    isomorphicApp;

function applicationRouteHandler(req, res, next) {
    var context = isomorphicApp.createContext(),
        html;

    context.executeAction(navigateAction, { url: req.url }, function (error) {
        if (error) {
            return next(error);
        }

        html = renderToHtmlWithDoctype(isomorphicApp, res);

        res.write(html);
        res.end();
    });
}

isomorphicApp = IsomorphicApp.createIsomorphicApp();

server.use(morgan('dev'));
server.use('/public', express.static(path.join(__dirname, '../build/')));
server.use('/public/css', express.static(path.join(__dirname, '../build/css')));
server.use(bodyParser.json());
server.use(errorHandler);

server.get('*', applicationRouteHandler);

module.exports = server;
