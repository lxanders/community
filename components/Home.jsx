'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title'),
    Jumbotron = require('react-bootstrap/lib/Jumbotron');

var Home = React.createClass({
    render: function () {
        return (
            <DocumentTitle title='Community - Home'>
                <Jumbotron>
                    <h1>Community</h1>

                    <p>Community-Content-Placeholder: Home</p>
                </Jumbotron>
            </DocumentTitle>
        );
    }
});

module.exports = Home;
