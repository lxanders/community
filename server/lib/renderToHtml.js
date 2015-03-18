'use strict';

var serializeState = require('./serializeState'),
    Layout = require('../../shared/components/Layout.jsx'),
    React = require('react');

module.exports = function renderToHtml(isomorphicApp) {
    var component = isomorphicApp.getComponent(),
        layoutComponent = React.createFactory(Layout);

    return React.renderToStaticMarkup(layoutComponent({
        content: React.renderToString(component()),
        serializedState: serializeState(isomorphicApp)
    }));
};
