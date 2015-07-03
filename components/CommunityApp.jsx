'use strict';

var React = require('react'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    RouterMixin = require('flux-router-component').RouterMixin,
    FluxibleMixin = require('fluxible/addons/FluxibleMixin'),
    connectToStores = require('fluxible/addons/connectToStores'),
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

module.exports = connectToStores(CommunityApp, [ ApplicationStore ], function (stores) {
    return {
        ApplicationStore: stores.ApplicationStore.getState()
    };
});
