'use strict';

var React = require('react'),
    Layout;

Layout = React.createClass({
    render: function() {
        this.props.markup = 'Yeah!';

        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>Community - come together</title>
                </head>
                <body>
                    <div id="communityApp" dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
                </body>
                <script src="public/js/bundle.js"></script>
                <script dangerouslySetInnerHTML={{ __html: this.props.startScript }}></script>
            </html>
        );
    }
});

module.exports = Layout;