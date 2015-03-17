'use strict';

var createStartScript = require('./createStartScript'),
    Layout = require('../../shared/components/Layout.jsx'),
    React = require('react');

module.exports = function renderOnServer(isomorphicApp) {
    var component = isomorphicApp.getComponent(),
        layoutComponent = React.createFactory(Layout),
        startScript = createStartScript(isomorphicApp),
        html;

    html = React.renderToStaticMarkup(layoutComponent({
        content: React.renderToString(component()),
        startScript: startScript
    }));

    return html;
};
