'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    Link = require('react-router').Link,
    bootstrap = require('react-bootstrap'),
    Navbar = bootstrap.Navbar,
    Nav = bootstrap.Nav,
    NavItem = bootstrap.NavItem;

var Home = React.createClass({
    render: function () {
        return (
            <Navbar brand='Community'>
            <Nav>
                <NavItem><Link to="home">Home-Link</Link></NavItem>
                <NavItem><Link to="about">About-Link</Link></NavItem>
            </Nav>
            </Navbar>
        );
    }
});

module.exports = Home;
