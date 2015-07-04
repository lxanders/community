'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title'),
    ApplicationStore = require('../stores/ApplicationStore'),
    Layout;

Layout = React.createClass({
    render: function () {
        var currentPageTitle = DocumentTitle.rewind();

        return (
            <html>

            <head>
                <meta charSet="utf-8"/>
                <title>{ currentPageTitle }</title>
                <link href="public/img/favicon.ico" rel="icon"/>
                <link href="public/css/bootstrap.css" rel="stylesheet"/>
            </head>

            <body>
                <div id="communityApp" dangerouslySetInnerHTML={{ __html: this.props.content }} />
            </body>

            <script src="public/js/bundle.js"></script>
            <script dangerouslySetInnerHTML={{ __html: "window.app.run(" + this.props.serializedState + ");"  }}/>

            </html>
        );
    }
});

module.exports = Layout;
