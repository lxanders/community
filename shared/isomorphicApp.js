'use strict';

var Fluxible = require('fluxible'),
    Layout = require('./components/Layout.jsx');

function createIsomorphicApp() {
    var isomorphicApp = new Fluxible({
        component: Layout
    });

    return isomorphicApp;
}

module.exports = {
    createIsomorphicApp: createIsomorphicApp
};
