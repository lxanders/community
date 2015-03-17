'use strict';

var serializeJavaScript = require('serialize-javascript');

module.exports = function createStartScript(isomorphicApp) {
    var context = isomorphicApp.createContext(),
        dehydratedState = isomorphicApp.dehydrate(context),
        serializedState = serializeJavaScript(dehydratedState),
        startScript = 'window.app.run(' + serializedState + ');';

    return startScript;
};
