'use strict';

var React = require('react'),
    ApplicationStore = require('../stores/ApplicationStore'),
    Layout;

Layout = React.createClass({
    render: function () {
        this.props.markup = 'Yeah!';

        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>{ this.props.context.getStore(ApplicationStore).getPageTitle() }</title>
                    <link href="public/img/favicon.ico" rel="icon" />
                    <link href="public/css/bootstrap.css" rel="stylesheet" />
                </head>
                <body>
                    <div id="communityApp" dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
                </body>
                <script src="public/js/bundle.js"></script>
                <script dangerouslySetInnerHTML={{ __html: "window.app.run(" + this.props.serializedState + ");"  }} />
            </html>
        );
    }
});

module.exports = Layout;
