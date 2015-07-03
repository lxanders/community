'use strict';

var React = require('react'),
    routesConfig = require('../config/routes'),
    Fluxible = require('fluxible'),
    CommunityApp = require('../components/CommunityApp.jsx'),
    ApplicationStore = require('../stores/ApplicationStore'),
    routrPlugin = require('fluxible-plugin-routr');

function createIsomorphicApp() {
    var isomorphicApp = new Fluxible({
        component: React.createFactory(CommunityApp),
        stores: [ ApplicationStore ]
    });

    isomorphicApp.plug(routrPlugin({ routes: routesConfig }));

    return isomorphicApp;
}

module.exports = {
    createIsomorphicApp: createIsomorphicApp
};
