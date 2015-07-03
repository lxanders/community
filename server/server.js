'use strict';

var path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    morgan = require('morgan'),
    errorHandler = require('./middleware/errorHandler'),
    IsomorphicApp = require('../shared/IsomorphicApp'),
    isomorphicApp,
    navigateAction = require('../actions/navigate'),
    React = require('react'),
    serialize = require('serialize-javascript'),
    FluxibleComponent = require('fluxible/addons/FluxibleComponent'),
    Router = require('react-router'),
    Layout = require('../components/Layout.jsx'),
    layoutComponent = React.createFactory(Layout);

isomorphicApp = IsomorphicApp.createIsomorphicApp();

server.use(morgan('dev'));
server.use('/public', express.static(path.join(__dirname, '../build/')));
server.use('/public/css', express.static(path.join(__dirname, '../build/css')));
server.use(bodyParser.json());
server.use(errorHandler);

server.use(function (req, res, next) {
    var context = isomorphicApp.createContext(),
        html,
        component;

    Router.run(isomorphicApp.getComponent(), req.path, function (Handler) {
        context.executeAction(navigateAction, { url: req.url }, function (err) {
            if (err) {
                if (err.statusCode && err.statusCode === 404) {
                    next();
                } else {
                    next(err);
                }
                return;
            }

            component = React.createFactory(Handler);
            html = React.renderToStaticMarkup(layoutComponent({
                serializedState: serialize(isomorphicApp.dehydrate(context)),
                content: React.renderToString(
                    React.createElement(
                        FluxibleComponent,
                        { context: context.getComponentContext() },
                        component()
                    )
                ),
                context: context.getComponentContext()
            }));

            res.send('<!DOCTYPE html>' + html);
        });
    });
});

module.exports = server;
