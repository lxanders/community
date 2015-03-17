'use strict';

var path = require('path'),
    React = require('react'),
    serializeJavaScript = require('serialize-javascript'),
    navigateAction = require('flux-router-component').navigateAction,
    bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    morgan = require('morgan'),
    logger = require('./logger'),
    errorHandler = require('./middleware/errorHandler'),
    Layout = require('../shared/components/Layout.jsx'),
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
        var component,
            layoutComponent,
            html,
            dehydratedState,
            serializedState,
            startScript;

        if (error) {
            return next(error);
        }

        dehydratedState = isomorphicApp.dehydrate(context);
        serializedState = serializeJavaScript(dehydratedState);
        startScript = 'window.app.run(' + serializedState + ');';
        component = isomorphicApp.getComponent();
        layoutComponent = React.createFactory(Layout);
        html = React.renderToStaticMarkup(layoutComponent({
            content: React.renderToString(component()),
            startScript: startScript
        }));

        res.write('<!DOCTYPE html>');
        res.write(html);
        res.end();
    });
}

module.exports = server;
