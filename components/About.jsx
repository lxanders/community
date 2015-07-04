'use strict';

var React = require('react'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron'),
    DocumentTitle = require('react-document-title');

var Home = React.createClass({
    render: function () {
        return (
            <DocumentTitle title='Community - About'>
                <Jumbotron>
                    <h1>Community</h1>

                    <p>Community-Content-Placeholder: About</p>
                </Jumbotron>
            </DocumentTitle>
        );
    }
});

module.exports = Home;
