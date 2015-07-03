'use strict';

var React = require('react'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron');

var Home = React.createClass({
    render: function () {
        return (
            <Jumbotron>
                <h1>Community</h1>
                <p>Community-Content-Placeholder: Home</p>
            </Jumbotron>
        );
    }
});

module.exports = Home;
