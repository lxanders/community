'use strict';

var React = require('react'),
    Router = require('react-router'),
    HistoryLocation = Router.HistoryLocation,
    navigateAction = require('../actions/navigate'),
    FluxibleComponent = require('fluxible/addons/FluxibleComponent'),
    IsomorphicApp = require('../shared/IsomorphicApp'),
    client;

function renderApp(context, Handler) {
    var mountNode = document.getElementById('communityApp'),
        component = React.createFactory(Handler);

    React.render(
        React.createElement(
            FluxibleComponent,
            { context: context.getComponentContext() },
            component()
        ),
        mountNode
    );
}

client = {
    run: function (dehydratedState) {
        var isomorphicApp = IsomorphicApp.createIsomorphicApp(),
            firstRender = true;

        isomorphicApp.rehydrate(dehydratedState, function (error, context) {
            if (error) {
                throw error;
            }

            Router.run(isomorphicApp.getComponent(), HistoryLocation, function (Handler, state) {
                if (firstRender) {
                    renderApp(context, Handler);
                    firstRender = false;
                } else {
                    context.executeAction(navigateAction, state, function () {
                        renderApp(context, Handler);
                    });
                }
            });
        });
    }
};

window.app = client;

module.exports = client;
