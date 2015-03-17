'use strict';

var React = require('react'),
    RouterMixin = require('flux-router-component').RouterMixin,
    FluxibleMixin = require('fluxible').FluxibleMixin;

var CommunityApp = React.createClass({
    mixins: [ RouterMixin, FluxibleMixin ],

    render: function () {
        return (
            <main>
                Community-Content-Placeholder
            </main>
        );
    }
});

module.exports = CommunityApp;
