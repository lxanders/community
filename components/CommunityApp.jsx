'use strict';

var React = require('react'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    RouterMixin = require('flux-router-component').RouterMixin,
    FluxibleMixin = require('fluxible/addons/FluxibleMixin'),
    connectToStores = require('fluxible/addons/connectToStores'),
    provideContext = require('fluxible/addons/provideContext'),
    ApplicationStore = require('../stores/ApplicationStore');

var CommunityApp = React.createClass({
    mixins: [ RouterMixin, FluxibleMixin ],

    render: function () {
        return (
            <main>
                <Jumbotron>
                    <h1>Community</h1>
                    <p>Community-Content-Placeholder</p>
                </Jumbotron>
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
