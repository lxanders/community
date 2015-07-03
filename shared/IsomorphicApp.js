'use strict';

var React = require('react'),
    routesConfig = require('../config/routes'),
    Fluxible = require('fluxible'),
    CommunityApp = require('./../components/CommunityApp.jsx'),
    routrPlugin = require('fluxible-plugin-routr');

function createIsomorphicApp() {
    var isomorphicApp = new Fluxible({
        component: React.createFactory(CommunityApp)
    });

    isomorphicApp.plug(routrPlugin({ routes: routesConfig }));

    return isomorphicApp;
}

module.exports = {
    createIsomorphicApp: createIsomorphicApp
};
