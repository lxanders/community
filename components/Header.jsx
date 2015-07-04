'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    NavItemLink = require('react-router-bootstrap').NavItemLink,
    bootstrap = require('react-bootstrap'),
    Navbar = bootstrap.Navbar,
    Nav = bootstrap.Nav;

var Home = React.createClass({
    render: function () {
        return (
            <Navbar brand='Community'>
            <Nav>
                <NavItemLink to="home">Home-Link</NavItemLink>
                <NavItemLink to="about">About-Link</NavItemLink>
            </Nav>
            </Navbar>
        );
    }
});

module.exports = Home;
