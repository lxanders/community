'use strict';

var serializeJavaScript = require('serialize-javascript');

module.exports = function serializeState(isomorphicApp) {
    var context = isomorphicApp.createContext(),
        dehydratedState = isomorphicApp.dehydrate(context),
        serializedState = serializeJavaScript(dehydratedState);

    return serializedState;
};
