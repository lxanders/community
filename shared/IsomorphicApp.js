'use strict';

var Fluxible = require('fluxible'),
    ApplicationStore = require('../stores/ApplicationStore');

function createIsomorphicApp() {
    var isomorphicApp = new Fluxible({
        component: require('../components/Routes.jsx'),
        stores: [ ApplicationStore ]
    });

    return isomorphicApp;
}

module.exports = {
    createIsomorphicApp: createIsomorphicApp
};
