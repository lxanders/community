'use strict';

var React = require('react'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    FluxibleMixin = require('fluxible/addons/FluxibleMixin'),
    DocumentTitle = require('react-document-title'),
    connectToStores = require('fluxible/addons/connectToStores'),
    provideContext = require('fluxible/addons/provideContext'),
    RouteHandler = require('react-router').RouteHandler,
    ApplicationStore = require('../stores/ApplicationStore'),
    Header = require('./Header.jsx');

var CommunityApp = React.createClass({
    mixins: [ FluxibleMixin ],

    render: function () {
        return (
            <DocumentTitle title='Community'>
                <main>
                    <Header />
                    <RouteHandler />
                </main>
            </DocumentTitle>
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
