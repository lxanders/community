'use strict';

var React = require('react'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    FluxibleMixin = require('fluxible/addons/FluxibleMixin'),
    connectToStores = require('fluxible/addons/connectToStores'),
    provideContext = require('fluxible/addons/provideContext'),
    RouteHandler = require('react-router').RouteHandler,
    ApplicationStore = require('../stores/ApplicationStore');

var CommunityApp = React.createClass({
    mixins: [ FluxibleMixin ],

    render: function () {
        return (
            <main>
                <RouteHandler />
            </main>
        );
    }
});

CommunityApp = connectToStores(CommunityApp, [ ApplicationStore ], function (stores) {
    return {
        ApplicationStore: stores.ApplicationStore.getState()
    };
});

CommunityApp = provideContext(CommunityApp);

module.exports = CommunityApp;
