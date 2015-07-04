'use strict';

var React = require('react'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    FluxibleMixin = require('fluxible/addons/FluxibleMixin'),
    DocumentTitle = require('react-document-title'),
    connectToStores = require('fluxible/addons/connectToStores'),
    provideContext = require('fluxible/addons/provideContext'),
    RouteHandler = require('react-router').RouteHandler,
    ApplicationStore = require('../stores/ApplicationStore'),
    Link = require('react-router').Link;

var CommunityApp = React.createClass({
    mixins: [ FluxibleMixin ],

    render: function () {
        return (
            <main>
                <ul>
                    <li><Link to="home">Home-Link</Link></li>
                    <li><Link to="about">About-Link</Link></li>
                </ul>

                <DocumentTitle title='Community'>
                    <RouteHandler />
                </DocumentTitle>
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
