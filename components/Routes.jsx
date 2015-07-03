'use strict';

var React = require('react'),
    Route = require('react-router').Route,
    DefaultRoute = require('react-router').DefaultRoute,
    CommunityApp = require('./CommunityApp.jsx'),
    Home = require('./Home.jsx'),
    About = require('./About.jsx');

var routes = (
    <Route name="app" path="/" handler={ CommunityApp }>
        <Route name="about" handler={ About } />
        <DefaultRoute name="home" handler={ Home } />
    </Route>
);

module.exports = routes;
