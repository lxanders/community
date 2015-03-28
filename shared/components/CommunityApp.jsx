'use strict';

var React = require('react'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    RouterMixin = require('flux-router-component').RouterMixin,
    FluxibleMixin = require('fluxible').FluxibleMixin;

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

module.exports = CommunityApp;
