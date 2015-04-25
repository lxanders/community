'use strict';

var React = require('react'),
    Layout;

Layout = React.createClass({
    render: function () {
        this.props.markup = 'Yeah!';

        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>Community - come together</title>
                    <link href="public/css/bootstrap.css" rel="stylesheet" />
                </head>
                <body>
                    <div id="communityApp" dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
                </body>
                <script src="public/js/bundle.js" />
                <script dangerouslySetInnerHTML={{ __html: 'window.app.run(' + this.props.serializedState + ');' }} />
            </html>
        );
    }
});

module.exports = Layout;
