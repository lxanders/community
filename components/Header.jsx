'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    Link = require('react-router').Link;

var Home = React.createClass({
    render: function () {
        return (
            <ul>
                <li><Link to="home">Home-Link</Link></li>
                <li><Link to="about">About-Link</Link></li>
            </ul>
        );
    }
});

module.exports = Home;
