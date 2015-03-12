'use strict';

var Fluxible = require('fluxible');

function createIsomorphicApp() {
    var isomorphicApp = new Fluxible({});

    return isomorphicApp;
}

module.exports = {
    createIsomorphicApp: createIsomorphicApp
};
