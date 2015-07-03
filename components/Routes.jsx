'use strict';

var React = require('react'),
    Route = require('react-router').Route,
    DefaultRoute = require('react-router').DefaultRoute,
    CommunityApp = require('./CommunityApp.jsx');

var routes = (
    <Route name="index" path="/" handler={ CommunityApp } />
);

module.exports = routes;
