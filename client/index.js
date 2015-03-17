'use strict';

var React = require('react'),
    IsomorphicApp = require('../shared/IsomorphicApp'),
    client;

client = {
    run: function (dehydratedState) {
        var isomorphicApp = IsomorphicApp.createIsomorphicApp();

        isomorphicApp.rehydrate(dehydratedState, function (error, context) {
            var mountNode = document.getElementById('communityApp'),
                component = isomorphicApp.getComponent();

            if (error) {
                throw error;
            }

            React.render(component({ context: context.getComponentContext() }), mountNode);
        });
    }
};

window.app = client;

module.exports = client;
